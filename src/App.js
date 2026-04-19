import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Messenger from './pages/messenger/messenger';

const socket = new WebSocket('ws://10.65.193.76:8999');

function App() {

  const messengerRef = useRef();

  const [clientID, setClientID] = useState('');
  const [saveSession, setSaveSession] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [reloadedPage, setReloadedPage] = useState(false);

  const changeSetClientID = (id) => {
    setClientID(id);
    document.cookie = `auth-betony=${id}`;
  };

  const changeSetReloadedPage = (state) => {
    setReloadedPage(state);
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
        changeSetReloadedPage(true);
        const saveState = getCookie('save-betony');

        if (saveState == 'true') {
          // const currentClientID = getCookie('auth-betony');

          setSaveSession(true);
          // setClientID(currentClientID);
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
    const authClientID = getCookie('auth-betony');
    
    if (saveSession && authClientID != null) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          type: 'identification_id',
          clientID: authClientID
        }));
      }
    }

  };

  socket.onmessage = function(event) {
    let data = JSON.parse(event.data);
    const authClientID = getCookie('auth-betony');

    if (data.type == 'connection') {
      changeSetClientID(data.clientId);
    }

    if (data.type == 'offer_contact') {
      messengerRef.current.changeSetContactProvidersIDs(data.interlocutorID);
    }

    if (data.type == 'offer_approval') {
      messengerRef.current.changeSetInterlocutors(data.interlocutorID);
    }

    if (data.type == 'message') {
      console.log(data.message);
      messengerRef.current.changeSMH(data.interlocutorID, data.message);
    }

    if (data.type == 'inactive_interlocutor') {
      console.log(data.interlocutorID);
      messengerRef.current.deletingInterlocutors(data.interlocutorID);
    }

    if (data.type == 'identification_id') {
      if (data.previous_id != authClientID) {
        console.log(2);
        messengerRef.current.updatingIDInterlocutors(data.previous_id, data.current_id);
      }
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
      socket.send(JSON.stringify({
        type: 'remembering_id',
        clientId: clientID
      }))
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
