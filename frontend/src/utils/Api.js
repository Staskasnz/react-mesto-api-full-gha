


class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    getUserInfo() {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(handleResponse)
    }


    getCardInfo() {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(handleResponse)
    }

    saveUserInfo(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(handleResponse)
    }

    setAvatar(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(handleResponse)
    }

    createNewCard(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: data.title,
                link: data.link
            })
        })
            .then(handleResponse)
    }

    deleteCard(cardId) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(handleResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
        const token = localStorage.getItem("token");
        if (isLiked) {
            return fetch(`${this.url}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
                .then(handleResponse)
        } else {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
                .then(handleResponse)
        }
    }

    signUp(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then(handleResponse)
    }

    signIn(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then(handleResponse)
    }

    checkJwt() {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(handleResponse)
            .then((data) => {
                localStorage.setItem('token', data.token)
                return data;
            })
    }
}

const jwtToken = localStorage.getItem("token");
const api = new Api({
    baseUrl: 'http://localhost:3001',
    headers: {
        authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
    }
});

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error('Ошибка!!!'))
}

export { api };
