import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

import './Purchase.css';
import 'bootstrap/dist/css/bootstrap.css';


export default class Purchase extends React.Component{
    constructor(props){
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            shares: 0,
            buy: true,
            sell: false
        };
    }

    onSubmitHandler(event){
        event.preventDefault();
        console.log(this.state)
      }

      onChangeHandler(event){
        this.setState({ buy: !this.state.buy, sell: !this.state.sell });
        
      }

      render(){
          return (
              <div className="purchase">
                  <Form onSubmit={this.onSubmitHandler}>
                <div className = "inner"id="trans_buttons">
                    <h3>Select an action: </h3>
                    <Form onChange={this.onChangeHandler} >
                        <div className = "inner" id="butts">
                            <Form.Check 
                                custom
                                type="radio"
                                id="buy"
                                label="Buy"
                                name="trans"
                            />
                            <Form.Check 
                                custom
                                type="radio"
                                id="sell"
                                name="trans"
                                label="Sell"
                            />
                        </div>
                    </Form>
                </div>
                <Form onChange={event=>this.setState({shares: event.target.value})}>
                    <Form.Label>Enter Quantity</Form.Label>
                    <Form.Control pattern="^-?[0-9]\d*\.?\d*$" type="text" value={this.state.shares} onChange={e=>this.setState({shares: e.target.value})} placeholder="Enter quantity of stocks"/>
                </Form>
                <div className="select">
                    <h3>{!this.state.buy ? "Add stocks to" : "Sell from"}</h3>
                        <Form.Group>
                            <Form.Control as="select">
                                <option>portf1</option>
                                <option>portf2</option>
                                <option>portf3</option>
                            </Form.Control>
                        </Form.Group>
                </div>
                <div className="sub_btn">
                    <Button type="submit" variant="outline-secondary">Submit Transaction</Button>{' '}
                </div>
                </Form>
            </div>









          );
      }

    // render(){
    //     return (
    //         <div className="purchase__components">

    //             <div className="enter__shares">
    //                 <form onSubmit={ this.onSubmitHandler}>
    //                     <input type="text" pattern="[0-9]*" placeholder="Enter # of Shares" onChange={this.onChangeHandler}/>
    //                 </form>
    //                 </div>
    
    //             <div className="buttons">
    //                 <Button variant="primary" size="lg" block>
    //                 Buy 
    //                 </Button>
    //                 <Button variant="secondary" size="lg" block>
    //                     Sell 
    //                 </Button>
    //             </div>
    //         </div>
    //     );
    // }



};




// function onSubmitHandler(event){
//     event.preventDefault();
//     console.log("yeet");
// }


// function Purchase(props){
//     const [shares, setShares] = useState(0);

//     return (
//         <div className="purchase__container1">
//             <div className="enter__shares">
//                 <form onSubmit={(event) => {setShares(event.target.value)}}>
//                     <input type="text" patter="[0-9]*" placeholder="Enter # of Shares" />
//                 </form>
//                 </div>


//             <div className="buttons">
//                 <Button variant="primary" size="lg" block>
//                     Buy {shares} {(props.amount === 1 ? 'Share' : 'Shares')}
//                 </Button>
//                 <Button variant="secondary" size="lg" block>
//                     Sell {shares} {(props.amount === 1 ? 'Share' : 'Shares')}
//                 </Button>
//             </div>
//         </div>
//     );

// }

// export default Purchase;