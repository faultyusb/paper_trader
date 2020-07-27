import React from 'react';
import { Link } from 'react-router-dom';

import './Stock.css';
function Stock(props){

    const {isLoggedIn, missing, symbol, price, shares, volume, init_investment, curr_value} = props;

    if (isLoggedIn){
        return (
            <div className="stock__card">
                <ul>
                    <li>You must be logged in to view your portfolio.

                        <Link to="/SignIn"> Click here to log in. </Link>
                    </li>
                </ul>
            </div>
        );
    }


    if (missing){
        return (
            <div className="stock__card">
                <ul>
                    <li>You have no stocks in your portfolio. Go to the main page to buy stocks.</li>
                </ul>
            </div>
        );
    }

    return (
        <div className="stock__card">
            <ul>
                <li>Stock Symbol: {symbol}</li>
                <li>Close: $ {price}</li>
                <li>Number of Shares: {shares}</li>
                <li>Total Volume: {volume}</li>
                <li>Invested: $ {init_investment}</li>
                <li>Current Value of Stock: $ {curr_value}</li>
                {/* <li>{props.date}</li> */}
        </ul>

        </div>        
    );
}

export default Stock;