import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Messenger from './component/messenger/messenger';

const socket = new WebSocket('ws://10.25.127.76:8999');

function App() {

  const messengerRef = useRef();

  const [clientID, setClientID] = useState('');
  const [saveSession, setSaveSession] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const changeSetClientID = (id) => {
    setClientID(id);
  };

  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    const targetCookie = cookies.find(cookie => cookie.startsWith(name + '='));

    if (targetCookie) {
        return targetCookie.split('=')[1];
    }
    return null;
  }

  useEffect(() => {

    const handleRemove = (e) => {
      localStorage.setItem('reloaded', 'true');
    };

    const handleLoad = () => {
      const reloaded = localStorage.getItem('reloaded');

      if (reloaded === 'true') {
        const saveState = getCookie('save-betony');
        if (saveState == 'true') {
          const currentClientID = getCookie('auth-betony');

          setSaveSession(true);
          setClientID(currentClientID);
        }
        localStorage.removeItem('reloaded');
      }
    }

    window.addEventListener('beforeunload', handleRemove);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => document.removeEventListener('load', handleLoad);
    }

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('beforeunload', handleRemove);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  socket.onopen = function() {
    const currentClientID = getCookie('auth-betony');
    
    if (!saveSession && currentClientID == null) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          type: 'connection',
          clientID: currentClientID
        }));
      }
    }

  };

  socket.onmessage = function(event) {
    let data = JSON.parse(event.data);

    if (data.type == 'connection') {
      changeSetClientID(data.clientID);
    }

    if (data.type == 'offer_contact') {
      messengerRef.current.changeSetContactProvidersIDs(data.interlocutorID);
    }

    if (data.type == 'offer_approval') {
      messengerRef.current.changeSetInterlocutors(data.interlocutorID);
    }

    if (data.type == 'message') {
      messengerRef.current.changeSMH(data.interlocutorID, data.message);
    }
  }

  socket.onclose = function(event) {
    console.log('Соединение закрыто');
  };

  socket.onerror = function(error) {
    console.log(`Ошибка: ${error.message}`);
  };

  const saveClientID = () => {
    if (!saveSession) {
      document.cookie = `auth-betony=${clientID}`;
      document.cookie = 'save-betony=true';
      setSaveSession(true);
    } else {
      document.cookie = 'auth-betony=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      document.cookie = 'save-betony=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      setSaveSession(false);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <Messenger 
              socket={socket} 
              clientID={clientID} 
              saveSession={saveSession}
              saveClientID={saveClientID}
              ref={messengerRef}
              isMobile={isMobile}
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
