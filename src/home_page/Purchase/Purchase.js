import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import './Purchase.css';
import 'bootstrap/dist/css/bootstrap.css';


export default class Purchase extends React.Component{
    constructor(props){
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            symbol: this.props.symbol,
            volume: this.props.price.volume,
            shares: 0,
            price: this.props.price.close,
            buy: false,
            sell: true,
            error: {
                errorStatus: false,
                errorMessage: ""
            }
        };
    }

    componentDidUpdate(prevProps){
        if (prevProps.price.close !== this.state.price){
            this.setState({ price: this.props.price.close, volume: this.props.price.volume, symbol: this.props.symbol});
        }
    }

    onSubmitHandler(event){
        event.preventDefault();
        console.log(this.state);
        fetch('/stocktrans', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
            })
            .then(response => response.json())
            .then(data => {
                if (data.errorMessage){
                    this.setState({ error: {errorStatus: true, errorMessage: data.errorMessage} });
                }
            })
            .catch(err => console.log(err));
    }

    onChangeHandler(event){
    this.setState({ buy: this.state.sell, sell: this.state.buy  });
    console.log(this.state);

    }

      render(){
          //console.log(this.state, "before")
          return (
              <div className="purchase">
                  {this.state.error.errorStatus ? <Alert variant="warning"> {this.state.error.errorMessage} </Alert> : null}
                  <Form onSubmit={this.onSubmitHandler}>
                <div className = "inner"id="trans_buttons">
                    <h3>Select an action: </h3>
                    <Form onChange={this.onChangeHandler} >
                        <div className = "inner" id="butts">
                            <Form.Check 
                                custom
                                type="radio"
                                id="buy"
                                label="Buy"
                                name="trans"
                                // checked={true}
                            />
                            <Form.Check 
                                custom
                                type="radio"
                                id="sell"
                                name="trans"
                                label="Sell"
                            />
                        </div>
                    </Form>
                </div>
                <Form onChange={event=>(this.state.volume >= event.target.value) ? this.setState({shares: event.target.value}): this.setState({ shares: 0 })}>
                    <Form.Label>Enter Quantity</Form.Label>
                    <Form.Control pattern="^-?[0-9]\d*\.?\d*$" type="text" value={this.state.shares} onChange={e=>this.setState({shares: e.target.value})} placeholder="Enter quantity of stocks"/>
                </Form>
                {/* <div className="select">
                    <h3>{!this.state.buy ? "Add stocks to" : "Sell from"}</h3>
                        <Form.Group>
                            <Form.Control as="select">
                                <option>portf1</option>
                                <option>portf2</option>
                                <option>portf3</option>
                            </Form.Control>
                        </Form.Group>
                </div> */}
                <Form.Label>Total Value (US $)</Form.Label>
                <Form.Control type="number" placeholder={this.state.price * this.state.shares} readOnly />

                <div className="sub_btn">
                    <Button type="submit" variant="outline-secondary">Submit Transaction</Button>{' '}
                </div>
                </Form>
            </div>

          );
      }
};


