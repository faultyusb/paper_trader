import React from 'react';

import './Navigation.css';
import { Link } from 'react-router-dom';
import Logo from '../images/stock.webp';

function Navigation(){
    return (
        <div className="nav_bar">
            
            <img src={Logo} alt=""/>

            <ul>
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
        </div>
    );

}

export default Navigation;