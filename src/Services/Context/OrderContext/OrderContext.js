import React from "react";
import UserContext from "../UserContext/UserContext";
import UserToken from "../../UserToken/UserToken";

const OrderContext = React.createContext({
    order: [],
    orderItems: [],
    isOrdering: false
})

export default OrderContext;

export class OrderProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            order: [],
            orderItems: [],
            isOrdering: false,
            error: ""
        }
    }

    static contextType = UserContext;

    componentDidMount(){
        console.log("Mounted", this.props)
        
    }


    UNSAFE_componentWillReceiveProps(){

        if(this.props.userContext.isLoggedIn){
            console.log("Mounted", this.context)
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
                        console.log(resData, "hello")
                        this.setState({
                            isOrdering: true
                        })

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
                                console.log(itemsData);
                            })
                            .catch( itemsErr => this.setState({ error: itemsErr.error}));
                    })
                    .catch( err => this.setState({ error: err.error}));

                });
        }
    }

    startOrdering = ()=>{

    }

    render(){
        const value= {
            order: this.state.order,
            orderItems: this.state.orderItems,
            isOrdering: this.state.isOrdering
        };
        console.log(this.props)
        return (
            <OrderContext.Provider value={value}>
                {this.props.children}
            </OrderContext.Provider>
        )
    }
}
