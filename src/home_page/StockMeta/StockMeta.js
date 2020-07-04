import React from 'react';

import './StockMeta.css';

function StockMeta(props){
    const meta = props.meta_info;
    return (
        <div className="meta__info">
            <h1><span className="stock__meta__data">Stock Symbol: </span>{meta.symbol}</h1>
            <br/>
            <h3><span className="stock__meta__data">Type: </span>{meta.stock_info.slice(0, 12)}</h3>
            <h4><span className="stock__meta__data">Last refreshed </span>{meta.refreshed}</h4>
            <h4><span className="stock__meta__data">Time Zone: </span>{meta.time_zone}</h4>
        </div>
    );


}
export default StockMeta;
