import PopupWithForm from './PopupWithForm.js';
import { useEffect, useRef } from 'react';

function AddPlacePopup(props) {

    const titleRef = useRef(null);
    const linkRef = useRef(null);

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({
            title: titleRef.current.value,
            link: linkRef.current.value
        })
    }
    
    useEffect(() => {
        if (!props.isOpen) {
            titleRef.current.value = "";
            linkRef.current.value = "";
        }
    }, [props.isOpen])

    return(
        <PopupWithForm name="add" title="Новое место" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
        <input type="text" id="title" className="popup__input popup__input_type_title"
          placeholder="Название" minLength="2" maxLength="30" ref={titleRef} required />
        <span className="title-error popup__input-error"></span>
        <input type="url" id="link" className="popup__input popup__input_type_link"
          placeholder="Ссылка на картинку" ref={linkRef} required />
        <span className="link-error popup__input-error"></span>
      </PopupWithForm>
    )
}

export default AddPlacePopup;