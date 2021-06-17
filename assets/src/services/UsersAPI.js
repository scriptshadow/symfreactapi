import axios from "axios";
import jwt from "jwt-decode";

/**
 *
 * @param user
 * @returns {Promise<AxiosResponse<any>>}
 */
function create(user) {
    return axios.post("http://127.0.0.1:8000/api/users", user)
        .then((res) => res.data)
}
export default {
    create,
}