import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";

import * as auth from "../utils/auth";

import ok from "../images/ok.svg"
import fail from "../images/fail.svg"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setisImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const [dataInfoTool, setDataInfoTool] = useState({
    title: "",
    icon: "",
  });


  useEffect(() => {
    tokenCheck();
      Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, userCards]) => {
        setCurrentUser(userData);
        setCards(userCards);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, []);


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setisImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser(userData) {
    api
      .editUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }


  function handleUpdateAvatar(userData) {
    api
      .editAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .newCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }


  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
          localStorage.setItem("token", res.token);
          setIsLogged(true);
          setUserEmail(email);
          navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setDataInfoTool({
          title: "Что-то пошло не так! Попробуйте ещё раз.",
          icon: fail,
        });
        setIsInfoTooltipPopupOpen(true);
      });
  };

  const handleRegister = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setDataInfoTool({
          title: "Вы успешно зарегистрировались!",
          icon: ok
        });
      })
      .catch((error) => {
        console.log(error);
        setDataInfoTool({
          title: "Что-то пошло не так! Попробуйте ещё раз.",
          icon: fail,
        });
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    setUserEmail("");
    navigate("/sign-in");
  };

  function tokenCheck () {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setIsLogged(true);
            setUserEmail(res.data.email);
            navigate("/", { replace: true });
          }
          else {
            setDataInfoTool({
              title: "Что-то пошло не так! Попробуйте ещё раз.",
              icon: fail,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__content">
        <Header headerMail={userEmail} signOut={handleSignOut}  />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLogged={isLogged}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  handleCardLike={handleCardLike}
                  handleCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route 
            path="/sign-in" 
            element={<Login handleLogin={handleLogin} />} />

        </Routes>
        
        <Footer />
        
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          title={dataInfoTool.title}
          icon={dataInfoTool.icon}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
        /> 

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit} 
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
        />

        <ImagePopup 
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
