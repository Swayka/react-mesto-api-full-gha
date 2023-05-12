import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__button-like ${isLiked && 'element__button-like_active'}`
  );;

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      {isOwn &&  <button className="element__delete" type="button" onClick={handleDeleteClick}></button>}
      <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
      <div className="element__item">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-block">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );

}
export default Card;