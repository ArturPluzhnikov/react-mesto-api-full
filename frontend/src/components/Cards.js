import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  //check owner
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `grid-element__trash ${
    isOwn ? "grid-element__trash" : "grid-element__trash_hidden"
  }`;
  //check if liked
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `grid-element__emoji ${
    isLiked ? "grid-element__emoji_active" : ""
  }`;

  function handleClick() {
    onCardClick(card.name, card.link);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="grid-element">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <img
        className="grid-element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="grid-element__description">
        <h2 className="grid-element__title">{card.name}</h2>
        <div className="grid-element__emoji-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="like"
          ></button>
          <p className="grid-element__emoji-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
