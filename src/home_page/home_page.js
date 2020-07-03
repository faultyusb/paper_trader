import React from 'react';

import StockInfo from './StockInfo';
import './home_page.css';

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
        this.setState({value: event.target.value});
    }
    

    render(){
        console.log(this.state.search)
        return(
        <div className="home_page">
            <form onSubmit={this.handleSubmit}>
                <label>
                    Search for Stocks
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
            </form>
        <h1>Showing Stock for: {this.state.search}</h1>

            <div className="stock_graph">
                <StockInfo symbol={this.state.search}/>
            </div>
        </div>);
    }
}
