import os
import fitz  # PyMuPDF for extracting text from PDF
from pdf2image import convert_from_bytes  # For converting PDF to images
from uagents import Agent, Context, Model, Bureau
from typing import List
import base64
from openai import OpenAI
from dotenv import load_dotenv
import asyncio
from flask import Flask, request, jsonify
from threading import Thread

app = Flask(__name__)
load_dotenv(dotenv_path='../../../.env')
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Ensure necessary directories exist
for directory in ['images', 'audio', 'subtitles']:
    os.makedirs(directory, exist_ok=True)

class UploadPDF(Model):
    filename: str
    filedata: str

class SlideText(Model):
    slide_number: int
    text: str
    
class ResponseSlides(Model):
    slides: List[SlideText]

class StringArrayModel(Model):
    messages: List[str]

### PDF to Text Agent: Handles PDF Upload and Text Extraction
pdf_to_text_agent = Agent(name="PDF_to_Text_agent", seed="pdf text recovery phrase")

@pdf_to_text_agent.on_message(model=UploadPDF)
async def handle_upload_pdf(ctx: Context, sender: str, req: UploadPDF):
    # Extract text directly from the PDF data
    pdf_data = base64.b64decode(req.filedata)
    slides = extract_text_per_slide(pdf_data)  # Remove limit if necessary

    response_tracker['pdf_text'] = slides[:10]
    # return ResponseSlides(slides=slides)
    await ctx.send(sender, ResponseSlides(slides=response_tracker['pdf_text']))

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

### PDF to Image Agent: Handles PDF Upload and Image Extraction
pdf_to_image_agent = Agent(name="PDF_to_Image_agent", seed="pdf image recovery phrase")

@pdf_to_image_agent.on_message(model=UploadPDF)
async def convert_pdf_to_images(ctx: Context, sender: str, req: UploadPDF):
    pdf_data = base64.b64decode(req.filedata)
    images = convert_from_bytes(pdf_data)
    output = []

    # Save each page as an image
    for i, image in enumerate(images):
        image_path = f'images/page_{i+1}.png'
        image.save(image_path, 'PNG')
        output.append(image_path)

    response_tracker['pdf_images'] = output
    return StringArrayModel(messages=output)

### Lecture Agent: Generates Lecture from Extracted Text and Images
lecture_agent = Agent(name="Lecture_agent", seed="lecture recovery phrase")

@lecture_agent.on_message(model=ResponseSlides)
async def handle_generate_lecture(ctx: Context, sender: str, msg: ResponseSlides):
    lectures = generate_lecture_from_slides(msg.slides)
    
    response_tracker['lecture'] = lectures
    await ctx.send(voice_agent.address, StringArrayModel(messages=response_tracker['lecture']))
    return StringArrayModel(messages=lectures)

def generate_lecture_from_slides(slides: List[SlideText], previous_lectures: str = "") -> List[str]:
    content = []
    lecture_history = previous_lectures  # Start with any existing lecture history

    # Loop through each slide to prepare the prompt for each slide
    for slide in slides:
        # Add each slide's text content to the message list
        messages = [
            {
                "role": "user",
                "content": f"Here is the lecture so far: {lecture_history}.\nNow, generate a lecture speech for slide {slide.slide_number}: {slide.text}"
            }
        ]

        # Send request to OpenAI GPT-4 API for the current slide
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Use the appropriate model
            messages=messages
        )

        # Extract the response for the current slide
        current_lecture = response.choices[0].message.content
        content.append(current_lecture)

        # Append the generated lecture to the history
        lecture_history += f"\n\nLecture for slide {slide.slide_number}:\n{current_lecture}"
    
    return content

### Voice Agent: Handles Voice Synthesis
voice_agent = Agent(name="Voice_agent", seed="voice recovery phrase")

