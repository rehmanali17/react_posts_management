import React from 'react'
import logo from '../../logo.svg'
import { Link } from 'react-router-dom'

const Navbar = ({user}) => {
    console.log('Rendering Dashboard Navbar Component')
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo"/>
            </div>
            <div className="links">
                <Link to="/" >Logout</Link>
                <Link to="/user" >{user}</Link>
            </div>
        </div>
    )
}

export default React.memo(Navbar)


