import React from 'react';
import StockGraph from './StockGraph.js';

export default class StockInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {stocks: [
      {
        date: new Date("2020-07-08"),
        open: 0,
        high: 0,
        low: 0,
        close: 0,
        volume: 0
      },
      {
        date: new Date("2020-07-07"), 
        open: 0,
        high: 0,
        low: 0,
        close: 0,
        volume: 0
      },
    ]};
  }

  componentDidMount(){
    this.fetchStocks();
  }

  fetchStocks(){
    const symbol = 'AMZN';
    const API_KEY = 'TNPG40VN9O3OQ4PW';
    const OUTPT_SIZE_FULL = 0 ? 'full' :'compact';
    const API = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=${OUTPT_SIZE_FULL}&apikey=${API_KEY}`;

    fetch(API)
    .then(response=>response.json())
      .then(data=>{
        for (var key in data['Time Series (Daily)']){
          let count = 0;
          let temp = {};
          temp['date'] = new Date(key);
          temp['open'] = parseInt(data['Time Series (Daily)'][key]['1. open']);
          temp['high'] = parseInt(data['Time Series (Daily)'][key]['2. high']);
          temp['low'] = parseInt(data['Time Series (Daily)'][key]['3. low']);
          temp['close'] = parseInt(data['Time Series (Daily)'][key]['4. close']);
          temp['volume'] = parseInt(data['Time Series (Daily)'][key]['5. volume']);

          let joined = this.state.stocks.concat(temp);
          this.setState({stocks: joined});
        }
      })
        .then(()=>{
          this.setState({stocks: this.state.stocks.reverse()});
          console.log(this.state.stocks); 
        }); 

  }


  render(){
    return (
      <StockGraph data = {this.state.stocks}/>
    );
  }

}


