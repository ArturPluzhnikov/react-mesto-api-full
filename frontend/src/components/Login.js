import React from "react";
import Header from "./Header.js";

function Login({ handleLogin }) {
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
    handleLogin(userData.email, userData.password)
  }
  

  return (
    <>
      <Header text="Зарегистрироваться" path="/sign-up" />
      <div className="login">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__form-field">
            <input
              className="login__input login__email-input"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
              value={userData.email}
              onChange={handleChange}
            />
          </label>
          <label className="login__form-field">
            <input
              className="login__input login__password-input"
              name="password"
              id="password"
              type="password"
              placeholder="Пароль"
              required
              value={userData.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="login__button">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;