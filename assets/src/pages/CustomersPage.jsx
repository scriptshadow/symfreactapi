import React, {useEffect, useState} from 'react';
import CustomersAPI from "../services/CustomersAPI";
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const CustomersPage = (props) => {
    const [customers, setCustomers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    //Recuperation de la liste des clients
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data)
        } catch (e) {
            toast.error("Une erreur est survenue lors du chargement des clients!")
        }
        setLoading(false)
    }

    //Au chargement du composant, on chercher les clients
    useEffect(() => fetchCustomers(), [])

    //Gestion de la suppression d'un client
    const handleDelete = async (id) => {
        const originalCustomers = [...customers]
        setCustomers(customers.filter((customer) => customer.id !== id))
        try {
            await CustomersAPI.delete(id)
            toast.success("Le compte du client a bien été supprimé !")
        } catch (e) {
            setCustomers(originalCustomers)
            toast.error("Une erreur est survenue lors de la suppression!")
        }
        //Deuxième façon de faire une requête (traitement de promosse)
        // CustomersAPI.delete(id)
        //     .then((res) => console.log('OK'))
        //     .catch((error) => {
        //         setCustomers(originalCustomers)
        //         console.log(error.response)
        //     })
    }

    //Gestion du changement de page
    const handlePageChange = (page) => setCurrentPage(page)

    //Filtrages des informations en fonction de la recherche
    const filteredCustomers = customers.filter((c) => {
        return c.firstName.toLowerCase().includes(search.toLowerCase())
            || c.lastName.toLowerCase().includes(search.toLowerCase())
            || c.email.toLowerCase().includes(search.toLowerCase())
            || (c.company && c.company.toLowerCase().includes(search.toLowerCase()));
    })
    //Gestion de la pagination
    const itemsPerPage = 10
    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage)

    //Gestion de la recherche
    const handleSearchChange = ({currentTarget}) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link to="/customers/new" className="btn btn-primary btn-sm">
                    Créer un client
                </Link>
            </div>
            <div className="form-group">
                <input type="text" onChange={handleSearchChange} value={search} className="form-control" placeholder="Rechercher..."/>
            </div>
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
                {!loading && (<tbody>
                    {paginatedCustomers.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>
                                <Link to={"/customers/"+c.id}>
                                    {c.firstName} {c.lastName}
                                </Link>
                            </td>
                            <td>{c.email}</td>
                            <td>{c.company}</td>
                            <td className="text-center">
                                <span className="badge rounded-pill bg-primary">
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
                </tbody>)}
            </table>
            {loading && (<TableLoader/>)}
            {itemsPerPage < filteredCustomers.length && (<Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length}
                         onPageChange={handlePageChange}/>)}
        </>
    )
}

export default CustomersPage