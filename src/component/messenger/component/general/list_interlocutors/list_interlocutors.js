import ButtonSuggestionList from '../transition_button/suggestion_list/suggestion_list';

function ListInterlocutors({ interlocutors, additionComponent, offerContact, goContactSuggestionList, chatSelection, saveClientID, saveSession, mobile, display, changeDisplay }) {

    const callComponentAddingInterlocutorRecord = () => {
        additionComponent(true);
    };

    const sendOfferContact = (id) => {
        offerContact(id);
    };

    const challSendingConsentContact = (id) => {
        sendOfferContact(id);
    };

    const callChatDisplayFunction = (id) => {
        chatSelection(id);
        if (mobile) {
            changeDisplay(display);
        }
    };

    return (
        <div className='f-g-1 p-l-10 p-b-10 p-r-10 b-r d-f j-c-s-b f-d-c'>
            {
                !mobile &&
                    <ButtonSuggestionList
                        mobile={true}
                        goContactSuggestionList={goContactSuggestionList}
                    />
            }
            <div className='b-c-E5 b-r f-g-1 d-f f-d-c j-c-s-b m-b-10'>
                {
                    interlocutors.length != 0 ? (
                        <div>
                            {
                                interlocutors.map((interlocutor) => (
                                    <div
                                        className="m-10 d-f j-c-s-b a-i-c"
                                    >
                                        <div
                                            className='f-g-1 o-h'
                                        >
                                            <h3
                                                className="f-f-j-R c-72 l-s-1"
                                            >
                                                {interlocutor.addressing}
                                            </h3>
                                        </div>
                                        {
                                            interlocutor.contact && (
                                                <div className='f-0-0-a'>
                                                    <button
                                                        onClick={() => callChatDisplayFunction(interlocutor.id)}
                                                        className="b-c-80 w-100-p b-n h-100-p h-30 c-p b-r p-5"
                                                    >
                                                        <h3 className="f-f-j-R c-w l-s-10 f-s-14 f-w-n m-t--3">
                                                            открыть чат
                                                        </h3>
                                                    </button>
                                                </div>
                                            )
                                        }
                                        {
                                            !interlocutor.contact && (
                                                <div>
                                                    <button
                                                        onClick={() => challSendingConsentContact(interlocutor.id)}
                                                        className="b-c-80 w-100-p b-n h-100-p h-30 c-p b-r p-5"
                                                    >
                                                        <h3 className="f-f-j-R c-w l-s-10 f-s-14 f-w-n m-t--3">
                                                            связаться
                                                        </h3>
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div>
                            <h3 className='f-f-j-R c-72 l-s-1 m-10 f-s-16'>
                                Собеседники не найдены
                            </h3>
                        </div>
                    )
                }
                <div>
                    <button
                        onClick={callComponentAddingInterlocutorRecord}
                        className='b-c-80 w-100-p b-n h-100-p h-40 c-p b-r'
                    >
                        <h3 className='f-f-j-R c-w l-s-10 f-s-16 f-w-n m-t--3'>
                            добавить запись
                        </h3>
                    </button>
                </div>
            </div>
            <div className='d-f a-i-c'>
                <input
                    type='checkbox'
                    onClick={() => saveClientID()}
                    checked={saveSession ? 'checked' : ''}
                    className='memorization_checkbox b-1-s-g w-20 m-r-10'
                />
                <label className='f-f-j-R c-72 l-s-1'>запомнить меня</label>
            </div>
        </div>
    );
}

export default ListInterlocutors;