from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from api import get_response
# from voice1 import generate_audio, transcribe_audio, get_voices
import os
import uuid

app = Flask(__name__)
CORS(app)
@app.route("/api", methods=["POST"])
def index():
    prompt = request.get_json()[0]["content"]
    result = get_response(prompt)
    output = [{"sender":"bot", "content":result}]
    return output

@app.route('/transcribe', methods=['POST'])
def transcribe():
    
    # """Transcribe the given audio to text using Whisper."""
    if 'audio' not in request.files:
        return 'No file found', 400
    # file = request.files['file']
    # recording_file = f"{uuid.uuid4()}.wav"
    # recording_path = f"uploads/{recording_file}"
    # os.makedirs(os.path.dirname(recording_path), exist_ok=True)
    # file.save(recording_path)
    # # transcription = transcribe_audio(recording_path)
    # # return jsonify({'text': transcription})
    return {"key":"ok"}


# @app.route('/ask', methods=['POST'])
# def ask():
#     """Generate a ChatGPT response from the given conversation, then convert it to audio using ElevenLabs."""
#     conversation = request.get_json(force=True).get("conversation", "")
#     reply = get_response(conversation)
#     reply_file = f"{uuid.uuid4()}.mp3"
#     reply_path = f"outputs/{reply_file}"
#     os.makedirs(os.path.dirname(reply_path), exist_ok=True)
#     generate_audio(reply, output_path=reply_path)
#     return jsonify({'text': reply, 'audio': f"/listen/{reply_file}"})


# @app.route('/listen/<filename>')
# def listen(filename):
#     """Return the audio file located at the given filename."""
#     return send_file(f"outputs/{filename}", mimetype="audio/mp3", as_attachment=False)


# @app.route('/voice', methods=['GET', 'POST'])
# def voice():
#     return handle_voice_interaction()

# @app.route('/process-input', methods=['POST'])
# def process_input_route():
#     return process_input()

if __name__ == "__main__":
    app.run(debug=True)