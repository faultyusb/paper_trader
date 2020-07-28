import React from 'react';
import Button from 'react-bootstrap/Button';
import Stock from './Stock';

import './portfolio.css';


export default class portfolio extends React.Component{
    constructor(props){
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.state = {
            notLoggedIn: true,
            stocks: [],
            wallet : 0,
            stocksSold: 0
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
                        this.setState(
                            {notLoggedIn: false,
                            stocks: data.stocks,
                            wallet: data.wallet,
                            stocksSold: data.stocksSold
                        
                        });
                    }
                    });

    }

    onSubmitHandler(){
        this.setState({
            stocks: [],
            wallet: 0,
            stocksSold: 0
        });

        fetch('/resetPort')
            .then(response => response.json())
                .then(data => {
                    if (data.errorMessage){
                        console.log(data.errorMessage);
                    }
                });
        
    }


    render(){
        if (this.state.notLoggedIn){
            return <Stock isLoggedIn = {this.state.notLoggedIn} />
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
                    <ul>
                        <li>
                            <span className="meta">Initial Investment:</span> <span className="data">$ {total_investment.toFixed(2)}</span>
                        </li>
                        <li>
                            <span className="meta">Current Value of Assets:</span> <span className="data">$ {current_value.toFixed(2)}</span>
                        </li>

                        <li>
                            <span className="meta">Value of Sold Stocks: </span> <span className="data">$ {this.state.stocksSold.toFixed(2)}</span>
                        </li>

                        <li>
                            <span className="meta">Wallet Value: </span> <span className="data">$ {this.state.wallet.toFixed(2)}</span>
                        </li>

                    </ul>
                    <div className="reset_btn">
                        <Button type="submit" variant="outline-secondary" onClick={this.onSubmitHandler}>Reset Portfolio</Button>{' '}
                    </div>

                </div>

                <div className="stocks__">
                    {
                    (this.state.stocks.length !== 0) ?
                    this.state.stocks.map(
                        stock => {
                            return (<Stock 
                                        symbol={stock.symbol}
                                        price={stock.price}
                                        volume={stock.volume}
                                        shares={stock.shares}
                                        init_investment = {stock.shares * stock.price}
                                        curr_value = {stock.shares * stock.asset_value}
                                        date={stock.date.toString()}
                                    />);
                        }
                        
                    )
                    : <Stock missing={true} />
                }
                </div>
            </div>
        );
    }
}

