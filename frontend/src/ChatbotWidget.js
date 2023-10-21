import './chatbotWidget.scss';
import b_Icon from './assets/icons8-chat-94.png';
import s_Icon from './assets/icons8-chat-64.png';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


const ChoiceBox = ({message, addMessage, getResponse}) => {
  const [selectedChoice, setSelectedChoice] = useState(false);
  const handleChoiceClick = (choice) => {
    let userChoice = [{sender:"user", content:choice}];
    setSelectedChoice(true);
    addMessage(userChoice);
    getResponse(userChoice);
  }
  if (!message.hasOwnProperty("choices")){
    return;
  }
  return (
    <>
        {!selectedChoice && 
          <>
            {message.choices.map((choice, index) => (
              <div 
                className='choice' 
                onClick={(e) => handleChoiceClick(choice)}
                key={index}>
                {choice}
              </div>
            ))}
          </>
        }
    </>
  );
}


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

const ChatbotWidget = () => {
  const server = "http://127.0.0.1:5000"
  const [messages, setMessages] = useState([{
    sender:"bot",
    content:"Hello, nice to meet you!"
  }]);
  const [userInput, setUserInput] = useState("");
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
  const sendMessage = () => {
    if (!userInput.trim()) {
      return;
    }
    let message = [{sender:"user", content:userInput}];
    addMessage(message);
    getResponse(message);
    setUserInput('');
  }
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
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
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='chatbot'>
      {isShow && 
        <div className="chatbot-widget">
          {/* <div>
            <button onClick={chat}>CHAT</button>
            <button onClick={voice}>VOICE</button>
          </div> */}
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
            <div className='choice-container'>
              {messages.map((message, index) => ( 
                <ChoiceBox
                  key={index}
                  message={message}
                  addMessage={addMessage}
                  getResponse={getResponse}
                  />
              ))}
            </div>
          </div>
          
          <div className='input-group'>
            <input
              type='text'
              placeholder='Ask me any questions.'
              onChange={handleInputChange}
              value={userInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
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

export default ChatbotWidget;
