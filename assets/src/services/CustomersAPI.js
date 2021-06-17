import axios from "axios";

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/customers?order[id]=desc")
        .then((res) => res.data['hydra:member'])
}
function find(id) {
    return axios
        .get("http://127.0.0.1:8000/api/customers/"+id)
        .then((res) => res.data)
}
function create(customer) {
    return axios.post("http://127.0.0.1:8000/api/customers", customer)
        .then((res) => res.data)
}
function update(id, customer) {
    return axios.put("http://127.0.0.1:8000/api/customers/"+id, customer)
        .then((res) => res.data)
}

function deleteCustomer(id) {
    return axios
        .delete("http://127.0.0.1:8000/api/customers/"+id)
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteCustomer,
}