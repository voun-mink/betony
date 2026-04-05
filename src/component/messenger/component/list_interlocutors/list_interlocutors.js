function ListInterlocutors({ interlocutors, additionComponent, offerContact, goContactSuggestionList, chatSelection, saveClientID, saveSession }) {

    const callComponentAddingInterlocutorRecord = () => {
        additionComponent(true);
    };

    const sendOfferContact = (id) => {
        offerContact(id);
    };

    const callUpContactSuggestionList = () => {
        goContactSuggestionList(true);
    };

    const challSendingConsentContact = (id) => {
        sendOfferContact(id);
    };

    const callChatDisplayFunction = (id) => {
        // console
        chatSelection(id);
    };

    return (
        <div className='w-20-p m-10 b-r d-f j-c-s-b f-d-c'>
            <div className='m-b-10'>
                <button
                    onClick={callUpContactSuggestionList}
                    className='b-c-80 w-100-p b-n h-100-p h-40 c-p b-r'
                >
                    <h3 className='f-f-j-R c-w l-s-10 f-s-30 f-w-n m-t--3'>
                        список предложений
                    </h3>
                </button>
            </div>
            <div className='b-c-E5 b-r f-g-1 d-f f-d-c j-c-s-b'>
                {
                    interlocutors.length != 0 ? (
                        <div>
                            {
                                interlocutors.map((interlocutor) => (
                                    <div>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => callChatDisplayFunction(interlocutor.id)}
                                        >
                                            <h3 style={{ overflow: 'hidden' }}>{interlocutor.addressing}</h3>
                                        </div>
                                        {
                                            !interlocutor.contact && (
                                                <div>
                                                    <button
                                                        onClick={() => challSendingConsentContact(interlocutor.id)}
                                                    >
                                                        Связаться
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div>Собеседники не найдены</div>
                    )
                }
                <div>
                    <button
                        onClick={callComponentAddingInterlocutorRecord}
                        className='b-c-80 w-100-p b-n h-100-p h-40 c-p b-r'
                    >
                        <h3 className='f-f-j-R c-w l-s-10 f-s-30 f-w-n m-t--3'>
                            добавить запись
                        </h3>
                    </button>
                </div>
            </div>
            <div>
                <input
                    type="checkbox"
                    onClick={() => saveClientID()}
                    checked={saveSession ? 'checked' : ''}
                />
                <label>запомнить меня</label>
            </div>
        </div>
    );
}

export default ListInterlocutors;