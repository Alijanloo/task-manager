import axios from 'axios';
import store from '../store/index.js'
import { getToken } from './AuthService'

export default function Http() {
    return axios.create({
        baseURL: store.state.apiUrl,
        headers: {
            Authorization: getToken()
        }
    })
}