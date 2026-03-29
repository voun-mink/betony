import { useState } from "react";

function AddRecordAboutInterlocutor({ additionComponent }) {
    const [interlocutorID, setInterlocutorID] = useState('');
    const [addressingInterlocutor, setAddressingInterlocutor] = useState('');

    const changeSetInterlocutorID = (e) => {
        setInterlocutorID(e.target.value);
    };

    const changeSetAddressingInterlocutor = (e) => {
        setAddressingInterlocutor(e.target.value);
    };

    const sendingIDParentComponent = () => {
        additionComponent({
            id: interlocutorID,
            addressing: addressingInterlocutor
        });
    };

    return (
        <div>
            <h3>Введите идентификатор</h3>
            <input
                type="text"
                onChange={changeSetInterlocutorID}
            />
            <h3>{`Обращение к собеседнику (не обязательно)`}</h3>
            <input
                type="text"
                onChange={changeSetAddressingInterlocutor}
            />
            <button
                onClick={sendingIDParentComponent}
            >
                Записать
            </button>
        </div>
    );
}

export default AddRecordAboutInterlocutor;