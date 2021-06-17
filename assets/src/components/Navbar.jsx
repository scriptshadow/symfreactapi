import React, {useContext} from 'react';
import AuthAPI from "../services/AuthAPI";
import {NavLink} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import {toast} from "react-toastify";

function Navbar({history}) {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

    const handleLogout = () => {
        AuthAPI.logout()
        setIsAuthenticated(false)
        toast.info("Vous êtes desormais déconnecté !")
        history.push("/login")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand">SymfReact !</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink to="/customers" className="nav-link">Clients</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/invoices" className="nav-link">Factures</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            { !isAuthenticated && (<>
                                <li className="nav-item inscription">
                                    <NavLink to="/register" className="btn btn-link text-dark">Inscription</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="btn btn-success mr-1">Connexion</NavLink> &nbsp;
                                </li>
                            </>) || (
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;