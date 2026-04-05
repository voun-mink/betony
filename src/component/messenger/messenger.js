import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import ListInterlocutors from './component/list_interlocutors/list_interlocutors';
import AddRecordAboutInterlocutor from './component/add_record_about_interlocutor/add_record_about_interlocutor';
import ContactsSuggestionList from './component/contacts_suggestion_list/contacts_suggestion_list';

const Messenger = forwardRef((props, ref) => {
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState({});
    const [newRecordAboutInterlocutor, setNewRecordAboutInterlocutor] = useState(false);
    const [interlocutors, setInterlocutors] = useState([]);
    const [contactProvidersIDs, setContactProvidersIDs] = useState([]);
    const [contactsSuggestionList, setContactsSuggestionList] = useState(false);
    const [chatDisplay, setChatDisplay] = useState(false);
    const [idCurrentChat, setIdCurrentChat] = useState('');

    const changeSetMessage = (e) => {
        setMessage(e.target.value);
    };

    const changeSetMessageHistory = (interlocutorID, message=null) => {
        console.log(interlocutorID in messageHistory);
        console.log(message == null);
        if (!(interlocutorID in messageHistory) && (message == null)) {
            setMessageHistory({
                ...messageHistory,
                [interlocutorID]: []
            });
        }
        if (interlocutorID in messageHistory && message != null) {
            console.log(message);
            setMessageHistory({
                ...messageHistory,
                [interlocutorID]: [...messageHistory[interlocutorID], message]
            });
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
    };

    const displComponentAddingRecordAboutColleague = (state) => {
        setNewRecordAboutInterlocutor(state);
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
        console.log(interlocutors);
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
        }
    }))

    return (
        <div className='w-100 h-100 d-f'>
            <div className='w-80-p'>
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
                                <h1 className='f-f-r-m-o-r f-s-100 c-d2 p-t-20-p'>пусто</h1>
                                <h5 className='f-f-j-R c-72 l-s-1'>вы пока не выбрали собеседника для общения</h5>
                                <button
                                    className='b-c-80 b-n w-450 h-60 b-r c-w f-f-j-M f-s-24 l-s-1 m-t-5-p c-p'
                                    onClick={() => displComponentAddingRecordAboutColleague(true)}
                                >
                                    <h3 className='f-w-n l-h-1 m-t-5'>сделать запись</h3>
                                </button>
                            </div>
                    }
                </div>
                {
                    !chatDisplay &&
                        <div className='w-100-p h-5-p'>
                            <div className='d-f j-c-c w-100-p'>
                                <div className='b-c-E5 d-f w-m-c p-5 b-r'>
                                    <h3 className='c-72 m-r-10'>
                                        ваш id:
                                    </h3>
                                    <h3 className='c-72'>
                                        {props.clientID}
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
                (!newRecordAboutInterlocutor  && !contactsSuggestionList) &&
                    <ListInterlocutors
                        interlocutors={interlocutors}
                        additionComponent={displComponentAddingRecordAboutColleague}
                        offerContact={sendOfferContact}
                        goContactSuggestionList={displListContactProviders}
                        chatSelection={chatSelection}
                        saveClientID={props.saveClientID}
                        saveSession={props.saveSession}
                    />
            }
            {
                (newRecordAboutInterlocutor && !contactsSuggestionList) && 
                    <AddRecordAboutInterlocutor 
                        additionComponent={saveIDAddedInterlocutor}
                    />
            }
            {
                (contactsSuggestionList && !newRecordAboutInterlocutor) &&
                    <ContactsSuggestionList
                        contactsList={contactProvidersIDs}
                        listInterlocutors={displListInterlocutors}
                        consentProposal={sendConsentOffer}
                    />
            }
        </div>
    );
});

export default Messenger;