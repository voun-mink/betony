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
        <div className='f-g-1 p-l-10 p-b-10 p-r-10 b-r b-c-E5 m-10'>
            <div className="d-f">
                <input
                    type="text"
                    onChange={changeSetInterlocutorID}
                    className='m-10 h-30 f-g-1 p-l-10 b-n b-r c-72 f-f-j-M f-s-14 c-p'
                    placeholder="Введите идентификатор"
                />
            </div>
            <div className="d-f">
                <input
                    type="text"
                    onChange={changeSetAddressingInterlocutor}
                    className='d-b f-g-1 h-30 m-l-10 m-r-10 p-l-10 b-n b-r c-72 f-f-j-M f-s-14 c-p'
                    placeholder="Обращение к собеседнику* "
                />
            </div>
            <div className="d-f">
                <button
                    onClick={sendingIDParentComponent}
                    className='d-b m-10 f-g-1 b-n b-c-80 w-100-p b-n h-100-p h-40 c-p b-r'
                >
                    <h3 className='f-f-j-R c-w l-s-10 f-s-16 f-w-n m-t--3'>
                        Записать
                    </h3>
                </button>
            </div>
        </div>
    );
}

export default AddRecordAboutInterlocutor;