import axios from "axios";
import jwt from "jwt-decode";
import {USERS_API} from "../config";

function create(user) {
    return axios.post(USERS_API, user)
        .then((res) => res.data)
}
export default {
    create,
}