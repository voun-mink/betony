import ButtonListInterlocutors from '../../buttons/button_list_interlocutors/BLI.component';

function ContactsSuggestionList({ contactsList, listInterlocutors, consentProposal, mobile }) {

    const sendConsentProposal = (id) => {
        consentProposal(id);
    };

    return (
        <div  className='f-g-1 p-l-10 p-b-10 p-r-10 b-r d-f j-c-s-b f-d-c'>
            {
                !mobile &&
                    <ButtonListInterlocutors
                        mobile={true}
                        listInterlocutors={listInterlocutors}
                    />
            }
            <div className='b-c-E5 b-r f-g-1 d-f f-d-c j-c-s-b h-100-p h-40'>
                {
                    contactsList.length > 0 ? (
                        contactsList.map((suggest) => (
                            <div
                                className="m-10 d-f j-c-s-b a-i-c"
                            >
                                <div
                                    className="w-200 o-h"
                                >
                                    <h3
                                        className="f-f-j-R c-72 l-s-1"
                                    >
                                        {suggest}
                                    </h3>
                                </div>
                                <div>
                                    <button
                                        onClick={() => sendConsentProposal(suggest)}
                                        className='b-c-80 w-100-p b-n h-100-p h-40 c-p b-r'
                                    >
                                        <h3 className='f-f-j-R c-w l-s-10 f-s-16 f-w-n m-t--3'>
                                            Соглашаюсь
                                        </h3>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <h3 className='f-f-j-R c-72 l-s-1 m-10 f-s-16'>
                                Пока тут ничего нет
                            </h3>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ContactsSuggestionList;