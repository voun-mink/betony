import ListInterlocutors from './general/list_interlocutors/list_interlocutors';
import AddRecordAboutInterlocutor from './general/add_record_about_interlocutor/add_record_about_interlocutor';
import ContactsSuggestionList from './general/contacts_suggestion_list/contacts_suggestion_list';

function Desktop({
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
        <div className={`w-20-p h-100-p d-f f-d-c p-10 ${ (newRecordAboutInterlocutor && !contactsSuggestionList) ? 'p-10' : '' }`}>
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
                    />
            }
        </div>
    );
}

export default Desktop;