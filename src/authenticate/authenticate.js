import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
// import SignUp from './signup';
import { Link, Redirect } from 'react-router-dom';


import './authenticate.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class Authenticate extends React.Component{
    constructor(props){
        super(props);
        // this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.state = {
            email: "",
            password: "", 
            redirect: false, 
            error: {
                errorStatus: false,
                errorMessage: ""
            }
        };

    }

    onSubmitHandler(event){
        event.preventDefault();
        fetch('/SignIn', {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data => {
            if (data.errorMessage){
                this.setState({ error: {errorStatus: true, errorMessage: data.errorMessage}})
            }
            else{
                this.setState({ redirect: true });
                window.location.reload();
            }
        })     
    }

    componentDidMount(){
        fetch('/isLoggedIn', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.first_name){
                this.setState({ redirect: true });
            }
        })
        .catch(err => console.log(err));
    }
  
    render(){
        // cannot visit sign in page if already signed in
        if (this.state.redirect){
            return <Redirect to='/home_page'/>;
        }
        
        return (
            <div>
                {this.state.error.errorStatus ? <Alert variant='danger'>{this.state.error.errorMessage}</Alert> : null}
                <div className="auth__container">
                    <h2>Sign in!</h2>
                    <Form onSubmit = {this.onSubmitHandler}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(event)=> this.setState({email: event.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(event)=> this.setState({password: event.target.value})}/>
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <div className="switch">
                        <h3>Don't have an account?</h3><Link to='/SignUp'>Sign up here.</Link>
                    </div>

                </div>
            </div>
        );
    }
}


