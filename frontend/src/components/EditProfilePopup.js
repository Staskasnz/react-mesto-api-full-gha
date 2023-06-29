import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function EditProfilePopup(props) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 
    
    function handleName(evt) {
        setName(evt.target.value);
    }

    function handleDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
      evt.preventDefault();
      props.onUpdateUser({
        name: name,
        about: description
      });
    }

    return (
    <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
          <input type="text" id="name" placeholder="Имя" className="popup__input" value={name || ""} onChange={handleName} minLength="2" maxLength="40"
            required />
          <span className="name-error popup__input-error"></span>
          <input type="text" id="vocation" placeholder="О себе" className="popup__input" value={description || ""} onChange={handleDescription} minLength="2"
            maxLength="200" required />
          <span className="vocation-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;