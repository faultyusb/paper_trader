import React from 'react';
import StockGraph from '../StockGraph/StockGraph.js';
import StockTable from '../StockTable/StockTable.js';
import StockMeta from '../StockMeta/StockMeta.js';
import Purchase from '../Purchase/Purchase.js';

import './StockInfo.css';

export default class StockInfo extends React.Component{
  constructor(props){
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = 
      {
        width: 0,
        height: 0,
        meta_data: 
        {
          stock_info: "-",
          symbol: "-",
          refreshed: "-",
          time_zone: "-"
        },
      shares: 0,
      stocks: [
      {
        date: new Date(),
        open: 0,
        high: 0,
        low: 0,
        close: 0,
        volume: 0
      },
      {
        date: new Date(), 
        open: 0,
        high: 0,
        low: 0,
        close: 0,
        volume: 0
      },
    ]};
  }

  componentDidMount(){
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.fetchStocks();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidUpdate(prevProps){
    if(this.props.symbol !== prevProps.symbol){
      this.setState({stocks: [
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
      ]})
      this.fetchStocks();
    }
  }

  fetchStocks(){
    const SYMBOL = this.props.symbol;
    const API_KEY = 'TNPG40VN9O3OQ4PW';
    const FUNCTION_TYPE = 'Time Series (Daily)';
    const API = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&outputsize='compact'&apikey=${API_KEY}`;

    fetch(API)
    .then(response=>response.json())
      .then(data=>{
        const meta_data = data["Meta Data"];
        this.setState({
          meta_data: {
            stock_info: meta_data["1. Information"],
            symbol: meta_data["2. Symbol"],
            refreshed: meta_data["3. Last Refreshed"],
            time_zone: meta_data["5. Time Zone"]
          }
        });

        for (var key in data['Time Series (Daily)']){
          let temp = {};
          temp['date'] = new Date(key);
          temp['open'] = parseInt(data[FUNCTION_TYPE][key]['1. open']);
          temp['high'] = parseInt(data[FUNCTION_TYPE][key]['2. high']);
          temp['low'] = parseInt(data[FUNCTION_TYPE][key]['3. low']);
          temp['close'] = parseInt(data[FUNCTION_TYPE][key]['4. close']);
          temp['volume'] = parseInt(data[FUNCTION_TYPE][key]['5. volume']);

          let joined = this.state.stocks.concat(temp);
          this.setState({stocks: joined});
        }
      })
      .catch(err => console.log(err))
        .then(()=>{
          this.setState({stocks: this.state.stocks.reverse()});
        }); 

  }
  onSubmitHandler(event){
    event.preventDefault();
    console.log(event.target.value);
    this.setState({shares: event.target.value})
  }

  render(){
    return (
      <div className="stock__elements">
        <div className="stock__graph">
          <StockGraph width = {this.state.width} data = {this.state.stocks}/>
        </div>

        <div className="all_stock__info">
          <div className="meta_info">
            <div className="stock__meta">
              <StockMeta meta_info={this.state.meta_data}/>
            </div>
            <div className="stock__table2">
              <StockTable latestStock={this.state.stocks[99] || this.state.stocks[0] }/>
            </div>
          </div>

          <div className = "purchase__container">
            <div className="purchase">
              <Purchase amount={this.state.shares} symbol={this.state.meta_data.symbol} price={this.state.stocks[99] || this.state.stocks[0]}/>
            </div>
          </div>
          
        </div>
      </div>
    );
  }

}


