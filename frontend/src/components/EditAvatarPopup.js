import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  React.useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-change"
      isOpen={isOpen}
      button="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          className="form__input form__input_type_link"
          type="url"
          name="avatar-change"
          id="avatar-input"
          placeholder="Ссылка на картинку"
          ref={inputRef}
          required
        />
        <span className="form__input-error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
