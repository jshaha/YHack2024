from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(
 app,
 resources={
  r"/*": {
   "origins": "*",
   "methods": [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
   ],
   "allow_headers": [
    "Content-Type",
    "Authorization",
   ],
  }
 },
)

@app.route("/api/python")
def get_data():
    data = {
        "name": "Morrocco",
        "age": 30,
        "city": "New York"
    }
    return data
