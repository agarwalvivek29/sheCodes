from flask import Flask, render_template, request, jsonify
import requests

RASA_API_URL = "http://localhost:5005/webhooks/rest/webhook"

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    user_message = request.json.get('message')
    sender_id = request.json.get('sender_id', 'default')

    payload = {
        "sender": sender_id,
        "message": user_message
    }

    response = requests.post(RASA_API_URL, json=payload)
    return jsonify(response.json())


if __name__ == "__main__":
    app.run(debug=True, port=3000)