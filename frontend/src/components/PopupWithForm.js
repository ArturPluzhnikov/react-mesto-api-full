function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  button,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup-${name} ${isOpen && `popup_opened`}`}
      id="popup-places"
    >
      <div className="popup-places__container">
        <button
          onClick={onClose}
          className="close-button popup-places__close-button"
          type="button"
          aria-label="close"
        ></button>
        <form
          className="form form__data-container"
          name={`${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="form__title">{title}</h2>
          {children}
          <button className="form__button" type="submit">
            {button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
