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
        fetch('/portfolios', {
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
        let total_val = 0;
        const stock_array = this.state.stocks;
        for (let i = 0; i < stock_array.length; i++){
            total_val += stock_array[i].price * stock_array[i].shares;
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
                                    shares={stock.shares}
                                    init_investment = {stock.shares * stock.price}
                                    // date={stock.date}
                                />
                    }
                )}
            </div>
        );
    }
}

