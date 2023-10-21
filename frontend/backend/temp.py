from flask import Flask, request
from flask_cors import CORS
import io
import soundfile
app = Flask(__name__)
CORS(app)
@app.route('/api/upload-audio', methods=['POST'])
def upload_audio():
    if request.method == 'POST':
        f = request.files['file']
        f.save() 
    # if 'audio' not in request.files:
    #     return 'No audio file provided', 400

    # audio_file = request.files['audio']
    # audio_file.save("audio.wav")
    # audio_file.seek(0)
    # data, samplerate = soundfile.read(audio_file)
    # with io.BytesIO() as fio:
    #     soundfile.write(
    #         fio, 
    #         data, 
    #         samplerate=samplerate, 
    #         subtype='PCM_16', 
    #         format='wav'
    #     )
    #     data = fio.getvalue()
    # if audio_file.filename == '':
    #     return 'No selected audio file', 400
    
    # if audio_file and allowed_file(audio_file.filename):
    #     audio_file.save('audio.wav')
    #     return 'Audio file saved successfully', 200

    return {"key":"ok"}

# def allowed_file(filename):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in {'wav'}

if __name__ == '__main__':
    app.run(debug=True)