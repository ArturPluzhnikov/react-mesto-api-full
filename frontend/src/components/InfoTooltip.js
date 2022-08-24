import isOnSuccessImage from "../images/success.svg";
import isOnFaileImage from "../images/failed.svg";

function InfoTooltip({ isOnSuccess, onClose, isOpen }) {
  return (
    <div className={`popup popup-info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup-info__container">
        <button
          type="button"
          className="close-button popup-info__close-button"
          onClick={onClose}
        ></button>
        <img
          className="registration__answer-image"
          src={isOnSuccess ? isOnSuccessImage : isOnFaileImage}
        />
        <h2 className="registration__answer-title">
          {isOnSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
