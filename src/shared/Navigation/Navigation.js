import React from 'react';

import './Navigation.css';
import { Link, useHistory  } from 'react-router-dom';
import Logo from '../images/stock.webp';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';





function Navigation(){
    let history = useHistory();
    let redirect = () => {
        history.push("/home_page");
    }


    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Brand>
                <img
                    alt=""
                    src={Logo}
                    width="90"
                    height="90"
                    className="d-inline-block align-top"
                    onClick = {redirect}
                />{' '}
                </Navbar.Brand>
                <Navbar.Brand><Link to="/home_page">Paper Trader</Link></Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
                <Nav.Link >
                    <Link to="/portfolio">My Portfolios</Link>
                </Nav.Link>
                <Nav.Link >
                    <Link to="/SignIn">Login/Sign up</Link>
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
                
        </Navbar>
    );




    // return (
    //     <div className="nav_bar">
            
    //         <img src={Logo} alt="" className = "logo" onClick={redirect}/>
    //         <h1>Stock Simulator!</h1>
    //         <nav>
    //             <ul className = "nav__links">
    //                 <li>
    //                     <Link to='/home_page'>Home</Link>
    //                 </li>

    //                 <li>
    //                     <Link to='/portfolio'>My Portfolios</Link>
    //                 </li>

    //                 <li>
    //                     <Link to='/authenticate'>Login/Sign Up</Link>
    //                 </li>
    //             </ul>
    //         </nav>
    //     </div>
    // );

}

export default Navigation;