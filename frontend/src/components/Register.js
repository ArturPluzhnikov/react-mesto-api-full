import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header.js";

function Register({ handleRegister }) {

  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(userData.email, userData.password)
  }

  return (
    <>
      <Header text="Войти" path="/sign-in" />
      <div className="register">
        <h1 className="register__title">Регистрация</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__form-field">
            <input
              className="register__input register__email-input"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
              value={userData.email}
              onChange={handleChange}
            />
          </label>
          <label className="register__form-field">
            <input
              className="register__input register__password-input"
              name="password"
              id="password"
              type="password"
              placeholder="Пароль"
              required
              value={userData.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="register__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
}

export default Register;
