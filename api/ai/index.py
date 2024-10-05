from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/api/ai/python")
def get_data():
    data = {
        "name": "Morrocco",
        "age": 30,
        "city": "New York"
    }
    return data

if __name__ == "__main__":
    app.run()