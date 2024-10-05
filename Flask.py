import fitz
fitz.open(stream=input_bytes, filetype="pdf")
all_text = ""
for page in fitz.pages():
    all_text += page.get_text("text")
