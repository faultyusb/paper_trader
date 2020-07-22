import React from 'react';

import './Stock.css';
function Stock(props){
    return (
        <div className="stock__card">
            <ul>
                <li>Stock Symbol: {props.symbol}</li>
                <li>Close: $ {props.price}</li>
                <li>Number of Shares: {props.shares}</li>
                <li>Total Volume: {props.volume}</li>
                <li>Invested: $ {props.init_investment}</li>
                {/* <li>{props.date}</li> */}
        </ul>

        </div>        
    );
}

export default Stock;