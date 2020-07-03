import React from 'react';

import Table from 'react-bootstrap/Table'
function StockTable(props){
    
    const stock=props.latestStock;
    
    return (
        <div className="stock__table">
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {/* <th>Date</th>     */}
                        <th>Date</th>
                        <th>Open</th>    
                        <th>High</th>    
                        <th>Low</th>    
                        <th>Close</th>    
                        <th>Volume</th>    
                    </tr>
                    </thead>    
                    <tbody>
                        <tr>
                            <td>{stock.date.toString()}</td>
                            <td>{stock.open}</td>
                            <td>{stock.high}</td>
                            <td>{stock.low}</td>
                            <td>{stock.close}</td>
                            <td>{stock.volume}</td>
                        </tr>
                    </tbody>
            </Table>    

        </div>
        
    );


}

export default StockTable;