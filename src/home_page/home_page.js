import React from 'react';

import StockInfo from './StockInfo';

import './home_page.css';

function home_page(){
    return (
        <div className="home_page">
            <h1>This is the home page!</h1>
            <div className="stock_graph">
                <StockInfo/>
            </div>
        </div>
    );


}

export default home_page;