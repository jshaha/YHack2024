from flask import Flask
app = Flask(__name__)

@app.route("/api/ai/python")
def get_data():
    data = {
        "name": "Morrocco",
        "age": 30,
        "city": "New York"
    }
    return data