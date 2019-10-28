import React from 'react'
import { useSelector } from 'react-redux'
import { AuthNav, GuestNav } from './Navigation'

export default () => {
    const isLoggedIn = useSelector(state => state.auth.loggedIn)
    // return isLoggedIn ? <AuthNav /> : <GuestNav />
    return <AuthNav />
}
