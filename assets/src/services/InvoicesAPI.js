import axios from "axios";

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/invoices")
        .then((res) => res.data['hydra:member'])
}
function find(id) {
    return axios
        .get("http://127.0.0.1:8000/api/invoices/"+id)
        .then((res) => res.data)
}
function create(invoice) {
    return axios.post("http://127.0.0.1:8000/api/invoices", {
        ...invoice, customer: `/api/customers/${invoice.customer}`
    })
}
function update(id, invoice) {
    return axios.put("http://127.0.0.1:8000/api/invoices/"+id, {
        ...invoice, customer: `/api/customers/${invoice.customer}`
    }).then((res) => res.data)
}
function deleteInvoice(id) {
    return axios
        .delete("http://127.0.0.1:8000/api/invoices/"+id)
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteInvoice
}