class Auth {
  constructor(config) {
    this.url = config.url;
  }

  register(password, email) {
    return fetch(`${this.url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then((res) => this._error(res));
  }

  login(password, email) {
    return fetch(`${this.url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then((res) => this._error(res))
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          return data;
        }
      });
  }

  getContent(token) {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._error(res));
  }

  _error(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const auth = new Auth({
  url: "http://api.arturartbox.students.nomoredomains.sbs",
});
