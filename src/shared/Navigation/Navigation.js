import React from 'react';

import './Navigation.css';
import { Link, useHistory  } from 'react-router-dom';
import Logo from '../images/stock.webp';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';
import LogOut from './LogOut';


export default class Navigation extends React.Component{
    constructor(props){
        super(props);
        this.state = {first_name: ""};
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
            // body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data => {
            if (data.first_name){
                this.setState({ first_name: data.first_name });
            }
        })
        .catch(err => console.log(err));
    }

    logout(){
        fetch('/logout', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data => console.log("signing out"))
        .catch(err => console.log(err));
        window.location.reload();
    }


    render(){
    // let history = useHistory();
    // let redirect = () => {
    //     history.push("/home_page");
    // }





    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Brand>
                <img
                    alt=""
                    src={Logo}
                    width="90"
                    height="90"
                    className="d-inline-block align-top"
                    // onClick = {redirect}
                />{' '}
                </Navbar.Brand>
                <Navbar.Brand><Link to="/home_page">Paper Trader</Link></Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
                <Nav.Link >
                    <Link to="/portfolio">My Portfolios</Link>
                </Nav.Link>
                <Nav.Link >{this.state.first_name ? `Welcome ${this.state.first_name}` : <Link to="/SignIn">Login/Sign up</Link>} {'  '}
                
                    {/* <Link to="/SignIn">Login/Sign up</Link> */}
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

// function isLoggedIn(){

// }


// function Navigation(){
//     let history = useHistory();
//     let redirect = () => {
//         history.push("/home_page");
//     }


//     return (
//         <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
//             <Navbar.Brand>
//                 <img
//                     alt=""
//                     src={Logo}
//                     width="90"
//                     height="90"
//                     className="d-inline-block align-top"
//                     onClick = {redirect}
//                 />{' '}
//                 </Navbar.Brand>
//                 <Navbar.Brand><Link to="/home_page">Paper Trader</Link></Navbar.Brand>

//             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//             <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="justify-content-end" style={{ width: "100%" }}>
//                 <Nav.Link >
//                     <Link to="/portfolio">My Portfolios</Link>
//                 </Nav.Link>
//                 <Nav.Link >
//                     <Link to="/SignIn">Login/Sign up</Link>
//                 </Nav.Link>
//             </Nav>
//             </Navbar.Collapse>
                
//         </Navbar>
//     );


// }

// export default Navigation;