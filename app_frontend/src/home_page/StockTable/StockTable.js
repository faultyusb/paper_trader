import React from 'react';
import Table from 'react-bootstrap/Table'

import './StockTable.css';
import 'bootstrap/dist/css/bootstrap.css';

function StockTable(props){
    
    const stock=props.latestStock;
    
    return (
        <div className="stock__table">
            <div class="table-responsive">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <td>{stock.date.toString().slice(0, 15)}</td>
                        </tr>

                        <tr>
                            <th>Open</th>
                            <td>{stock.open}</td>
                        </tr>

                        <tr>
                            <th>High</th>
                            <td>{stock.high}</td>
                        </tr>

                        <tr>
                            <th>Low</th>
                            <td>{stock.low}</td>
                        </tr>

                        <tr>
                            <th>Close</th>
                            <td>{stock.close}</td>
                        </tr>

                        <tr>
                            <th>Volume</th>
                            <td>{stock.volume}</td>
                        </tr>
                    </thead>   

                </Table>    
            </div>
        </div>
        
    );


}

export default StockTable;