const apiInfoConfig = {
    url: 'https://nomoreparties.co/v1/cohort-60',
    headers: {
        authorization: 'dacb1343-5ee5-4c35-990d-5bf7b2f7cc79',
        'Content-Type': 'application/json'
    }
}

const authConfig = {
    url: 'https://auth.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json'
    }
}

class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        })
            .then(handleResponse)
    }


    getCardInfo() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        })
            .then(handleResponse)
    }

    saveUserInfo(data) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(handleResponse)
    }

    setAvatar(data) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(handleResponse)
    }

    createNewCard(data) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.title,
                link: data.link
            })
        })
            .then(handleResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(handleResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this.url}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this.headers
            })
                .then(handleResponse)
        } else {
            return fetch(`${this.url}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this.headers
            })
                .then(handleResponse)
        }
    }

    signUp(data) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then(handleResponse)
    }

    signIn(data) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then(handleResponse)
    }

    checkJwt() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(handleResponse)
    }
}

const api = new Api(apiInfoConfig);
const apiAuth = new Api(authConfig)

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error('Ошибка!!!'))
}

export { api, apiAuth };
