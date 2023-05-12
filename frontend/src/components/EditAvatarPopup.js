import { useRef } from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup(props) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 

  return (
    <PopupWithForm
          onClose={props.onClose}
          isOpen={props.isOpen}
          onSubmit={handleSubmit}
          name="editFoto"
          title="Обновить аватар"
          titleBtn="Да"
          children={
            <>
              <input
                ref={avatarRef}
                className="popup__input popup__input_type_edit-foto"
                id="avatar-input"
                type="url"
                name="avatar"
                placeholder="Ссылка на аватар"
                required
              />
              <span className="popup__input-span-error avatar-input-error"></span>
            </>
          }
        />
  )

}

export default EditAvatarPopup;