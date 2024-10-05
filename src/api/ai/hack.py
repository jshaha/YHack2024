import os
import fitz  # PyMuPDF for extracting text from PDF
from uagents import Agent, Context, Model
from typing import List
import asyncio

class UploadPDF(Model):
    filename = str
    filedata = bytes

class SlideText(Model):
    slide_number = int
    text = str
    
class ResponseSlides(Model):
    slides: List[SlideText]

agent = Agent(name = "PDF_processor")

def extract_text_per_slide(pdf_data: bytes) -> List[SlideText]:
    slides = []
    temp_pdf_path = "slides.pdf"
    with open(temp_pdf_path, "wb") as f:
        f.write(pdf_data)

    pdf_document = fitz.open(temp_pdf_path)
    
    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        text = page.get.text()
        slides.append(SlideText(slide_number=page_num + 1, text=text))
    
    return slides

async def handle_upload_pdf(ctx: Context, req: UploadPDF) -> ResponseSlides:
    # Extract text directly from the PDF data
    slides = extract_text_per_slide(req.filedata)
    
    # Return the extracted text as a list of slides
    return ResponseSlides(slides=slides)



# def generate_lecture_from_slides(slides: List[SlideText]) -> str:
#     messages = []
    
#     # Loop through each slide to prepare the prompt for each slide
#     for slide in slides:
#         image_path = f"slide_{slide.slide_number}.png"
        
#         # Encode the image to base64
#         with open(image_path, "rb") as image_file:
#             encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
        
#         # Add each slide's text content and image to the message list
#         messages.append({
#             "role": "user",
#             "content": f"Generate a lecture for slide {slide.slide_number}: {slide.text}",
#             "image": encoded_image  # Include the base64 image
#         })
    
#     # Send a single request to OpenAI GPT-4 Vision API with all the slides
#     response = openai.ChatCompletion.create(
#         model="gpt-4-turbo-vision",  # Using the Vision model
#         messages=messages,
#         max_tokens=2000  # Adjust based on the length of the response you need
#     )

#     # Extract the response from GPT
#     lecture_script = response.choices[0].message["content"]
#     return lecture_script

    
if __name__ == "__main__":
    # agent.run()


    pdf_path = "CSS.pdf"  # Path to your PDF file

    # Read the file as bytes
    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()

    # Simulate the request object
    req = UploadPDF(filename="test_slides.pdf", filedata=pdf_bytes)

    # Simulate the context (can be a simple placeholder)
    # ctx = Context()

    # Run the async function to handle the PDF upload
    response = asyncio.run(handle_upload_pdf(ctx, req))

    # Print the extracted text from each slide
    for slide in response.slides:
        print(f"Slide {slide.slide_number}: {slide.text}")


