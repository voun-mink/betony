import ListInterlocutors from './components/sections/list_interlocutors/LI.component';
import AddRecordAboutInterlocutor from './components/sections/add_record_about_interlocutor/ARAI.component';
import ContactsSuggestionList from './components/sections/contacts_suggestion_list/CSL.component';

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