import React, { useState } from 'react';

const AudioRecorder = () => {
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
        });

        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000); // Record for 5 seconds, adjust as needed
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  };

  const uploadAudio = () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      fetch('http://127.0.0.1:5000/api/upload-audio', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          // Handle response from the backend
          console.log('Audio uploaded successfully');
        })
        .catch(error => {
          console.error('Error uploading audio:', error);
        });
    }
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={uploadAudio}>Upload Audio</button>
    </div>
  );
};

export default AudioRecorder;