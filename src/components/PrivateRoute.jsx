import React from 'react'
import useAuthStatus from '../hooks/useAuthStatus';
import Spinner from './Spinner';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute(){
    const {loggedIn, checkingStatus} = useAuthStatus();
    if(checkingStatus){
        return<h3><Spinner /></h3>
    }
  return loggedIn ? <Outlet /> : <Navigate to= "/sign-in"/>;

}