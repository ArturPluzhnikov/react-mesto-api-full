import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      button="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          className="form__input form__input_type_name"
          onChange={handleNameChange}
          value={name || "Напишите имя"}
          type="text"
          name="profile"
          id="name-input"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="form__input-error name-input-error"></span>
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_type_description"
          onChange={handleDescriptionChange}
          value={description || "Расскажите о себе"}
          type="text"
          name="jobProfile"
          id="job-input"
          placeholder="Описание"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="form__input-error job-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
