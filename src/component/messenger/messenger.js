import { useState, useEffect } from 'react';
import ListInterlocutors from './component/list_interlocutors/list_interlocutors';
import AddRecordAboutInterlocutor from './component/add_record_about_interlocutor/add_record_about_interlocutor';
import ContactsSuggestionList from './component/contacts_suggestion_list/contacts_suggestion_list';

function Messenger({socket, clientID}) {
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState({});
    const [newRecordAboutInterlocutor, setNewRecordAboutInterlocutor] = useState(false);
    // const [IDInterlocutorBeingAdded, setIDInterlocutorBeingAdded] = useState('');
    const [interlocutors, setInterlocutors] = useState([]);
    const [contactProvidersIDs, setContactProvidersIDs] = useState([]);
    const [contactsSuggestionList, setContactsSuggestionList] = useState(false);
    const [chatDisplay, setChatDisplay] = useState(false);
    const [idCurrentChat, setIdCurrentChat] = useState('');

    useEffect(() => {
        // const messagesHtml = messageHistory.map(message => `<div>${message}</div>`).join('');
        // setRenderingMessageHistory(messagesHtml);
    }, [messageHistory])

    const changeSetMessage = (e) => {
        setMessage(e.target.value);
    };

    const changeSetMessageHistory = (interlocutorID, message=null) => {
        if (!(interlocutorID in messageHistory) && (message == null)) {
            setMessageHistory({
                ...messageHistory,
                [interlocutorID]: []
            });
        }
        if (interlocutorID in messageHistory) {
            setMessageHistory({
                ...messageHistory,
                [interlocutorID]: [...messageHistory[interlocutorID], message]
            });
        }
        // else {
        //     setMessageHistory({
        //         ...messageHistory,
        //         interlocutorID: [message]
        //     });
        // }
        // setMessageHistory((history) => {
        //     return [...history, message];
        // });
    };

    const chatSelection = (id) => {
        setChatDisplay(true);
        setIdCurrentChat(id);
        changeSetMessageHistory(id);
    }

    socket.onmessage = function(event) {
        let data = JSON.parse(event.data);

        if (data.type == 'offer_contact') {
            setContactProvidersIDs((contact) => {
                return [...contact, data.interlocutorID];
            });
        }

        if (data.type == 'offer_approval') {
            setInterlocutors((interlocutor) => {
                return interlocutor.map((i) => {
                    if (i.id == data.interlocutorID) {
                        i.contact = true
                    }
                    return i;
                });
            })
        }

        if (data.type == 'message') {
            changeSetMessageHistory(data.interlocutorID, data.message);
        }
    };

    const sendingMessage = () => {
        socket.send(JSON.stringify({
            type: 'message',
            clientID: clientID, 
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
        socket.send(JSON.stringify({
            type: 'offer_contact', 
            clientID: clientID, 
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
        socket.send(JSON.stringify({
            type: 'offer_approval',
            clientID: clientID,
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

    return (
        <div className='w-100 h-100 d-f'>
            <div className='w-80-p'>
                {
                    chatDisplay && 
                        <div>
                            <div className='h-95-p'>
                                {
                                messageHistory[idCurrentChat].map(m => (
                                    <div>
                                    {m}
                                    </div>
                                ))
                                }
                            </div>
                            <div className='h-5-p w-100-p'>
                                <input
                                    onChange={changeSetMessage}
                                    className='w-90-p b-1-s-g'
                                />
                                <button
                                    onClick={sendingMessage}
                                >
                                    Отправить
                                </button>
                            </div>
                        </div>
                }
                {
                    !chatDisplay &&
                        <div
                            className='t-a-c'
                        >
                            <h1 className='f-f-r-m-o-r f-s-100 c-d2'>пусто</h1>
                            <h5 className='f-f-j-R c-72 l-s-1'>вы пока не выбрали собеседника для общения</h5>
                            <button
                                className='b-c-80 b-n w-450 h-40 b-r c-w f-f-j-M f-s-20 l-s-1'
                                onClick={() => displComponentAddingRecordAboutColleague(true)}
                            >
                                <h3 className='f-w-n'>сделать запись</h3>
                            </button>
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
}

export default Messenger;