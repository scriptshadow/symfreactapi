import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import "bootswatch/dist/litera/bootstrap.min.css"
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
import CustomerPage from "./src/pages/CustomerPage";
import InvoicePage from "./src/pages/InvoicePage";
import RegisterPage from "./src/pages/RegisterPage";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
                        <Route excat path="/register" component={RegisterPage}/>
                        <Route excat path="/login" component={LoginPage}/>
                        <PrivateRoute path="/invoices/:id" component={InvoicePage}/>
                        <PrivateRoute path="/invoices" component={InvoicesPage}/>
                        <PrivateRoute path="/customers/:id" component={CustomerPage}/>
                        <PrivateRoute path="/customers" component={CustomersPage}/>
                        <Route excat path="/" component={HomePage}/>
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
        </AuthContext.Provider>
    )
}
const rootElement = document.getElementById('app')
ReactDOM.render(<App />, rootElement)