import React from "react";
import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="main">
        <section className="profile" aria-label="профиль">
          <div className="profile__content">
            <div className="profile__foto-block">
              <img
                className="profile__foto"
                src={currentUser.avatar}
                alt="Аватар"
              />
              <button
                className="profile__edit-foto-btn"
                type="button"
                onClick={props.onEditAvatar}
              ></button>
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={props.onEditProfile}
              ></button>
              <p className="profile__description">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="elements" aria-label="Элементы">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              link={card.link}
              name={card.name}
              likes={card.likes}
              onCardClick={props.onCardClick}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
