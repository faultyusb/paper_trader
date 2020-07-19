import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
// import SignUp from './signup';
import { Link } from 'react-router-dom';


import './authenticate.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class Authenticate extends React.Component{
    constructor(props){
        super(props);
        // this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.state = {email: "", password: "", error: false};

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
                console.log("wrong pass/email");
                this.setState({ error: true })
            }
            else{

            console.log("Signing In...");
            console.log(data);
            window.location.reload();
            }
        })
        // .catch(err => {
        //     // window.location.reload();
        //     console.log(err, "whats going on")
        // });
        
    }
  


    render(){
        const signin = (
            <div>
                {this.state.error ? <Alert variant='danger'>Wrong email/password</Alert> : null}
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
        
        return signin;
    }


}


