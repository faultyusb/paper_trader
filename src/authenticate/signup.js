import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './signup.css';


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.state = this.getInitialState();
    }
    getInitialState(){
        return ({
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            password2: ""
        });
    }

    onSubmitHandler(event){
        // if (!this.state.email || !this.state.password || !this.state.password2 || !this.state.first_name || !this.state.last_name){
        //     console.log("please enter all credentials");
        // }
        // else if (this.state.password !== this.state.password2){
        //     console.log("Passwords do not match.");
        // }
        // event.preventDefault();
        // console.log(this.state);

        fetch('/SignUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(data => console.log(data.message))
            .catch(err => console.log(err));


    }

    render() { 
        return (       
            <div className="sign__up">
                <h2>Sign up! It's easy and free.</h2>
                <Form onSubmit = {this.onSubmitHandler}>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(event)=> this.setState({email: event.target.value})}/>
                    </Form.Group>
                
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(event)=> this.setState({password: event.target.value})}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Please Re-enter your password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(event)=> this.setState({password2: event.target.value})}/>
                    </Form.Group>

                    
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control placeholder="John" onChange={(event)=> this.setState({first_name: event.target.value})}/>
                    </Form.Group>

                    <Form.Group as={Col}controlId="formGridAddress2">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder="Appleseed" onChange={(event)=> this.setState({last_name: event.target.value})}/>
                    </Form.Group>

                    <Col xs="auto">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Form>
                <div className="switch">
                    <h3>Already have an account?</h3><Link to="/SignIn">Sign in here.</Link>
                </div>
            </div>
         );
    }
}
 
export default SignUp;