import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-box">
                    <div className="profile__avatar-pencil" onClick={props.onEditAvatar}></div>
                    <img src={currentUser.avatar} alt="Аватарка" className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button aria-label="Редактировать" className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    <div className="line-break"></div>
                    <p className="profile__vocation">{currentUser.about}</p>
                </div>
                <button aria-label="Добавить" className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="photo-grid">
                {props.cards.map((item) => {
                    return (
                        <Card
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                            card={item}
                            key={item._id}
                        />
                    )
                })}
            </section>
        </main>
    )
}

export default Main;
