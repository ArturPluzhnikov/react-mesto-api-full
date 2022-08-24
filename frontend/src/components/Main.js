import React from "react";
import Card from "./Cards";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-button">
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></div>
            <div
              onClick={onEditAvatar}
              id="profile__avatar-cover"
              className="profile__avatar-cover"
            ></div>
          </div>
          <div className="profile__description">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
            <button
              onClick={onEditProfile}
              className="profile__edit-button"
              id="profile__edit-button"
              type="button"
              aria-label="edit"
            ></button>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
          id="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
