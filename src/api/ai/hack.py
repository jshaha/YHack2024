import os
import fitz  # PyMuPDF for extracting text from PDF
from pdf2image import convert_from_path  # For converting PDF to images
from uagents import Agent, Context, Model
from typing import List
import base64
from openai import OpenAI

client = OpenAI()

class UploadPDF(Model):
    filename: str
    filedata: bytes

class SlideText(Model):
    slide_number: int
    text: str
    
class ResponseSlides(Model):
    slides: List[SlideText]

agent = Agent(name="PDF_processor")

def extract_text_per_slide(pdf_data: bytes) -> List[SlideText]:
    slides = []
    try:
        # Open the PDF directly from bytes using PyMuPDF (fitz)
        pdf_document = fitz.open(stream=pdf_data, filetype="pdf")

        # Extract text from each slide
        for page_num in range(pdf_document.page_count):
            page = pdf_document.load_page(page_num)
            text = page.get_text("text")
            slides.append(SlideText(slide_number=page_num + 1, text=text))

        return slides

    except Exception as e:
        print(f"Error occurred: {e}")
        raise


def handle_upload_pdf(req: UploadPDF) -> ResponseSlides:
    # Extract text directly from the PDF data
    slides = extract_text_per_slide(req.filedata)
    
    # Return the extracted text as a list of slides
    return ResponseSlides(slides=slides)


def convert_pdf_to_images(pdf_path: str) -> None:
    # Convert PDF pages to images
    images = convert_from_path(pdf_path)

    # Save each page as an image
    for i, image in enumerate(images):
        image.save(f'images/page_{i+1}.png', 'PNG')


def generate_lecture_from_slides(slides: List[SlideText]) -> str:
    messages = []
    
    # Loop through each slide to prepare the prompt for each slide
    for slide in slides:
        image_path = f"images/page_{slide.slide_number}.png"
        
        # Encode the image to base64
        with open(image_path, "rb") as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
        
        # Add each slide's text content and image to the message list
        messages.append({
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": f"Generate a lecture speech for slide {slide.slide_number}: {slide.text}"
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{encoded_image}"
                    }
                }
            ]
        })

    
    # Send a single request to OpenAI GPT-4 Vision API with all the slides
    response = client.chat.completions.create(
        model="gpt-4o-mini",  # Using the Vision model
        messages=messages
    )

    # Extract the response from GPT
    lecture_script = response.choices[0].message.content
    return lecture_script

    
if __name__ == "__main__":
    pdf_path = "CSS.pdf"  # Path to your PDF file

    # Read the file as bytes
    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()

    if not pdf_bytes:
        raise FileNotFoundError("Failed to load PDF or file is empty.")

    # Simulate the request object
    req = UploadPDF(filename=pdf_path, filedata=pdf_bytes)

    # Run the function to handle the PDF upload
    response = handle_upload_pdf(req)
    
    # Print the extracted text from each slide
    for slide in response.slides:
        print(f"Slide {slide.slide_number}: {slide.text}")

    # Generate image of each slide
    convert_pdf_to_images(pdf_path)

    print(generate_lecture_from_slides(response.slides))

    # Now run the agent (will block further execution)
    agent.run()



