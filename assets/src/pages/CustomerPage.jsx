import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import CustomersAPI from "../services/CustomersAPI";

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

    /**
     * Récupération des informations d'un client en fonction de l'id
     * @param id
     * @returns {Promise<void>}
     */
    const fetchCustomer = async (id) => {
        try {
            const {lastName, firstName, email, company} = await CustomersAPI.find(id)
            setCustomer({lastName, firstName, email, company} )
        } catch (e) {
            history.replace("/customers")
        }
    }

    /**
     * Chargement du client si besoin au chargement ou au changement de l'identifiant
     */
    useEffect(() => {
        if(id !== 'new') {
            setEditing(true)
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
            if(editing){
                await CustomersAPI.update(id, customer)
            }else {
                await CustomersAPI.create(customer)
                history.replace("/customers")
            }
            setError(initialState)
        } catch ({response}) {
            const {violations} = response.data
            if(violations){
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setError(apiErrors)
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
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
                    </div>
                </div>
            </div>
        </>
    )
}
export default CustomerPage