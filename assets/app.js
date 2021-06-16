import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import "bootswatch/dist/materia/bootstrap.min.css"
import {HashRouter, Route, Switch, withRouter} from "react-router-dom";


import './styles/app.css';
import './bootstrap';

import Navbar from "./src/components/Navbar";
import HomePage from "./src/pages/HomePage";
import CustomersPage from "./src/pages/CustomersPage";
import InvoicesPage from "./src/pages/InvoicesPage";
import LoginPage from "./src/pages/LoginPage";
import AuthAPI from "./src/services/AuthAPI";
import AuthContext from "./src/contexts/AuthContext";
import PrivateRoute from "./src/components/PrivateRoute";

AuthAPI.setup()

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated())

    const NavbarWithRouter = withRouter(Navbar)

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <HashRouter>
                <NavbarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route excat path="/login" component={LoginPage}/>
                        <PrivateRoute path="/invoices" component={InvoicesPage}/>
                        <PrivateRoute path="/customers" component={CustomersPage}/>
                        <Route excat path="/" component={HomePage}/>
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    )
}
const rootElement = document.getElementById('app')
ReactDOM.render(<App />, rootElement)