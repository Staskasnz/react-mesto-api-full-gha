import sucsessImage from "../images/complate.png"
import nonSucsessImage from "../images/no.png"

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__overlay" onClick={props.onClose}></div>
            <div className="popup__box">
                <button className="popup__close-button" aria-label="Кнопка закрытия попапа" type="button" onClick={props.onClose}></button>
                <div className="popup__container">
                    <img src={props.isSucsess ? sucsessImage : nonSucsessImage} alt="sucsess" className="popup__sucsess-img"/>
                    <h3 className="popup__title popup__title-tooltip">{props.isSucsess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h3>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;