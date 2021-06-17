import axios from "axios";
import jwt from "jwt-decode";
import {LOGIN_API} from "../config";

/**
 * Deconnexion (suppression du token du localStorage et sur Axios)
 */
function logout() {
    localStorage.removeItem('authToken')
    delete axios.defaults.headers["Authorization"]
}

/**
 * Réquête HTTP d'authentification et stockage du token dans le localStorage et sur Axios
 * @param credentials
 * @returns {Promise<AxiosResponse<any>>}
 */
async function authenticate(credentials) {
    return axios
        .post(LOGIN_API, credentials)
        .then((res) => res.data.token)
        .then((token) => {
            // On stocke le token dans notre localStorage
            localStorage.setItem('authToken', token)
            //On previent axios qu'on a maintenant un header par defaut sur toutes nos futures réquêtes.
            setAxiosToken(token)
        })
}

/**
 * Positionne le token JWT sur Axios
 * @param token
 */
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token
}

/**
 * Mise en place lors du chargement de l'application
 */
function setup() {
    const token = localStorage.getItem('authToken')
    if(token){
        const {exp: expiration} = jwt(token)
        if(expiration * 1000 > new Date().getTime()){
            setAxiosToken(token)
        }
    }
}

/**
 * Permet de savoir si on est authentifié ou pas.
 * @returns {boolean}
 */
function isAuthenticated() {
    const token = localStorage.getItem('authToken')
    if(token){
        const {exp: expiration} = jwt(token)
        if(expiration * 1000 > new Date().getTime()){
            return true
        }
        return false
    }
    return false
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}