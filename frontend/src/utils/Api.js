class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  changeAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => this._error(res));
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => this._error(res));
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => this._error(res));
  }

  changeUserInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => this._error(res));
  }

  addNewCard(data) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => this._error(res));
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this._error(res));
  }

  changeLikeCardStatus(id, status) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: status ? "PUT" : "DELETE",
      headers: this.headers,
    }).then((res) => this._error(res));
  }

  _error(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  url: "http://api.arturartbox.students.nomoredomains.sbs",
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export default api;
