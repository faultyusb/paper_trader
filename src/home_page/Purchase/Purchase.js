import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

import './Purchase.css';
import 'bootstrap/dist/css/bootstrap.css';


export default class Purchase extends React.Component{
    constructor(props){
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            volume: this.props.price.volume,
            shares: 0,
            price: this.props.price.close,
            buy: true,
            sell: false
        };
    }

    componentDidUpdate(prevProps){
        if (prevProps.price.close !== this.state.price){
            this.setState({ price: this.props.price.close, volume: this.props.price.volume});
        }
    }

    onSubmitHandler(event){
        event.preventDefault();
      }

      onChangeHandler(event){
        this.setState({ buy: !this.state.buy, sell: !this.state.sell });
      }

      render(){
          //console.log(this.state, "before")
          return (
              <div className="purchase">
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
                <div className="select">
                    <h3>{!this.state.buy ? "Add stocks to" : "Sell from"}</h3>
                        <Form.Group>
                            <Form.Control as="select">
                                <option>portf1</option>
                                <option>portf2</option>
                                <option>portf3</option>
                            </Form.Control>
                        </Form.Group>
                </div>
                <Form.Label>Total Value</Form.Label>
                <Form.Control type="number" placeholder={this.state.price * this.state.shares} readOnly />

                <div className="sub_btn">
                    <Button type="submit" variant="outline-secondary">Submit Transaction</Button>{' '}
                </div>
                </Form>
            </div>

          );
      }
};


