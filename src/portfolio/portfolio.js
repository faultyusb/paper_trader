import React from 'react';
import { Redirect } from 'react-router-dom';

import Stock from './Stock';

import './portfolio.css';


export default class portfolio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: false,
            stocks: []
        };
    }

    componentDidMount(){
        fetch('/updateStocks', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
                .then(data=>{
                    if (data.errorMessage){
                        this.setState({ error: true });
                    }
                    else{
                        this.setState({ stocks: data.stocks });
                    }
                    });

    }


    render(){
        if (this.state.error){
            return <Redirect to="/SignIn"/>
        }
        if (this.state.stocks.length === 0){
            return <Stock missing={true} />;
        }
        
        let total_investment = 0;
        let current_value = 0;
        const stock_array = this.state.stocks;
        for (let i = 0; i < stock_array.length; i++){
            total_investment += stock_array[i].price * stock_array[i].shares;
            current_value += stock_array[i].asset_value * stock_array[i].shares;
        }

        return (
            <div className="portfolio__">
                <h1>Initial Investment: $ {total_investment}</h1>
                <h1>Current Value of Assets: $ {current_value}</h1>
                <h1>Net Profit: $ {total_investment - current_value }</h1>

                {this.state.stocks.map(
                    stock => {
                        return <Stock 
                                    symbol={stock.symbol}
                                    price={stock.price}
                                    volume={stock.volume}
                                    shares={stock.shares}
                                    init_investment = {stock.shares * stock.price}
                                    curr_value = {stock.shares * stock.asset_value}
                                    // date={stock.date}
                                />
                    }
                )}
            </div>
        );
    }
}

