import { CurrentUserContext } from '../context/CurrentUserContext.js';
import React from 'react';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <div className="photo-grid__element">
            {isOwn && <button aria-label="Удалить" className="photo-grid__delete-button" type="button" onClick={handleDeleteClick} />} 
            <img className="photo-grid__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <div className="photo-grid__blok">
                <h2 className="photo-grid__title">{props.card.name}</h2>
                <div className="photo-grid__likes-blok">
                    <button aria-label="Поставить лайк" className={`photo-grid__like ${isLiked && 'photo-grid__like_active'}`} type="button" onClick={handleLikeClick} />
                    <p className="photo-grid__likes-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;