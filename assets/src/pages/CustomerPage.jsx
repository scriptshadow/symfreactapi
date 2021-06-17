import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import CustomersAPI from "../services/CustomersAPI";
import {toast} from "react-toastify";
import FormContentLoader from "../components/loaders/FormContentLoader";

const initialState = {
    lastName: '',
    firstName: '',
    email: '',
    company: '',
}

const CustomerPage = ({match, history}) => {
    const {id = 'new'} = match.params

    const [customer, setCustomer] = useState(initialState)
    const {lastName, firstName, email, company} = customer
    const [error, setError] = useState(initialState)
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    /**
     * Récupération des informations d'un client en fonction de l'id
     * @param id
     * @returns {Promise<void>}
     */
    const fetchCustomer = async (id) => {
        try {
            const {lastName, firstName, email, company} = await CustomersAPI.find(id)
            setCustomer({lastName, firstName, email, company} )
            setLoading(false)
        } catch (e) {
            toast.error("Une erreur est survenue lors du chargement des informations du client!")
            history.replace("/customers")
        }
    }

    /**
     * Chargement du client si besoin au chargement ou au changement de l'identifiant
     */
    useEffect(() => {
        if(id !== 'new') {
            setEditing(true)
            setLoading(true)
            fetchCustomer(id)
        }
    }, [id])

    /**
     * Gestion des champs
     * @param currentTarget
     */
    const handleInputChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setCustomer({...customer, [name]: value})
    }

    /**
     * Gestion du submit
     * @param e
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError(initialState)
            if(editing){
                await CustomersAPI.update(id, customer)
                toast.success("Le compte du clients a bien été modifié!")
            }else {
                await CustomersAPI.create(customer)
                toast.success("Le compte du clients a bien été creé!")
                history.replace("/customers")
            }
        } catch ({response}) {
            const {violations} = response.data
            if(violations){
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setError(apiErrors)
            }
            toast.error("Des erreurs dans votre formulaire!")
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    {loading && (<FormContentLoader/>)}
                    {!loading && (<div className="col-md-6 mx-auto">
                        <h1>{editing ? "Modification du client" : "Création d'un client"}</h1>
                        <form onSubmit={handleSubmit}>
                            <Field name="lastName" label="Nom de famille" value={lastName} onChange={handleInputChange}  error={error.lastName}/>
                            <Field name="firstName" label="Prénom" value={firstName} onChange={handleInputChange} error={error.firstName}/>
                            <Field type="email" name="email" label="E-mail" value={email} onChange={handleInputChange} error={error.email}/>
                            <Field name="company" label="Entreprise" value={company} onChange={handleInputChange} error={error.company}/>
                            <div className="form-group mt-2">
                                <button className="btn btn-success" type='submit'>{editing ? "Modifier le compte" : "Créer le compte"}</button>
                                <Link to="/customers" className="btn btn-link">
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
export default CustomerPage