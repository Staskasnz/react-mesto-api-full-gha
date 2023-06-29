function ImagePopup(props) {
    return (
        <div className={`popup popup_full-image ${props.card ? "popup_opened" : ""}`}>
            <div className="popup__overlay" onClick={props.onClose}></div>
            <div className="popup__box">
                <button className="popup__close-button" aria-label="Кнопка закрытия попапа" type="button" onClick={props.onClose}></button>
                <img className="popup__img" alt={props.card && props.card.name} src={props.card && props.card.link} />
                <p className="popup__img-title">{props.card && props.card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;
