from flask import Flask, request, jsonify
import fitz  # PyMuPDF for extracting text from PDF
import os

app = Flask(__name__)

# Define the route to upload PDF and extract text
@app.route('/upload', methods=['POST'])

def extract_text_per_slide(pdf_path):
    pdf_document = fitz.open(pdf_path)
    slides = []

    # Loop through each page (slide) in the PDF
    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)  # Load each page
        text = page.get_text()  # Extract the text from the page
        slides.append({"slide_number": page_num + 1, "text": text})

    return slides

def get_slides():
    # Extract text from the PDF per slide (page)
    slides = extract_text_per_slide(pdf_path)
    
    # Clean up by removing the file after processing
    os.remove(pdf_path)
    
    # Return the extracted text, with each slide as a separate element
    return jsonify({"slides": slides}), 200


app.run(debug=True)


