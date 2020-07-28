import React from 'react';
import { Link } from 'react-router-dom';

import './Stock.css';
function Stock(props){

    const {isLoggedIn, missing, symbol, price, shares, volume, init_investment, curr_value, date} = props;

    if (isLoggedIn){
        return (
            <div className="not_logged">
                <ul>
                    <li>You must be logged in to view your portfolio.</li>
                    <li><Link to="/SignIn"> Click here to log in. </Link></li>
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
                <li><span className="meta" >Stock Symbol:</span> <span className="data" >{symbol}</span></li>
                <li><span className="meta" >Close:</span> <span className="data" >$ {price}</span></li>
                <li><span className="meta" >Number of Shares:</span> <span className="data" >{shares}</span></li>
                <li><span className="meta" >Total Volume:</span> <span className="data" >{volume}</span></li>
                <li><span className="meta" >Invested:</span> <span className="data" >$ {init_investment}</span></li>
                <li><span className="meta" >Current Value of Stock:</span> <span className="data" >$ {curr_value}</span></li>
                <li><span className="meta" >Date:</span> <span className="data" > {date}</span></li>
        </ul>

        </div>        
    );
}

export default Stock;