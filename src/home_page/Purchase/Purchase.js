import React from 'react';
import Button from 'react-bootstrap/Button'

import './Purchase.css';


function Purchase(props){
    return (
        <div className="buttons">
            <Button variant="primary" size="lg" block>
                Buy {props.amount} {props.symbol} {(props.amount != 1 ? 'Shares' : 'Share')}
            </Button>
            <Button variant="secondary" size="lg" block>
            Buy {props.amount} {props.symbol} {(props.amount != 1 ? 'Shares' : 'Share')}
            </Button>
        </div>
    );

}

export default Purchase;