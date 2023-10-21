import React, { useState } from 'react';
import {Route, Routes} from "react-router-dom";
import ChatbotWidget from './ChatbotWidget';
import VoicebotWidget from './VoicebotWidget';
import Header from './Header';
import "./App.scss"
import AudioRecorder from './components/MyComponent';

const App = () => {
  return (
    <>
      {/* <div className='chatbotWidget'>
        <Header />
      </div> */}
      <AudioRecorder />
    </>
  );
}

export default App;