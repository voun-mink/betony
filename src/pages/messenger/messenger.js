import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import Desktop from './views/desktop.view';
import Mobile from './views/mobile.view';

const Messenger = forwardRef((props, ref) => {
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState({});
    const [newRecordAboutInterlocutor, setNewRecordAboutInterlocutor] = useState(false);
    const [interlocutors, setInterlocutors] = useState([]);
    const [contactProvidersIDs, setContactProvidersIDs] = useState([]);
    const [contactsSuggestionList, setContactsSuggestionList] = useState(false);
    const [chatDisplay, setChatDisplay] = useState(false);
    const [idCurrentChat, setIdCurrentChat] = useState('');
    const [mobileMenu, setMobileMenu] = useState(false);

    const changeSetMessage = (e) => {
        setMessage(e.target.value);
    };

    const changeSetMessageHistory = (interlocutorID, message=null, removal=false) => {
        if (!(interlocutorID in messageHistory) && (message == null) && (removal == false)) {
            setMessageHistory({
                ...messageHistory,
                [interlocutorID]: []
            });
        }
        if (interlocutorID in messageHistory && message != null) {
            setMessageHistory({
                ...messageHistory,
                [interlocutorID]: [...messageHistory[interlocutorID], message]
            });
        }
        if (!(interlocutorID in messageHistory) && message != null) {
            setMessageHistory({
                ...messageHistory,
                [interlocutorID]: [message]
            });
        }
        if ((interlocutorID in messageHistory) && (message == null) && (removal == true)) {
            let copyMessageHistory = messageHistory;
            delete copyMessageHistory[interlocutorID];
            
            setMessageHistory(copyMessageHistory);
            setIdCurrentChat('');
            setChatDisplay(false);
            setInterlocutors(interlocutors.filter(interlocutor => interlocutor.id != interlocutorID));
        }
    };

    const chatSelection = (id) => {
        setChatDisplay(true);
        setIdCurrentChat(id);
        changeSetMessageHistory(id);
    }

    const sendingMessage = () => {
        props.socket.send(JSON.stringify({
            type: 'message',
            clientID: props.clientID, 
            interlocutorID: idCurrentChat,
            message: message
        }));
        changeSetMessageHistory(idCurrentChat, message);
        setMessage('');
    };

    const displComponentAddingRecordAboutColleague = (state) => {
        setNewRecordAboutInterlocutor(state);
        changeSetMobileMenu(mobileMenu)
    };

    const saveIDAddedInterlocutor = (obj) => {
        setInterlocutors((interlocutor) => {
            return [...interlocutor, {
                ...obj,
                contact: false
            }]
        });
        setNewRecordAboutInterlocutor(false);
    };

    const sendOfferContact = (id) => {
        props.socket.send(JSON.stringify({
            type: 'offer_contact', 
            clientID: props.clientID, 
            interlocutorID: id
        }));
    };

    const displListContactProviders = () => {
        setContactsSuggestionList(true);
    };

    const displListInterlocutors = () => {
        setNewRecordAboutInterlocutor(false); 
        setContactsSuggestionList(false);
    }; 

    const sendConsentOffer = (id) => {
        props.socket.send(JSON.stringify({
            type: 'offer_approval',
            clientID: props.clientID,
            interlocutorID: id
        }));
        setContactProvidersIDs((contacts) => {
            return contacts.filter(contact => contact != id)
        });
        setInterlocutors((interlocutors) => {
            return [
                ...interlocutors, 
                {
                    id: id,
                    addressing: id,
                    contact: true
                }
            ]
        });
    };

    const copyingId = () => {
        navigator.clipboard.writeText(props.clientID);
    };

    const changeSetMobileMenu = (current_status) => {
        setMobileMenu(!current_status);
    };

    useImperativeHandle(ref, () => ({
        changeSetContactProvidersIDs: (interlocutorID) => {
            setContactProvidersIDs((contact) => {
                return [...contact, interlocutorID];
            });
        },
        changeSetInterlocutors: (interlocutorID) => {
            setInterlocutors((interlocutor) => {
                return interlocutor.map((i) => {
                if (i.id == interlocutorID) {
                    i.contact = true
                }
                return i;
                });
            })
        },
        changeSMH: (interlocutorID, message) => {
            changeSetMessageHistory(interlocutorID, message);
        },
        deletingInterlocutors: (interlocutorID) => {
            changeSetMessageHistory(interlocutorID, null, true);
        },
        updatingIDInterlocutors: (previous_id, current_id) => {
            let indexInterlocator = interlocutors.indexOf(interlocutors.filter(interlocator => interlocator.id == previous_id)[0]);

            if (indexInterlocator != -1) {

                let copyInterlocutors = interlocutors;
                copyInterlocutors[indexInterlocator].id = current_id

                setInterlocutors(copyInterlocutors);

            }

            if (messageHistory[previous_id] != undefined) {
                let copyMessageHistory = messageHistory;
                copyMessageHistory[current_id] = messageHistory[previous_id];
                delete copyMessageHistory[previous_id];
                setMessageHistory(copyMessageHistory);
                setIdCurrentChat(current_id);
            }
        }
    }))

    return (
        <div className='w-100 h-100 d-f'>
            <div className={`${props.isMobile ? 'w-100-p' : 'w-80-p'}`}>
                <div className={`w-100-p ${chatDisplay ? 'h-100-p' : 'h-95-p'}`}>
                    {
                        chatDisplay && 
                            <div className='w-100-p h-100-p'>
                                <div className='h-95-p p-5 d-f f-d-c'>
                                    {
                                    messageHistory[idCurrentChat].map(m => (
                                        <div className='f-n b-c-E5 a-s-f-s p-5 b-r m-5' >
                                            <h3 className='f-w-n l-h-1 m-t-5 c-72 l-s-1 f-w-500 w-b-b-a o-w-b-w'>
                                                {m}
                                            </h3>
                                        </div>
                                    ))
                                    }
                                </div>
                                <div className='h-5-p d-f p-5'>
                                    <input
                                        onChange={changeSetMessage}
                                        className='b-1-s-g w-90-p b-r b-1-s-72 p-l-10 p-r-10 input'
                                        value={message}
                                    />
                                    <button
                                        onClick={sendingMessage}
                                        className='m-l-10 b-c-80 b-n b-r c-w f-f-j-M f-s-14 l-s-1 c-p w-10-p'
                                    >
                                        <h3 className='f-w-n l-h-1 m-t-5'>
                                            ->
                                        </h3>
                                    </button>
                                </div>
                            </div>
                    }
                    {
                        !chatDisplay &&
                            <div
                                className='t-a-c'
                            >
                                <h1 
                                    className={`p-t-20-p c-d2 f-f-r-m-o-r ${props.isMobile ? 'f-s-56 p-t-40-p' : 'f-s-100 p-t-20-p'}`}
                                >
                                    пусто
                                </h1>
                                {
                                    !props.isMobile &&
                                        <h5 className='f-f-j-R c-72 l-s-1'>вы пока не выбрали собеседника для общения</h5>
                                }
                                {
                                    props.isMobile &&
                                        <h5 className='f-f-j-R c-72 l-s-1'>собеседник не выбран</h5>
                                }
                                <button
                                    className={`b-c-80 b-n h-60 b-r l-s-1 m-t-5-p c-p ${props.isMobile ? 'w-200' : 'w-450'}`}
                                    onClick={() => displComponentAddingRecordAboutColleague(true)}
                                >
                                    <h3
                                        className={`c-w f-f-j-M f-w-n l-h-1 m-t-5 ${props.isMobile ? 'f-s-16' : 'f-s-24'}`}
                                    >сделать запись</h3>
                                </button>
                            </div>
                    }
                </div>
                {
                    !chatDisplay &&
                        <div className={`h-5-p ${props.isMobile ? 'w-100-p' : 'w-100-p'}`}>
                            <div className={`d-f j-c-c ${props.isMobile ? 'w-80-p m-l-a m-r-a' : 'w-100-p'}`}>
                                <div className='b-c-E5 d-f w-m-c p-5 b-r o-h'>
                                    <h3 className='c-72 m-r-10' style={{flexGrow: '1' }}>
                                        ваш id:
                                    </h3>
                                    <h3 className='c-72 o-h ' style={{flex: '0 0 auto'}}>
                                        {
                                            !props.isMobile &&
                                                props.clientID
                                        }
                                        {
                                            props.isMobile &&
                                                props.clientID.slice(0, 4) + '...'
                                        }
                                    </h3>
                                </div>
                                <div className='m-l-10'>
                                    <button
                                        className='b-c-80 b-n b-r c-w f-f-j-M f-s-24 l-s-1 m-t-5-p c-p h-100-p p-l-10 p-r-10'
                                        onClick={() => copyingId()}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                }
            </div>
            {
                props.isMobile &&
                    <button
                        className='b-c-80 p-a t-15 r-15 b-r w-30 h-30 d-f a-i-c j-c-c b-n c-p'
                        onClick={() => changeSetMobileMenu(mobileMenu)}
                    >
                        <span className='w-24 h-24'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="6" r="1.5" fill="white"/>
                                <circle cx="12" cy="12" r="1.5" fill="white"/>
                                <circle cx="12" cy="18" r="1.5" fill="white"/>
                            </svg>
                        </span>
                    </button>
            }
            {
                !props.isMobile &&
                    <Desktop
                        newRecordAboutInterlocutor={newRecordAboutInterlocutor}
                        contactsSuggestionList={contactsSuggestionList}
                        interlocutors={interlocutors}
                        displComponentAddingRecordAboutColleague={displComponentAddingRecordAboutColleague}
                        offerContact={sendOfferContact}
                        goContactSuggestionList={displListContactProviders}
                        chatSelection={chatSelection}
                        saveClientID={props.saveClientID}
                        saveSession={props.saveSession}
                        saveIDAddedInterlocutor={saveIDAddedInterlocutor}
                        contactsList={contactProvidersIDs}
                        listInterlocutors={displListInterlocutors}
                        consentProposal={sendConsentOffer}
                    />
            }
            {
                props.isMobile &&
                    <Mobile
                        display={mobileMenu}
                        changeDisplay={changeSetMobileMenu}
                        newRecordAboutInterlocutor={newRecordAboutInterlocutor}
                        contactsSuggestionList={contactsSuggestionList}
                        interlocutors={interlocutors}
                        displComponentAddingRecordAboutColleague={displComponentAddingRecordAboutColleague}
                        offerContact={sendOfferContact}
                        goContactSuggestionList={displListContactProviders}
                        chatSelection={chatSelection}
                        saveClientID={props.saveClientID}
                        saveSession={props.saveSession}
                        saveIDAddedInterlocutor={saveIDAddedInterlocutor}
                        contactsList={contactProvidersIDs}
                        listInterlocutors={displListInterlocutors}
                        consentProposal={sendConsentOffer}
                    />
            }
        </div>
    );
});

export default Messenger;