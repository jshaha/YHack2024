import os
import fitz  # PyMuPDF for extracting text from PDF
from pdf2image import convert_from_path  # For converting PDF to images
from uagents import Agent, Context, Model
from typing import List
import base64
from openai import OpenAI
from dotenv import load_dotenv


load_dotenv(dotenv_path='../../../.env')

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

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


def generate_lecture_and_audio_from_slides(slides: List[SlideText], previous_lectures: str = "") -> str:
    messages = []
    content = []
    lecture_history = previous_lectures  # Start with any existing lecture history

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
                    "text": f"Here is the lecture so far: {lecture_history}.\n"
                            f"Now, generate a lecture speech for slide {slide.slide_number}: {slide.text}"
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{encoded_image}"
                    }
                }
            ]
        })

        # Send request to OpenAI GPT-4 Vision API for the current slide
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Using the Vision model
            messages=messages
        )

        # Extract the response for the current slide
        current_lecture = response.choices[0].message.content
        content.append(current_lecture)

        output_filename = f"audio/lecture_slide_{slide.slide_number}.mp3"
        text_to_speech(current_lecture, output_filename)

        # Append the generated lecture to the history
        lecture_history += f"\n\nLecture for slide {slide.slide_number}:\n{current_lecture}"
    
    return content


def text_to_speech(text: str, output_filename: str ):
    response = client.audio.speech.create(
        model = "tts-1",
        input=text,
        voice="nova"
    )
    
    response.stream_to_file(output_filename)
    print(f"Audio content written to {output_filename}")

    


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
    
    convert_pdf_to_images(pdf_path)

    slides_content = generate_lecture_and_audio_from_slides(response.slides[0:4])

    # Print the extracted text from each slide
    for slide in response.slides[0:4]:
        print(f"Slide {slide.slide_number}: {slide.text} \n====\n{slides_content[slide.slide_number - 1]}")


    # Now run the agent (will block further execution)
    agent.run()



