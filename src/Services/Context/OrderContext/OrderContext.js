import React from "react";
import UserContext from "../UserContext/UserContext";
import UserToken from "../../UserToken/UserToken";

const OrderContext = React.createContext({
    order: {},
    orderItems: [],
    isOrdering: false,
    time: "",
    address: "",
    mobileNumber: "",
    orderType: "",
    orderComplete: false,
    setOrderType: ()=>{}
})

export default OrderContext;

export class OrderProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            order: {},
            orderItems: [],
            isOrdering: false,
            time: "",
            address: "",
            mobileNumber: "",
            orderType: "",
            orderComplete: false,
            error: ""
        }
    }

    static contextType = UserContext;

    UNSAFE_componentWillReceiveProps(){
        console.log(this.props)
        if(this.props.userContext.isLoggedIn){

            UserToken.getToken()
                .then( token => {
                    console.log("Hello")
                    fetch("https://localhost:5001/api/orders", {
                        headers: {
                            'content-type': "application/json",
                            'authorization': `bearer ${token}`
                        }
                    })
                    .then( res => {

                        if(!res.ok){

                            return res.json().then( e => Promise.reject(e));
                        };

                        return res.json();
                    })
                    .then( resData => {

                        this.setState({
                            order: resData.order,
                            orderType: resData.order.orderType,
                            isOrdering: true,
                            time: resData.order.time,
                            address: resData.order.address,
                            mobileNumber: resData.order.mobileNumber,
                            orderType: resData.order.orderType
                        });

                        fetch(`https://localhost:5001/api/orderitems/order/${resData.order.id}`, {
                            headers: {
                                'content-type': "application/json",
                                'authorization': `'bearer ${token}`
                            }
                        })
                            .then( itemsRes => {

                                if(!itemsRes.ok){

                                    return itemsRes.json().then( e => Promise.reject(e));
                                }

                                return itemsRes.json();
                            })
                            .then( itemsData => {
                                this.setState({ 
                                    orderItems: itemsData.orders
                                });
                            })
                            .catch( itemsErr => this.setState({ error: itemsErr.error}));
                    })
                    .catch( err => this.setState({ error: err.error}));

                });
        }
    }

    setOrderType = (order) => {
        this.setState({
            orderType: order.orderType,
            time: order.time,
            address: order.address,
            mobileNumber: order.mobileNumber
        });
    }

    startOrdering = ()=>{

    }

    render(){
        const value= {
            order: this.state.order,
            orderItems: this.state.orderItems,
            isOrdering: this.state.isOrdering,
            time: this.state.time,
            address: this.state.address,
            mobileNumber: this.state.mobileNumber,
            orderType: this.state.orderType,
            orderComplete: this.state.orderComplete,
            setOrderType: this.setOrderType
        };
        console.log(value)
        return (
            <OrderContext.Provider value={value}>
                {this.props.children}
            </OrderContext.Provider>
        )
    }
}
