import React from 'react';

import './Navigation.css';
import { Link } from 'react-router-dom';
import Logo from '../images/stock.webp';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';


export default class Navigation extends React.Component{
    constructor(props){
        super(props);
        this.state = {first_name: "", error: true};
    }

    componentDidUpdate(prevState){
        if (prevState.first_name !== this.state.first_name){
            this.render();
        }
    }

    componentDidMount(){
        fetch('/isLoggedIn', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            if (data.first_name){
                this.setState({ error: false, first_name: data.first_name });
            }
        })
        .catch(err => console.log(err));
    }

    logout(){
        fetch('/logout', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {console.log("signing out")})
        .catch(err => console.log(err));
        window.location.reload();
    }


    render(){

    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Brand>
                <img
                    alt=""
                    src={Logo}
                    width="90"
                    height="90"
                    className="d-inline-block align-top"
                />{' '}
                </Navbar.Brand>
                <Navbar.Brand><Link to="/home_page">Paper Trader</Link></Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
                <Nav.Link >{this.state.first_name ? `Welcome, ${this.state.first_name}.` : <Link to="/SignIn">Login/Sign up</Link>} {'  '} </Nav.Link>
                <Nav.Link >
                    {this.state.error ? <Link to="/SignIn">My Portfolios</Link>: <Link to="/portfolio">My Portfolios</Link>}
                </Nav.Link>
                
                <Nav.Link onClick={this.logout}>
                    {this.state.first_name ? "Logout" : null}
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
                
        </Navbar>
    );
    }
};
