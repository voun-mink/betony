function ListInterlocutors({ interlocutors, additionComponent, offerContact, goContactSuggestionList, chatSelection }) {

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
        <div className='w-20-p'>
            <div>
                <button
                    onClick={callUpContactSuggestionList}
                >
                    Список предложений
                </button>
            </div>
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
                >
                    Добавить запись
                </button>
            </div>
        </div>
    );
}

export default ListInterlocutors;