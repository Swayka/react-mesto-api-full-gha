import { useContext, useEffect, useState } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm"

function EditProfilePopup(props) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);


  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          name="profile"
          title="Редактировать профиль"
          titleBtn="Сохранить"
          children={
            <>
              <input
                value={name || ""}
                onChange={handleChangeName}
                className="popup__input popup__input_type_name"
                id="name-input"
                type="text"
                name="name"
                minLength="2"
                maxLength="40"
                placeholder="Имя"
                required
              />
              <span className="popup__input-span-error name-input-error"></span>
              <input
                value={description || ""}
                onChange={handleChangeDescription}
                className="popup__input popup__input_type_description"
                id="link-input"
                type="text"
                name="about"
                placeholder="Профессия"
                minLength="2"
                maxLength="200"
                required
              />
              <span className="popup__input-span-error link-input-error"></span>
            </>
          }
        />
  )
}

export default EditProfilePopup;