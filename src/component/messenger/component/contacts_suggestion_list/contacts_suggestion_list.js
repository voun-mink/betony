function ContactsSuggestionList({ contactsList, listInterlocutors, consentProposal }) {

    const goListInterlocutors = () => {
        listInterlocutors();
    };

    const sendConsentProposal = (id) => {
        consentProposal(id);
    };

    return (
        <div>
            <div>
                <button
                    onClick={goListInterlocutors}
                >
                    Список собеседников
                </button>
            </div>
            {
                contactsList.length > 0 ? (
                    contactsList.map((suggest) => (
                        <div>
                            {suggest}
                            <div>
                                <button
                                    onClick={() => sendConsentProposal(suggest)}
                                >
                                    Соглашаюсь
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        Пока тут ничего нет
                    </div>
                )
            }
        </div>
    );
}

export default ContactsSuggestionList;