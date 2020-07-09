import React from 'react';
import Button from 'react-bootstrap/Button'

import './Purchase.css';

export default class Purchase extends React.Component{
    constructor(props){
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            shares: 0
        };
    }

    onSubmitHandler(event){
        event.preventDefault();
      }

      onChangeHandler(event){
          this.setState({shares: event.target.value})
      }

    render(){
        return (
            <div className="purchase__components">

                <div className="enter__shares">
                    <form onSubmit={ this.onSubmitHandler}>
                        <input type="text" pattern="[0-9]*" placeholder="Enter # of Shares" onChange={this.onChangeHandler}/>
                    </form>
                    </div>
    
                <div className="buttons">
                    <Button variant="primary" size="lg" block>
                    Buy 
                    </Button>
                    <Button variant="secondary" size="lg" block>
                        Sell 
                    </Button>
                </div>
            </div>
        );
    }



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