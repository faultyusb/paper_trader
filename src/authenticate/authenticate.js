import React from 'react';

import './authenticate.css';

export default class Authenticate extends React.Component{
    constructor(props){
        super(props);
        // this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.state = {email: "", password: ""};

    }

    onSubmitHandler(event){
        event.preventDefault();
        console.log(this.state);
    }
  


    render(){
        return (
            <div className="auth__container">
                <form onSubmit = {this.onSubmitHandler}>
                    <h3>Enter your email</h3>
                    <input type="text" onChange={(event)=> this.setState({email: event.target.value})}/>
                    <h3>Enter your password</h3>
                    <input type="text" onChange={(event)=> this.setState({password: event.target.value})}/>
                </form>
                <p className="signup__text">Don't have an account? Sign up here.</p>
            </div>
        );
    }


}


