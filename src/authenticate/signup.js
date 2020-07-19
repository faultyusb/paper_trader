import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import { Link, Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'

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
            password2: "",
            redirect: false,
            error: {
                errorStatus: false,
                errorMessage: ""
            }
        });
    }

    onSubmitHandler(event){

        fetch('/SignUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(data => {
                if (data.errorMessage){
                    this.setState({ error: {
                        errorStatus: true,
                        errorMessage: data.errorMessage
                    } });
                    console.log(data.errorMessage);
                    console.log(this.state.error);
                }
                else{
                    console.log("Account created!")
                    this.setState({
                        error: {
                            errorStatus: false,
                            errorMessage: ""
                        }
                    });
                }
            })
            .catch(err => console.log(err));
    }

    componentDidMount(){
        fetch('/isLoggedIn', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            if (data.first_name){
                this.setState({ redirect: true });
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        // cannot visit sign up page if already logged in
        if (this.state.redirect){
            return <Redirect to="home_page" />;
        } 
        return (
            <div>
                {this.state.error.errorStatus ? <Alert variant="warning"> {this.state.error.errorMessage} </Alert> : null}
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
            </div>   
         );
    }
}
 
export default SignUp;