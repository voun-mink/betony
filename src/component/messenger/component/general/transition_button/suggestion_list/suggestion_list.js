function ButtonSuggestionList({ goContactSuggestionList, mobile }) {

    const callUpContactSuggestionList = () => {
        goContactSuggestionList(true);
    };

    return (
        <div className={`${ !mobile ? '' : 'm-b-10' }`}>
            <button
                onClick={() => callUpContactSuggestionList()}
                className={`b-c-80 w-100-p b-n c-p b-r ${mobile ? 'h-30 p-l-10 p-r-10' : 'h-40'}`}
            >
                <h3 className='f-f-j-R c-w l-s-10 f-s-16 f-w-n m-t--3'>
                    список предложений
                </h3>
            </button>
        </div>
    );
}

export default ButtonSuggestionList;