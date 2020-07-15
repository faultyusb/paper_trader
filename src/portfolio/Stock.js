import React from 'react';

import './Stock.css';
function Stock(props){
    return (
        <div className="stock__card">
            <ul>
                <li>Stock Symbol: {props.symbol}</li>
                <li>Close: $ {props.price}</li>
                <li>Number of Shares: {props.quantity}</li>
                <li>Total Volume: {props.volume}</li>
                <li>Value: $ {props.purchased}</li>
                {/* <li>{props.date}</li> */}
        </ul>

        </div>        
    );
}

export default Stock;