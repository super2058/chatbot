import './chatbotWidget.scss';
import b_Icon from './assets/icons8-chat-94.png';
import s_Icon from './assets/icons8-voice-memos.svg';
import voice from './assets/icons8-voice.gif';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ReactMic } from 'react-mic';

const MessageBox = ({message}) => {
  const boxClass = message.sender === "user"? "user-message" : "chatbot-message";
  return (
    <>
      <div className={boxClass}>
        <div dangerouslySetInnerHTML={{ __html: message.content }} />
        {/* {message.content} */}
      </div>
    </>    
  );
}

const VoicebotWidget = () => {
  const server = "http://127.0.0.1:5000"
  const [messages, setMessages] = useState([{
    sender:"bot",
    content:"Hello, nice to meet you!"
  }]);
  const [isShow, setIsShow] = useState(true);
  const ref = useRef();
  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, ...message]);
  };
  const getResponse = async (message) => {
    try {
      const response = await axios.post(`${server}/api`, message);
      console.log(response.data);
      addMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const scrollToBottom = () => {
    ref.current.scrollIntoView({behavior: 'smooth'});
  }
  const hideWidget = () => {
    setIsShow(!isShow);
  }
  const fetchData = async () => {
    try {
      const response = await axios.post(server);
      console.log(response.data); // Do something with the response data
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    scrollToBottom();    
  }, [messages])
  // useEffect(() => {
  //   fetchData();
  // }, [])





  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = (recordedBlob) => {
    setAudioBlob(recordedBlob.blob);
    setIsRecording(false);
  };

  const handleSendAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      try {
        const response = await fetch(`${server}/transcribe`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        console.log('Backend Response:', data);
      } catch (error) {
        console.error('Error sending audio:', error);
      }
    }
  };

  return (
    <div className='chatbot'>
      {isShow && 
        <div className="chatbot-widget">
            <div>
                <ReactMic
                    record={isRecording}
                    onStop={handleStopRecording}
                    visualSetting="none"
                    height="0"
                    width="0"
                />
                <button onClick={handleStartRecording}>Start Recording</button>
                <button onClick={handleStopRecording}>Stop Recording</button>
                <button onClick={handleSendAudio}>Send Audio to Backend</button>
            </div>
          <div className="chatbot-header">
            <img src={s_Icon} alt='image of icon'/>
            {/* <h3>Easy<span>Health</span>Ai</h3> */}
          </div>
          <div className='conversation-group'>
            <div className='message-group'>
              {messages.map((message, index) => ( 
                <MessageBox
                  key={index}
                  message={message}
                  addMessage={addMessage}
                  getResponse={getResponse}
                  />
              ))} 
              <div ref={ref}/>
            </div>
          </div>
          
          <div className='voice'>
            <img src={voice} alt='gif icon'/>
          </div>
          {/* <div className='chatbot-footer'>
          Powered by<a href='http://nweasy.com/' target='_blank'> NwEasy.com</a>
          </div> */}
        </div>}
        <div className='mini-bot'>
          <img src={b_Icon} alt='image of icon' onClick={hideWidget}/>
        </div>
    </div>
  );
}

export default VoicebotWidget;
