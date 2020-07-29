import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import './Purchase.css';
import 'bootstrap/dist/css/bootstrap.css';


export default class Purchase extends React.Component{
    constructor(props){
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        this.onSellHandler = this.onSellHandler.bind(this);
        this.onBuyHandler = this.onBuyHandler.bind(this);



        this.state = {
            symbol: this.props.symbol,
            volume: this.props.price.volume,
            shares: 0,
            price: this.props.price.close,
            buy: '',
            sell: '',
            error: {
                errorStatus: false,
                errorMessage: ""
            },
            success: {
                successStatus: false,
                successMessage: ""
            },
            total_shares: 0
        };
    }

    componentDidUpdate(prevProps){
        if (prevProps.price.close !== this.state.price){
            this.setState({ price: this.props.price.close, volume: this.props.price.volume, symbol: this.props.symbol});
            fetch('/ownedShares', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ total_shares: data.total_shares });
                })
                .catch(err => console.log(err));
        }
    }

 
    onSubmitHandler(event){
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
                    this.setState({ error: {errorStatus: true, errorMessage: data.errorMessage}, success: {successStatus: false, successMessage: ""} });
                }
                else if (data.successMessage){
                    this.setState({ success: {successStatus: true, successMessage: data.successMessage}, error: {errorStatus: false, errorMessage: ""} });
                }
            })
            .catch(err => console.log(err));

            if (this.state.buy){
                const tot_shares = parseInt(this.state.total_shares) + parseInt(this.state.shares);
                this.setState({ total_shares: tot_shares });
            }
            else{ 
                let tot_shares = parseInt(this.state.total_shares) - parseInt(this.state.shares);
                tot_shares = (tot_shares >= 0 ? tot_shares: this.state.total_shares);
                this.setState({ total_shares: tot_shares });
            }
            this.setState({ shares: 0 });
    }

    onSellHandler(){
        console.log("we selling?");
        this.setState({ sell: true, buy: false });
    }

    onBuyHandler(){
        this.setState({ buy: true, sell: false });
    }



      render(){
          return (
              <div className="purchase">
                <div className="alerts">
                    {this.state.error.errorStatus ? <Alert variant="warning"> {this.state.error.errorMessage} </Alert> : null}
                    {this.state.success.successStatus ? <Alert variant="primary"> {this.state.success.successMessage} </Alert> : null}
                </div>
                <Form onSubmit={this.onSubmitHandler}>
                    <div className = "inner"id="trans_buttons">
                        <h3>Select an action</h3>

                        <ButtonGroup toggle className="radio_btn">
                            <ToggleButton
                                type="checkbox"
                                variant="primary"
                                checked={this.state.buy}
                                value="1"
                                onChange = {this.onBuyHandler}
                            >
                                Buy
                            </ToggleButton>

                            <ToggleButton
                            type="checkbox"
                            variant="primary"
                            checked={this.state.sell}
                            value="1"
                            onChange = {this.onSellHandler}
                            >
                                Sell
                            </ToggleButton>

                        </ButtonGroup>



                        {/* <Form className="yeet">
                            <div className = "radio_btn">
                                <Form.Check 
                                    custom
                                    type="radio"
                                    id="buy"
                                    label="Buy"
                                    name="trans"
                                    onChange = {this.onBuyHandler}
                                />
                                <Form.Check 
                                    custom
                                    type="radio"
                                    id="sell"
                                    name="trans"
                                    label="Sell"
                                    onChange = {this.onSellHandler}
                                />
                            </div>
                        </Form> */}
                    </div>
                    <Form onChange={event=> this.setState({shares: event.target.value})}>
                        <Form.Label>Enter Quantity</Form.Label>
                        <Form.Control pattern="^-?[0-9]\d*\.?\d*$" type="text" value={this.state.shares} onChange={e=>this.setState({shares: e.target.value})} placeholder="Enter quantity of stocks"/>
                    </Form>
                    
                    <Form.Label>Total Value (US $)</Form.Label>
                    <Form.Control type="number" placeholder={this.state.price * parseFloat(this.state.shares)} readOnly />

                    <Form.Label>Shares Owned</Form.Label>
                    <Form.Control type="number" placeholder={this.state.total_shares} readOnly />

                    <div className="sub_btn">
                        <Button type="submit" variant="outline-secondary">Submit Transaction</Button>{' '}
                    </div>
                </Form>
            </div>

          );
      }
};


