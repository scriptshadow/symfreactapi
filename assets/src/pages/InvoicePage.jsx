import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import CustomersAPI from "../services/CustomersAPI";
import Select from "../components/forms/Select";
import InvoicesAPI from "../services/InvoicesAPI";
import {toast} from "react-toastify";
import FormContentLoader from "../components/loaders/FormContentLoader";

const initialState = {
    amount: '',
    customer: '',
    status: '',
}

const InvoicePage = ({match, history}) => {
    const {id = 'new'} = match.params

    const [customers, setCustomers] = useState([])

    const [invoice, setInvoice] = useState(initialState)
    const {amount, customer, status} = invoice

    const [errors, setErrors] = useState(initialState)
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(true)

    /**
     * Récupération des informations d'une facture en fonction de l'id
     * @param id
     * @returns {Promise<void>}
     */
    const fetchInvoice = async (id) => {
        try {
            const {amount, customer, status} = await InvoicesAPI.find(id)
            setInvoice({amount, customer: customer.id, status} )
            setLoading(false)
        } catch (e) {
            toast.error("Une erreur est survenue lors du chargement de la facture demandée!")
            history.replace("/invoices")
        }
    }

    /**
     * Recuperation de la liste des clients
     * @returns {Promise<void>}
     */
    const fetchCustomers = async () => {
        try {
            const data =  await CustomersAPI.findAll()
            setCustomers(data)
            if(!invoice.customer && id === 'new') setInvoice({...invoice, customer: data[0].id})
            setLoading(false)
        } catch (e) {
            toast.error("Une erreur est survenue lors du chargement des clients!")
            history.replace("/invoices")
        }
    }

    /**
     * Chargement des clients
     */
    useEffect(() => fetchCustomers(), [])

    /**
     * Chargement de la facture si besoin au chargement ou au changement de l'identifiant
     */
    useEffect(() => {
        if(id !== 'new') {
            setEditing(true)
            fetchInvoice(id)
        }
    }, [id])

    /**
     * Gestion des champs
     * @param currentTarget
     */
    const handleInputChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setInvoice({...invoice, [name]: value})
    }

    /**
     * Gestion du submit
     * @param e
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setErrors(initialState)
            if(editing){
                await InvoicesAPI.update(id, invoice)
                toast.success("La facture a bien été modifiée!")
            }else {
                await InvoicesAPI.create(invoice)
                toast.success("La facture a bien été creée!")
                history.replace("/invoices")
            }
        } catch ({response}) {
            const {violations} = response.data
            if(violations){
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
            toast.error("Des erreurs dans votre formulaire!")
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    {loading && (<FormContentLoader/>)}
                    {!loading && (<div className="col-md-8 mx-auto">
                        <h1>{editing ? "Modification" : "Création"} d'une facture</h1>
                        <form onSubmit={handleSubmit}>
                            <Field type="number" name="amount" label="Montant" placeholder="Montant de la facture" value={amount} onChange={handleInputChange} error={errors.amount}/>
                            <Select name="customer" label="Client" onChange={handleInputChange} value={customer} error={errors.customer}>
                                {customers.map((c) => (<option key={c.id} value={c.id}>{c.lastName} {c.firstName}</option>))}
                            </Select>
                            <Select name="status" label="Statut" onChange={handleInputChange} value={status} error={errors.status}>
                                <option value="SENT">Envoyée</option>
                                <option value="PAID">Payée</option>
                                <option value="CANCELLED">Annulée</option>
                            </Select>
                            <div className="form-group mt-2">
                                <button className="btn btn-success" type='submit'>{editing ? "Modifier" : "Créer"} la facture</button>
                                <Link to="/invoices" className="btn btn-link">
                                    Retour à la liste
                                </Link>
                            </div>
                        </form>
                    </div>)}
                </div>
            </div>
        </>
    )
}
export default InvoicePage