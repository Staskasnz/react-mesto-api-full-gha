function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__overlay" onClick={props.onClose}></div>
            <div className="popup__box">
                <button className="popup__close-button" aria-label="Кнопка закрытия попапа" type="button" onClick={props.onClose}></button>
                <div className="popup__container">
                    <h3 className="popup__title">{props.title}</h3>
                    <form className={`popup__form popup__${props.name}-form`} name="popupForm" onSubmit={props.onSubmit}> 
                        {props.children}
                        <button className="popup__save-button" type="submit">{props.buttonText}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PopupWithForm;
