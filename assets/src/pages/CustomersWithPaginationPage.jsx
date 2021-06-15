import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "../components/Pagination";

const CustomersWithPaginationPage = () => {
    const [customers, setCustomers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 10

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
            .then((res) => {
                setCustomers(res.data['hydra:member'])
                setTotalItems(res.data['hydra:totalItems'])
                setLoading(false)
            })
            .catch((error) => console.log(error.response))
    }, [currentPage])

    const handleDelete = (id) => {
        const originalCustomers = [...customers]
        // 1. L'Approche optimiste
        setCustomers(customers.filter((customer) => customer.id !== id))
        // 2. L'Approche pessimiste
        axios.delete("http://127.0.0.1:8000/api/customerss/"+id)
            .then((res) => console.log('OK'))
            .catch((error) => {
                setCustomers(originalCustomers)
                console.log(error.response)
            })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
        setLoading(true)
    }
    const paginatedCustomers = Pagination.getData(customers, currentPage, itemsPerPage)

    return (
        <>
            <h1>Liste des clients (pagination)</h1>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>ID.</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th className="text-center">Factures</th>
                    <th className="text-center">Montant total</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                { loading && (<tr><td>Chargement...</td></tr>) }
                { !loading &&
                    customers.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td><a href="#">{c.firstName} {c.lastName}</a></td>
                            <td>{c.email}</td>
                            <td>{c.company}</td>
                            <td className="text-center">
                                <span className="badge rounded-pill bg-info">
                                    {c.invoices.length}
                                </span>
                            </td>
                            <td className="text-center">
                                {c.totalAmount.toLocaleString()} FCFA
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    disabled={c.invoices.length > 0}
                                    className="btn btn-sm btn-danger">
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems} onPageChange={handlePageChange}/>
        </>
    )
}

export default CustomersWithPaginationPage;