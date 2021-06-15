import React from 'react'
import ReactDOM from 'react-dom'
import "bootswatch/dist/materia/bootstrap.min.css"
import {HashRouter, Switch, BrowserRouter as Router, Route} from "react-router-dom";


import './styles/app.css';
import './bootstrap';

import Navbar from "./src/components/Navbar";
import HomePage from "./src/pages/HomePage";
import CustomersPage from "./src/pages/CustomersPage";
import CustomersWithPaginationPage from "./src/pages/CustomersWithPaginationPage";
import InvoicesPage from "./src/pages/InvoicesPage";

const App = () => {
    return (
        <HashRouter>
            <Navbar />
            <main className="container pt-5">
                <Switch>
                    <Route excat path="/invoices" component={InvoicesPage}/>
                    <Route excat path="/customers" component={CustomersPage}/>
                    <Route excat path="/" component={HomePage}/>
                </Switch>
            </main>
        </HashRouter>
    )
}
const rootElement = document.getElementById('app')
ReactDOM.render(<App />, rootElement)