import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SignUp from './signup';
import { Link, useHistory  } from 'react-router-dom';


import './authenticate.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class Authenticate extends React.Component{
    constructor(props){
        super(props);
        // this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.state = {email: "", password: ""};

    }

    onSubmitHandler(event){
        
        if (!this.state.email || !this.state.password){
            this.setState({ email: "", password: "" });
            console.log("password or email is not entered")
        }
        else{
            event.preventDefault();
            console.log(this.state);
        }
    }
  


    render(){
        const signin = (
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
                    <h3>Don't have an account?</h3><Link to='/sign_up'>Sign up here.</Link>
                </div>

            </div>
        );
        const signup= (
            
                <SignUp />);
        return signin;
    }


}


