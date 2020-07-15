import React from 'react';

import Stock from './Stock';

import './portfolio.css';


export default class portfolio extends React.Component{
    constructor(props){
        super(props);
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

    render(){
        return (
            <div>
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
            </div>
        );
    }
}

