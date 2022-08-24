import PopupWithForm from "./PopupWithForm";

function DeletePopup({ card, isOpen, onClose, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(card);
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete"
      onClose={onClose}
      isOpen={isOpen}
      button="Да"
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeletePopup;