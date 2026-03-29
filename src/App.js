import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Messenger from './component/messenger/messenger';

const socket = new WebSocket('ws://localhost:8999');

function App() {

  const [clientID, setClientID] = useState('');

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let identStr = "";

  const changeSetClientID = () => {
    setClientID(identStr);
  };

  const createIdentStr = () => {
    for (const n of [0,1,2,3,4,5,6,7,8,9,10,11,12]) {
      let randomIndex = Math.floor(Math.random() * alphabet.length);
      identStr += `${randomIndex}${alphabet[randomIndex]}`;
    }
  };

  socket.onopen = function() {
    console.log(2);
  };

  socket.onclose = function(event) {
    console.log('Соединение закрыто');
  };

  socket.onerror = function(error) {
    console.log(`Ошибка: ${error.message}`);
  };

  useEffect(() => {
    createIdentStr();
    changeSetClientID();
    console.log(identStr);
    
    // Ждем открытия соединения
    if (socket && socket.readyState === WebSocket.OPEN) {

      socket.send(JSON.stringify({type: 'connection', clientID: identStr}));

    } else if (socket && socket.readyState === WebSocket.CONNECTING) {
      // Если соединение устанавливается, ждем
      const onOpen = () => {

        socket.send(JSON.stringify({type: 'connection', clientID: identStr}));

        socket.removeEventListener('open', onOpen);
      };
      socket.addEventListener('open', onOpen);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Messenger socket={socket} clientID={clientID} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
