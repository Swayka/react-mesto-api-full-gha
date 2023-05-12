import React from "react";

function ImagePopup(props) {
  return (
    <section className={`popup popup_type_picture ${props.isOpen && 'popup_opened'}`} aria-label="Попап">
      <div className="popup__container-img">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <img className="popup__img" src={props.card.link} alt={props.card.name} />
        <h2 className="popup__img-title">{props.card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
