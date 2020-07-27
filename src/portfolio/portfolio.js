import React from 'react';
import { Redirect } from 'react-router-dom';

import Stock from './Stock';

import './portfolio.css';


export default class portfolio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notLoggedIn: true,
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
                    // user is logged in
                    if (!data.errorMessage){
                        this.setState({notLoggedIn: false, stocks: data.stocks });
                    }
                    });

    }


    render(){
        if (this.state.notLoggedIn){
            return <Stock isLoggedIn = {this.state.notLoggedIn} />
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
                <div className="header_stats">
                    {/* <h1><span className="meta">Initial Investment:</span> <span className="data">$ {total_investment}</span></h1>
                    <h1><span className="meta">Current Value of Assets:</span> <span className="data">$ {current_value}</span></h1>
                    <h1><span className="meta">Net Profit:</span> <span className="data">$ {total_investment - current_value }</span></h1> */}

                    <ul>
                        <li>
                            <span className="meta">Initial Investment:</span> <span className="data">$ {total_investment}</span>
                        </li>
                        <li>
                            <span className="meta">Current Value of Assets:</span> <span className="data">$ {current_value}</span>
                        </li>
                        <li>
                            <span className="meta">Net Profit:</span> <span className="data">$ {total_investment - current_value }</span>
                        </li>
                    </ul>


                </div>

                <div className="stocks__">
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
            </div>
        );
    }
}

