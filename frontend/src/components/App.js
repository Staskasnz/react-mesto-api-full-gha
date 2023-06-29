import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
// import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { useEffect, useRef, useState } from 'react';
import { api, apiAuth } from '../utils/Api.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSucsess, setIsSucsess] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const isSucsessRef = useRef(isSucsess);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getCardInfo()
      ])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, [])

  function tokenCheck() {
    if (localStorage.getItem('token')) {
      apiAuth.checkJwt()
        .then((data) => {
          setLoginEmail(data.data.email);
          setLoggedIn(true);
          navigate('/', { replace: true })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(item => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(inputData) {
    api.saveUserInfo(inputData)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(inputData) {
    api.setAvatar(inputData)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(inputData) {
    api.createNewCard(inputData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleLogin(inputData) {
    apiAuth.signIn(inputData)
      .then((data) => {
        setIsSucsess(true);
        isSucsessRef.current = true;
        setLoggedIn(true);
        localStorage.setItem('token', data.token);
      })
      .catch((err) => {
        setIsSucsess(false);
        handleInfoTooltip();
        console.log(err);
      })
      .finally(() => {
        if (isSucsessRef.current === true) {
          setLoginEmail(inputData.email);
          navigate('/', { replace: true });
        }
      });
  }

  function handleRegister(inputData) {
    apiAuth.signUp(inputData)
      .then(() => {
        setIsSucsess(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setIsSucsess(false);
        console.log(err);
      })
      .finally(() => {
        handleInfoTooltip();
      });
  }

  function handleInfoTooltip() {
    setIsInfoTooltip(!isInfoTooltip);
  }

  function onSignOut() {
    setLoginEmail('');
    localStorage.removeItem('token');
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard(null);
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>

        <Header loginEmail={loginEmail} setLoginEmail={setLoginEmail} onSignOut={onSignOut} />

        <Routes>
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/" element={<ProtectedRoute element={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}
            cards={cards}
          />}
          />
        </Routes>

        <Footer />

        <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} isSucsess={isSucsess} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* <PopupWithForm name="delete" title="Вы уверены?" isOpen="">
          <input type="url" id="avatar" placeholder="Ссылка на аватар" className="popup__input popup__input_avatar" minLength="2"
            maxLength="300" required />
          <button className="popup__save-button popup__delete-card-button" type="button">Да</button></PopupWithForm> */}

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
