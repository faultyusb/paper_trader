import React from 'react';

import StockInfo from '../StockInfo/StockInfo';
import './home_page.css';

//TODO: need to handle if API fails

export default class home_page extends React.Component{
    constructor(props){
        super(props);
        this.state={search: "FB", value: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        console.log("submitting!", this.state.search);
        this.setState({search: this.state.value});
    }
    handleChange(event){
        this.setState({value: event.target.value.toUpperCase()});
    }
    

    render(){
        return(
        <div className="home_page">
            <div className="stock__search">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Search for Stocks
                        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter Stock Symbol" spellCheck={false}/>
                        {/* <input type="submit" value="Submit"/> */}
                    </label>
                </form>
            </div>
            
    
            <div className="stock_graph">
                <StockInfo symbol={this.state.search}/>
            </div>
            
        </div>);
    }
}
