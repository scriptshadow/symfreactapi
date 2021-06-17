import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";
import UsersAPI from "../services/UsersAPI";

const initialState = {
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    passwordConfirm: '',
}

const RegisterPage = ({history}) =>{
    const [user, setUser] = useState(initialState)
    const {lastName, firstName, email, password, passwordConfirm} = user

    const [errors, setErrors] = useState(initialState)
    const {setIsAuthenticated} = useContext(AuthContext)

    //Gestion des champs
    const handleChangeInput = ({currentTarget}) => {
        const {name, value} = currentTarget
        setUser({...user, [name]: value})
    }
    //Gestion du submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        const apiErrors = {}
        if(password !== passwordConfirm){
            apiErrors.passwordConfirm = "Les 2 mot de passes ne correspondent pas."
            setErrors(apiErrors)
            return
        }
        try {
            const response = await UsersAPI.create(user)
            console.log(response)
            setErrors({})
            history.replace("/login")
        } catch ({response}) {
            const {violations} = response.data
            if(violations){
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h1 className="text-center">Identification</h1>
                        <form onSubmit={handleSubmit}>
                            <Field name="lastName"
                                   label="Nom de famille"
                                   value={lastName}
                                   onChange={handleChangeInput}
                                   error={errors.lastName}
                            />
                            <Field name="firstName"
                                   label="Prénoms"
                                   value={firstName}
                                   onChange={handleChangeInput}
                                   error={errors.firstName}
                            />
                            <Field type="email"
                                   name="email"
                                   label="Adresse email"
                                   value={email}
                                   onChange={handleChangeInput}
                                   error={errors.email}
                            />
                            <Field type="password"
                                   name="password"
                                   label="Mot de passe"
                                   value={password}
                                   onChange={handleChangeInput}
                                   error={errors.password}
                            />
                            <Field type="password"
                                   name="passwordConfirm"
                                   label="Confirmation de mot de passe"
                                   value={passwordConfirm}
                                   onChange={handleChangeInput}
                                   error={errors.passwordConfirm}
                            />
                            <div className="form-group mt-2">
                                <button className="btn btn-success" type='submit'>S'inscrire</button>
                            </div>
                        </form>
                        <p>Vous avez déjà un compte? <Link to="/login">Se connecter</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RegisterPage;