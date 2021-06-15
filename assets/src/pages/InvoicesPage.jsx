import React, {useEffect, useState} from 'react';
import InvoicesAPI from "../services/InvoicesAPI";
import moment from "moment";
import Pagination from "../components/Pagination";

const STATUS_CLASSES = {
    PAID: 'success',
    SENT: 'primary',
    CANCELLED: 'danger',
}
const STATUS_LABELS = {
    PAID: 'Payée',
    SENT: 'Envoyée',
    CANCELLED: 'Annulée',
}

const InvoicesPage = (props) => {
    const [invoices, setInvoices] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const itemsPerPage = 10

    //Recuperation de la liste des clients
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll()
            setInvoices(data)
        } catch (e) {
            console.log(e.response)
        }
    }

    //Au chargement du composant, on chercher les clients
    useEffect(() => fetchInvoices(), [])

    //Gestion de la suppression d'un client
    const handleDelete = async (id) => {
        const originalInvoices = [...invoices]
        setInvoices(invoices.filter((invoice) => invoice.id !== id))
        try {
            await InvoicesAPI.delete(id)
        } catch (e) {
            setInvoices(originalInvoices)
            console.log(e.response)
        }
    }

    //Gestion du changement de page
    const handlePageChange = (page) => setCurrentPage(page)

    //Filtrages des informations en fonction de la recherche
    const filteredInvoices = invoices.filter((i) => {
        return i.customer.firstName.toLowerCase().includes(search.toLowerCase())
            || i.customer.lastName.toLowerCase().includes(search.toLowerCase())
            || i.amount.toString().startsWith(search.toLowerCase())
            || STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase());
    })

    //Gestion de la pagination
    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage)

    //Gestion de la recherche
    const handleSearchChange = ({currentTarget}) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }

    //Gestion du formatage de la date
    const formatDate = (str) => moment(str).format("DD/MM/YYYY");

    return (
        <>
            <h1>Liste des factures</h1>
            <div className="form-group">
                <input type="text" onChange={handleSearchChange} value={search} className="form-control" placeholder="Rechercher..."/>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Client</th>
                    <th className="text-center">Date d'envoi</th>
                    <th className="text-center">Statut</th>
                    <th className="text-center">Montant</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {
                    paginatedInvoices.map((i) => (
                        <tr key={i.id}>
                            <td>{i.id}</td>
                            <td><a href="#">{i.customer.firstName} {i.customer.lastName}</a></td>
                            <td className="text-center">
                                {formatDate(i.sentAt)}
                            </td>
                            <td className="text-center">
                                <span className={"badge rounded-pill bg-" + STATUS_CLASSES[i.status]}>
                                    {STATUS_LABELS[i.status]}
                                </span>
                            </td>
                            <td className="text-center">
                                {i.amount.toLocaleString()} FCFA
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary mr-1">
                                    Editer
                                </button>&nbsp;
                                <button
                                    onClick={() => handleDelete(i.id)}
                                    className="btn btn-sm btn-danger">
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {itemsPerPage < filteredInvoices.length
            && (<Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredInvoices.length}
                onPageChange={handlePageChange}/>)
            }
        </>
    )
}

export default InvoicesPage