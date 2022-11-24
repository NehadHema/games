import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';


export default function Navbar(props) {
    let redirectTo = useNavigate()

    function logOut() {

        props.setIsLogin(false);
        redirectTo('/');
        localStorage.removeItem('token');
    
      }
  return (
    <>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-3">
  <div className="container">
    <NavLink className="navbar-brand text-white text-italic me-5" to="#"><img src={logo}  alt="logo"/> Game Over</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {props.isLogin ? <><li className="nav-item">
          <NavLink  className={({ isActive }) =>isActive? "bg-danger nav-link active": "nav-link active"} to={'home'}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) =>isActive? "bg-danger nav-link": "nav-link"} to={'all'}>All</NavLink>
        </li>
    
        <li className="nav-item dropdown">
          <NavLink className={({ isActive }) =>isActive? "bg-danger nav-link dropdown-toggle": "nav-link dropdown-toggle"} to={'platforms'} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Platforms
          </NavLink>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><NavLink className="dropdown-item" to={'pc'}>Pc</NavLink></li>
            <li><NavLink className="dropdown-item" to={'browser'}>Browser</NavLink></li>
          </ul>
        </li>
        
        <li className="nav-item dropdown">
          <NavLink className={({ isActive }) =>isActive? "bg-danger nav-link dropdown-toggle": "nav-link dropdown-toggle"} to={'sortby'} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Sort-by
          </NavLink>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><NavLink className="dropdown-item" to={'releasedate'}>Release-date</NavLink></li>
            <li><NavLink className="dropdown-item" to={'popularity'}>Popularity</NavLink></li>
            <li><NavLink className="dropdown-item" to={'alphabetical'}>Alphabetical</NavLink></li>
            <li><NavLink className="dropdown-item" to={'relevance'}>Relevance</NavLink></li>
          </ul>
        </li>
        
        <li className="nav-item dropdown">
          <NavLink className={({ isActive }) =>isActive? "bg-danger nav-link dropdown-toggle": "nav-link dropdown-toggle"} to={'categories'} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Categories
          </NavLink>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><NavLink className="dropdown-item" to={'racing'}>Racing</NavLink></li>
            <li><NavLink className="dropdown-item" to={'sports'}>Sports</NavLink></li>
            <li><NavLink className="dropdown-item" to={'social'}>Social</NavLink></li>
            <li><NavLink className="dropdown-item" to={'shooter'}>Shooter</NavLink></li>
            <li><NavLink className="dropdown-item" to={'openworld'}>Open-World</NavLink></li>
            <li><NavLink className="dropdown-item" to={'zombie'}>Zombie</NavLink></li>
            <li><NavLink className="dropdown-item" to={'fantasy'}>Fantasy</NavLink></li>
            <li><NavLink className="dropdown-item" to={'actionrpg'}>Action-rpg</NavLink></li>
            <li><NavLink className="dropdown-item" to={'action'}>Action</NavLink></li>
            <li><NavLink className="dropdown-item" to={'flight'}>Flight</NavLink></li>
            <li><NavLink className="dropdown-item" to={'battleroyate'}>Battle-royate</NavLink></li>
          </ul>
        </li>
        </> : ''}
      </ul>
    
        <ul className="navbar-nav ms-auto">
        {!props.isLogin ? <>
        <li className="nav-item">
          <NavLink className="nav-link" to={''}><button className="nav-link join">Login</button></NavLink>
        </li> </>:''}

        {props.isLogin ? <>
        <li className="nav-item">
              <span onClick={logOut} className ="nav-link "><button className="nav-link join">Logout</button></span>
         </li>
         </> : ''}
         {!props.isLogin ? <>
         <li className="nav-item">
         <NavLink className="nav-link" to={'register'}>
          <button className="nav-link join">Join Free</button>
          </NavLink>
          </li> </>:''}         
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
