class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  changeAvatar(link, token) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: link }),
    }).then((res) => this._error(res));
  }

  getInitialCards(token) {
    return fetch(`${this.url}/cards`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._error(res));
  }

  getUserInfo(token) {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._error(res));
  }

  // getUserInfo() {
  //   return fetch(`${this.url}/users/me`, {
  //     method: "GET",
  //     headers: this.headers,
  //   }).then((res) => this._error(res));
  // }

  changeUserInfo({ name, about }, token) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: name, about: about }),
    }).then((res) => this._error(res));
  }

  addNewCard({ name, link, _id }, token) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: name, link: link, _id: _id }),
    }).then((res) => this._error(res));
  }

  deleteCard(id, token) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._error(res));
  }

  changeLikeCardStatus(id, status, token) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: status ? "PUT" : "DELETE",
      headers: {
        ...this._headers,
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

const api = new Api({
  url: "https://api.arturartbox.students.nomoredomains.sbs",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
