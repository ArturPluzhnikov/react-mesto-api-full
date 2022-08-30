class Auth {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  register(password, email) {
    return fetch(`${this.url}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ password, email }),
    }).then((res) => this._error(res));
  }

  login(password, email) {
    return fetch(`${this.url}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ password, email }),
    }).then((res) => this._error(res));
  }

  getContent(token) {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
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
  url: "https://api.arturartbox.students.nomoredomains.sbs",
  headers: {
    "Content-Type": "application/json",
  },
});
