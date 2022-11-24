import React from 'react';
import Navbar from '../Navbar/Navbar';
import {Outlet} from 'react-router-dom';

export default function Layout(props) {
  return (
    <>
        <Navbar isLogin={props.isLogin} setIsLogin={props.setIsLogin}/>
        <Outlet/>
    </>
  )
}
