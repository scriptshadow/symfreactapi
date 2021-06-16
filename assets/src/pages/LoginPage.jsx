import React, {useContext, useState} from 'react';
import AuthAPI from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";

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
            history.replace("/customers")
        } catch (error) {
            setError("Les informations ne correspondent pas.")
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h1 className="text-center">Authentification</h1>
                        <form onSubmit={handleSubmit}>
                            <div className={"form-group" + (error && " has-danger")}>
                                <label className="form-label mt-4" htmlFor="username">Adresse email</label>
                                <input type="email"
                                       placeholder="Adresse email de connexion"
                                       id="username"
                                       name="username"
                                       className={"form-control" + (error && " is-invalid")}
                                       value={username}
                                       onChange={handleChangeInput}
                                />
                                {error && <p className="invalid-feedback">{error}</p>}
                            </div>
                            <div className="form-group">
                                <label className="form-label mt-4" htmlFor="password">Mot de passe</label>
                                <input type="password"
                                       placeholder="Mot de passe de connexion"
                                       id="password"
                                       name="password"
                                       className="form-control"
                                       value={password}
                                       onChange={handleChangeInput}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <button className="btn btn-success" type='submit'>S'identifier</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginPage;