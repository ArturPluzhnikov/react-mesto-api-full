import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { auth } from "../utils/Auth.js";
import InfoTooltip from "./InfoTooltip";
import DeletePopup from "./DeletePopup";

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState({});
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isOnSuccess, setIsOnSuccess] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const history = useHistory();
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (isLoggedIn) {
        Promise.all([api.getUserInfo(token), api.getInitialCards(token)])                    
            .then(([user, cards]) => {
                setCurrentUser(user);
                setEmail(user.email);
                setCards(cards);
                history.push("/");
            })
            .catch((err) => console.log(err));
        }
    if (!isLoggedIn) { setCurrentUser({}); }
  }, [isLoggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(name, link) {
    setIsImagePopupOpen(true);
    setSelectedCard({ name, link });
  }

  function handleDeleteButtonClick(card) {
    setIsDeletePopupOpen(true);
    setCardToDelete(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setCardToDelete({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, token)
      .then(() => {
        setCards((state) => state.filter((c) => (c._id === card._id ? "" : c)));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .changeUserInfo(data, token)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((er) => console.log(er));
  }

  function handleAvatarUpdate(link) {
    api
      .changeAvatar(link, token)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddCard(data) {
    api
      .addNewCard(data, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  ////////////////////////////?????????? ??????????????????????????????////////////////////////

  function handleInfoOpen(res) {
    setIsOnSuccess(res);
    setIsInfoTooltipPopupOpen(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");

      if (token) {
        setToken(token);
        auth.getContent(token)
          .then((data) => {
            setIsLoggedIn(true);
            setEmail(data.email);               
            history.push("/");
          })
          .catch((err) => console.log(err));
    }
  }

  function handleLogin(email, password) {
    if (!email || !password) {
      return;
    }

    auth
      .login(password, email)
      .then((res) => {
        if (res) {
          setUserData({ email: "", password: "" });

          tokenCheck();

          history.push("/");
        } else {
          setUserData({
            ...userData,
            message: "??????-???? ?????????? ???? ??????!",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(email, password) {
    auth
      .register(password, email)
      .then((res) => {
        if (res) {
          handleInfoOpen(true);
          history.push("/sign-in");
        } else {
          setUserData({
            ...userData,
            message: "??????-???? ?????????? ???? ??????!",
          });
        }
      })
      .catch((err) => {
        handleInfoOpen(false);
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={isLoggedIn}
            component={() => {
              return (
                <>
                  <Header
                    email={email}
                    handleLogout={handleLogout}
                    text="??????????"
                    path="/sign-in"
                  >
                    <p className="header__email">{email}</p>
                  </Header>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardDelete={handleDeleteButtonClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                  />
                  <Footer />
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                  />
                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleAvatarUpdate}
                  />
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddCard}
                  />
                  <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={isImagePopupOpen}
                  />

                  <DeletePopup
                    onClose={closeAllPopups}
                    isOpen={isDeletePopupOpen}
                    onSubmit={handleCardDelete}
                    card={cardToDelete}
                  />
                </>
              );
            }}
          />
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/">
            <Redirect to="/sign-in" />
          </Route>
        </Switch>
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipPopupOpen}
          isOnSuccess={isOnSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
