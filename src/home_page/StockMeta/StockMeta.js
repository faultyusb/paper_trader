import React from 'react';

function StockMeta(props){
    const meta = props.meta_info;
    return (
        <div className="meta__info">
            <h1>{meta.symbol}</h1>
            <br/>
            <h3>{meta.stock_info}</h3>
            <h4>{meta.refreshed}</h4>
            <h4>{meta.time_zone}</h4>
        </div>
    );


}
export default StockMeta;
