import React from "react";

const OrderContext = React.createContext({
    order: false
})

export default OrderContext;

export class OrderProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            order: false
        }
    }



    render(){
        const value= {
            order: this.state.order
        };
        
        return (
            <OrderContext.Provider value={value}>
                {this.props.children}
            </OrderContext.Provider>
        )
    }
}
