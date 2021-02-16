import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo left"><span className="logo">Udayy</span></Link>
        <ul className="right">
          <li><NavLink to="/">A/B Test</NavLink></li>
          <li> <NavLink to="/add-country" >Add Country</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;