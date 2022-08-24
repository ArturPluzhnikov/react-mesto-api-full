function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-photo ${card ? `popup_opened` : ""}`}>
      <div className="popup-photo__container">
        <img className="popup-photo__image" src={card?.link} alt={card?.name} />
        <button
          className="close-button popup-photo__close-button"
          type="button"
          aria-label="close"
          onClick={onClose}
        ></button>
        <h2 className="popup-photo__title">{card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
