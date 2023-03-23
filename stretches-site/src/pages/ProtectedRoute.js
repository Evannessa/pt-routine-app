import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useGlobalContext } from '../context';


const ProtectedRoute = ({ children, ...rest }) => {
    const { user } = useGlobalContext()
    return (
        <Route
            {...rest}
        >
            {user ? children : <Navigate to='/'></Navigate>}
        </Route>
    );
};

export default ProtectedRoute