@voice_agent.on_message(model=StringArrayModel)
async def handle_voice_synthesis(ctx: Context, sender: str, msg: StringArrayModel):
    outputs = []

    for index, lecture in enumerate(msg.messages):
        print(f"Synthesizing voice for lecture: {lecture}")
        audio_path = text_to_speech(lecture, f"audio/lecture_{index}.mp3")
        outputs.append(audio_path)

    response_tracker['voice'] = outputs
    await ctx.send(transcription_agent.address, StringArrayModel(messages=response_tracker['voice']))
    # return StringArrayModel(messages=outputs)

def text_to_speech(text: str, output_filename: str):
    response = client.audio.speech.create(
        model="tts-1",
        input=text,
        voice="nova"
    )
    
    response.stream_to_file(output_filename)
    print(f"Audio content written to {output_filename}")
    return output_filename

### Transcription Agent: Handles Audio Transcription
transcription_agent = Agent(name="Transcription_agent", seed="transcription recovery phrase")

@transcription_agent.on_message(model=StringArrayModel)
async def handle_audio_transcription(ctx: Context, sender: str, msg: StringArrayModel):
    outputs = []

    for index, audio_file in enumerate(msg.messages):
        output_srt_file = f'subtitles/{os.path.basename(audio_file)}.srt'
        transcription = transcribe_audio(audio_file)

        with open(output_srt_file, 'w') as f:
            f.write(transcription)

        outputs.append(transcription)
    
    response_tracker['transcription'] = outputs
    print(response_tracker)
    return StringArrayModel(messages=outputs)

def transcribe_audio(audio_file):
    with open(audio_file, 'rb') as audio:
        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio,
            language="en",
            response_format="srt",
            timestamp_granularities=["segment"]
        )

    return transcription

### User Agent: Handles User Interaction
user_agent = Agent(name="User_agent", seed="user recovery phrase")

response_tracker = {
    'pdf_text': None,
    'pdf_images': None,
    'lecture': None,
    'voice': None,
    'transcription': None
}

async def trigger_send_message(bureau: Bureau):
    user_ctx = user_agent.create_context()  # Create a new context for the user agent
    user_ctx.logger.info("Sending a message to the PDF parser.")

    pdf_path = "CSS.pdf"  # Path to your PDF file

    # Read the file as bytes
    try:
        with open(pdf_path, "rb") as f:
            pdf_bytes = f.read()
    except FileNotFoundError:
        user_ctx.logger.error(f"PDF file not found at path: {pdf_path}")
        return

    if not pdf_bytes:
        user_ctx.logger.error("Failed to load PDF or file is empty.")
        return

    # Encode the PDF bytes to base64 string
    encoded_pdf = base64.b64encode(pdf_bytes).decode('utf-8')

    # Create the UploadPDF request object
    req = UploadPDF(filename=os.path.basename(pdf_path), filedata=encoded_pdf)

    # Send messages to the agents
    await user_ctx.send(pdf_to_image_agent.address, req)
    await user_ctx.send(pdf_to_text_agent.address, req)


@user_agent.on_event("startup")
async def send_message(ctx: Context):
    await trigger_send_message(bureau)


### Bureau to Manage Agents
bureau = Bureau()
bureau.add(pdf_to_text_agent)
bureau.add(pdf_to_image_agent)
bureau.add(lecture_agent)
bureau.add(voice_agent)
bureau.add(transcription_agent)
bureau.add(user_agent)

@app.route('/api', methods=['POST'])
def trigger_send_message_endpoint():
    def run_async_task():
        asyncio.run(trigger_send_message(bureau))

    # Run the async function in a separate thread to avoid blocking Flask
    thread = Thread(target=run_async_task)
    thread.start()

    return jsonify({"status": "send_message triggered"}), 200


if __name__ == "__main__":
    from threading import Thread

    def run_bureau():
        bureau.run()

    def run_flask():
        app.run(host='0.0.0.0', port=5000)  # Adjust host and port as needed

    # Start the bureau in a separate thread
    bureau_thread = Thread(target=run_bureau)
    bureau_thread.start()

    # Start the Flask app
    run_flask()
