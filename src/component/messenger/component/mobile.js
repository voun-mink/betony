import ListInterlocutors from './general/list_interlocutors/list_interlocutors';
import AddRecordAboutInterlocutor from './general/add_record_about_interlocutor/add_record_about_interlocutor';
import ContactsSuggestionList from './general/contacts_suggestion_list/contacts_suggestion_list';
import ButtonSuggestionList from './general/transition_button/suggestion_list/suggestion_list';
import ButtonListInterlocutors from './general/transition_button/list_interlocutors/list_interlocutors';

function Mobile({
    display, 
    changeDisplay,
    newRecordAboutInterlocutor,
    contactsSuggestionList,
    interlocutors,
    displComponentAddingRecordAboutColleague,
    saveIDAddedInterlocutor,
    offerContact,
    goContactSuggestionList,
    chatSelection,
    saveClientID,
    saveSession,
    contactsList,
    listInterlocutors,
    consentProposal
}) {

    return (
        <>
            {
                display &&
                    <div
                        className={`p-a w-100 h-100-p b-c-w d-f f-d-c`}
                    >
                        <div className='d-f j-c-s-b m-10 f-0-0-a'>
                            <button
                                className="b-c-E5 b-r w-30 h-30 d-f a-i-c j-c-c b-n c-p"
                                onClick={() => changeDisplay(display)}
                            >
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </button>
                            {
                                (!newRecordAboutInterlocutor  && !contactsSuggestionList) &&
                                    <ButtonSuggestionList
                                        mobile={true}
                                        goContactSuggestionList={goContactSuggestionList}
                                    />
                            }
                            {
                                (contactsSuggestionList && !newRecordAboutInterlocutor) &&
                                    <ButtonListInterlocutors
                                        mobile={true}
                                        listInterlocutors={listInterlocutors}
                                    />
                            }
                        </div>
                        {
                            (!newRecordAboutInterlocutor  && !contactsSuggestionList) &&
                                <ListInterlocutors
                                    interlocutors={interlocutors}
                                    additionComponent={displComponentAddingRecordAboutColleague}
                                    offerContact={offerContact}
                                    goContactSuggestionList={goContactSuggestionList}
                                    chatSelection={chatSelection}
                                    saveClientID={saveClientID}
                                    saveSession={saveSession}
                                    mobile={true}
                                    display={display}
                                    changeDisplay={changeDisplay}
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
                                    contactsList={contactsList}
                                    listInterlocutors={listInterlocutors}
                                    consentProposal={consentProposal}
                                    mobile={true}
                                />
                        }
                    </div>
            }
        </>
    );

}

export default Mobile;