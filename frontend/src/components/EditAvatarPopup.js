import PopupWithForm from './PopupWithForm.js';
import { useEffect, useRef } from 'react';

function EditAvatarPopup(props) {

    const avatarRef = useRef(null);

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        if (!props.isOpen) {
            avatarRef.current.value = "";
        }
    }, [props.isOpen])

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input type="url" id="avatar" placeholder="Ссылка на аватар" className="popup__input popup__input_avatar" ref={avatarRef} 
                minLength="2" maxLength="300" required />
            <span className="avatar-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;