import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardLink, setCardLink] = React.useState("");
  const [cardTitle, setCardTitle] = React.useState("");

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleChangeCardTitle(e) {
    setCardTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      link: cardLink,
      name: cardTitle,
    });
  }

  React.useEffect(() => {
    setCardLink("");
    setCardTitle("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="places"
      isOpen={isOpen}
      button="Создать"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          className="form__input form__input_type_title"
          type="text"
          name="titlePlaces"
          id="title-input"
          placeholder="Название"
          onChange={handleChangeCardTitle}
          value={cardTitle}
          required
          minLength="2"
          maxLength="30"
        />
        <span className="form__input-error title-input-error"></span>
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_type_link"
          type="url"
          name="linkPlaces"
          id="link-input"
          placeholder="Ссылка на картинку"
          onChange={handleChangeCardLink}
          value={cardLink}
          required
        />
        <span className="form__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
