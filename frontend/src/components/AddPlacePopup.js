import { useEffect, useState } from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {

  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setPlace('');
    setLink('');
  },[props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: place,
      link: link,
    });
  }

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          name="card-add"
          title="Новое место"
          titleBtn="Создать"
          children={
            <>
              <input
                onChange={handleChangePlace}
                value={place}
                className="popup__input popup__input_type_title"
                id="mesto-input"
                type="text"
                name="pictureName"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
              />
              <span className="popup__input-span-error mesto-input-error"></span>
              <input
                onChange={handleChangeLink}
                value={link}
                className="popup__input popup__input_type_picture"
                type="url"
                id="url-input"
                name="picture-link"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="popup__input-span-error url-input-error"></span>
            </>
          }
        />
  )

}

export default AddPlacePopup;