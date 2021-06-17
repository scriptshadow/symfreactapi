import React, {useContext, useState} from 'react';
import AuthAPI from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const LoginPage = ({history}) =>{
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const [error, setError] = useState('')
    const {setIsAuthenticated} = useContext(AuthContext)

    const {username, password} = credentials

    //Gestion des champs
    const handleChangeInput = ({currentTarget}) => {
        const {name, value} = currentTarget
        setCredentials({...credentials, [name]: value})
    }
    //Gestion du submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await AuthAPI.authenticate(credentials)
            setError("")
            setIsAuthenticated(true)
            toast.success("Vous êtes desormais connecté !")
            history.replace("/customers")
        } catch (error) {
            setError("Les informations ne correspondent pas.")
            toast.error("Une erreur est survenue!")
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h1 className="text-center">Authentification</h1>
                        <form onSubmit={handleSubmit}>
                            <Field type="email"
                                   name="username"
                                   label="Adresse email"
                                   placeholder="Adresse email de connexion"
                                   value={username}
                                   onChange={handleChangeInput}
                                   error={error}
                            />
                            <Field type="password"
                                   name="password"
                                   label="Mot de passe"
                                   value={password}
                                   onChange={handleChangeInput}
                                   error={error}
                            />
                            <div className="form-group mt-2">
                                <button className="btn btn-success" type='submit'>S'identifier</button>
                            </div>
                        </form>
                        <p>Vous n'avez pas de compte? <Link to="/register">S'inscrire</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginPage;