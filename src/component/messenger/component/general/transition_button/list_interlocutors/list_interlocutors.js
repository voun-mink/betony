function ButtonListInterlocutors({ listInterlocutors, mobile }) {

    const goListInterlocutors = () => {
        listInterlocutors();
    };

    return (
        <div className={`${ !mobile ? '' : 'm-b-10' }`}>
            <button
                onClick={() => goListInterlocutors()}
                className={`b-c-80 w-100-p b-n c-p b-r ${mobile ? 'h-30 p-l-10 p-r-10' : 'h-40'}`}
            >
                <h3 className='f-f-j-R c-w l-s-10 f-s-16 f-w-n m-t--3'>
                    список собеседников
                </h3>
            </button>
        </div>
    );
}

export default ButtonListInterlocutors;