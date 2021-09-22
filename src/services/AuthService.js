import store from '../store/index.js'
import Http from './HttpServices.js'
import jwt from 'jsonwebtoken'

export function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token != null;
}

export function login(user) {
    Http().post('/auth', user)
    .then(res => {
        if(res) {
            setToken(res.data.token);
        }
    })
}

export function logout() {
    localStorage.clear();
    store.dispatch('authenticate')
}

export function setToken(token) {
    localStorage.setItem('token', token);
    store.dispatch('authenticate')
}

export function getUserName() {
    const token = decodeToken();
    if(!token) {
        return null;
    }
    return token.user.username;
}

export function getUserId() {
    const token = decodeToken();
    if(!token) {
        return null;
    }
    return token.user.id;
}

export function register(user) {
    return Http().post('/register', user);
}

export function getToken() {
    return localStorage.getItem('token');
}

export function decodeToken() {
    const token = getToken();
    if(!token) {
        return null;
    }
    return jwt.decode(token);
}