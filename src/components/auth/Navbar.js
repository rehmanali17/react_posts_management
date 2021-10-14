import React from 'react'
import logo from '../../logo.svg'
import { Link } from 'react-router-dom'

const Navbar = () => {
    console.log("Rendering Auth Navbar Component")
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo"/>
            </div>
            <div className="links">
               <Link to="/register" >Register</Link> 
               <Link to="/" >Login</Link> 
            </div>
        </div>
    )
}

export default React.memo(Navbar)
