import React from "react";

function PopupWithForm(props) {

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`} aria-label="Попап" onClick={props.onOverlay}>
    <div className="popup__container">
      <button className="popup__close" type="button" onClick={props.onClose}></button>
      <h2 className="popup__title">{props.title}</h2>
      <form onSubmit={props.onSubmit} className={`popup__form popup__form_${props.name}`} name={props.name} noValidate>
        {props.children}
        <button className="popup__submit" type="submit">{props.titleBtn}</button>
      </form>
    </div>
  </section>
  );
}

export default PopupWithForm;
