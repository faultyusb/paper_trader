import React from 'react';

import './Navigation.css';
import { Link } from 'react-router-dom';
import Logo from '../images/stock.webp';

function Navigation(){
    return (
        <div className="nav_bar">
            
            <img src={Logo} alt=""/>
            <nav>
                <ul className = "nav__links">
                    <li>
                        <Link to='/home_page'>Home</Link>
                    </li>

                    <li>
                        <Link to='/portfolio'>My Portfolios</Link>
                    </li>

                    <li>
                        <Link to='/authenticate'>Login/Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );

}

export default Navigation;