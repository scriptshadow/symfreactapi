import React, {useContext, ActivityIndicator} from 'react'
import AuthContext from "../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";

const Loader = ({path, component}) => {
    const {isAuthenticated} = useContext(AuthContext)
    return isAuthenticated
        ? <Route excat path={path} component={component}/>
        : <Redirect to='/login'/>
}

export default Loader