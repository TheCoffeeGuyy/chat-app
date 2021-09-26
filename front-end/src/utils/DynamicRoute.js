import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAuthState } from '../context/auth'

export default function DynamicRoute(props) {
    const {user}  = useAuthState()
    if (props.authenticated && !user) {
        return <Redirect to="/login"></Redirect>
    } else if (props.guest && user) {
        return <Redirect to="/"></Redirect>
    } else return <Route component={props.component} {...props}></Route>
}