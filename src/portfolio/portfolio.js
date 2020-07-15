import React from 'react';
import Button from 'react-bootstrap/Button';

import Stock from './Stock';

import './portfolio.css';


export default class portfolio extends React.Component{
    constructor(props){
        super(props);
        this.addStock = this.addStock.bind(this);
        this.state = {
            stockAmount: 5,
            stocks: [
                {
                    symbol: "FB",
                    price: 10,
                    volume: 100,
                    quantity: 500,
                    purchased_value: 5000,
                    date: new Date()
                },
                {
                    symbol: "AMZN",
                    price: 100,
                    volume: 10,
                    quantity: 200,
                    purchased_value: 8000,
                    date: new Date()
                },
                {
                    symbol: "AAPL",
                    price: 50,
                    volume: 10,
                    quantity: 72,
                    purchased_value: 10000,
                    date: new Date()
                }
            ]
        };
    }

    addStock(){
        const temp = this.state.stocks;
        temp.push({
            symbol: "AAPL",
            price: 50,
            volume: 10,
            quantity: 72,
            purchased_value: 10000,
            date: new Date()
        });
        this.setState({ stocks: temp })
    }

    render(){
        let total_val = 0;
        for (let i = 0; i < this.state.stocks.length; i++){
            total_val += this.state.stocks[i].purchased_value;
        }

        return (
            <div className="portfolio__">
                <h1>Total Value of Assets: $ {total_val}.00</h1>

                {this.state.stocks.map(
                    stock => {
                        return <Stock 
                                    symbol={stock.symbol}
                                    price={stock.price}
                                    volume={stock.volume}
                                    quantity={stock.quantity}
                                    purchased = {stock.purchased_value}
                                    // date={stock.date}
                                />
                    }
                )}
                <Button variant="secondary" size="lg" block onClick={this.addStock}>
                    Block level button
                </Button>
            </div>
        );
    }
}

