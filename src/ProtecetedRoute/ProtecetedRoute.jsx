import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtecetedRoute(props) {

    if(localStorage.getItem('token')){
        return props.children;
    }else{
        <Navigate to={'/'}></Navigate>
    }
    
  return (
    <>

    </>
  )
}
