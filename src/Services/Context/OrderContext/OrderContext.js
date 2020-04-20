import React from "react";
import MenuContext from "../MenuContext/MenuContext";
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
    setOrderType: ()=>{},
    setOrderItem: ()=>{},
    refreshItem: ()=>{},
    removeItem: ()=>{},
    completeOrder: ()=>{}
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

    static contextType = MenuContext;

    componentDidMount(){

    }

    UNSAFE_componentWillReceiveProps(){
        
        if(this.props.userContext.isLoggedIn){

            UserToken.getToken()
                .then( token => {

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
                        console.log(resData);
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
                                'authorization': `bearer ${token}`
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
                    .catch( err => this.setState({ error: err.error, isOrdering: false}));
                });
        };
    }

    setOrderType = (order) => {
        let userOrder = order;

        userOrder.userId = this.props.userContext.user.id;

        console.log();
        
        UserToken.getToken()
            .then( token => {

                if(this.state.isOrdering){



                    fetch(`https://localhost:5001/api/orders/${this.state.order.id}`, {
                        method: "PATCH",
                        headers: {
                            'content-type': "application/json",
                            'authorization': `bearer ${token}`
                        },
                        body: JSON.stringify(userOrder)
                    })
                        .then( patchRes => {

                            if(!patchRes){

                                return patchRes.json().then( e => Promise.reject(e));
                            };

                            return patchRes.json();
                        })
                        .then( patchData => {
                            console.log(patchData);
                        })
                        .catch( patchErr => this.setState({ error: patchErr.error}));

                } else{
                    console.log("POSTING");
                    fetch("https://localhost:5001/api/orders", {
                        method: "POST",
                        headers: {
                            'content-type': "application/json",
                            'authorization': `bearer ${token}`
                        },
                        body: JSON.stringify(userOrder)
                    })
                        .then( postRes => {

                            if(!postRes){

                                return postRes.json().then( e => Promise.reject(e));
                            };

                            return postRes.json();
                        })
                        .then( postData => {
                            console.log(postData);
                        })
                        .catch( postErr => this.setState({ error: postErr}));
                }
            })

        this.setState({
            orderType: order.orderType,
            time: order.time,
            address: order.address,
            mobileNumber: order.mobileNumber
        });
    }

    setOrderItem = async (method, size, quantity, orderItem)=>{
        let item = orderItem;
        let order = orderItem;
        let id = item.id;

        item.quantity = quantity;

        item.orderId =this.state.order.id;

        delete item.id;

        if(size === "priceReg"){
            item.priceSmall = 0;
        } else if( size === "priceSmall"){
            item.priceReg = 0;
        };

        console.log(order)
        this.props.menuContext.refreshItems();

        return UserToken.getToken()
            .then( token => {

                if(method === "POST"){
                    console.log("POSTING")
                    return fetch("https://localhost:5001/api/orderitems", {
                        method,
                        headers: {
                            'content-type': "application/json",
                            'authorization': `bearer ${token}`
                        },
                        body: JSON.stringify(item)
                    })
                        .then( res => {

                            if(!res.ok){

                                return res.json().then( e => Promise.reject(e));
                            };
                            
                            return res.json();
                        })

                } else if( method === "PATCH"){

                    order.id = id;
                    console.log("PATCHING")
                    return fetch(`https://localhost:5001/api/orderitems/${order.id}`, {
                        method,
                        headers: {
                            'content-type': "application/json",
                            'authorization': `bearer ${token}`
                        },
                        body: JSON.stringify(item)
                    })
                        .then( res => {

                            if(!res.ok){

                                return res.json().then( e => Promise.reject(e));
                            };

                            return res.json();
                        });
                };
            })

    }

    removeItem = async (id)=>{
        UserToken.getToken()
            .then( token => {
                return fetch(`https://localhost:5001/api/orderitems/${id}`, {
                        method: "DELETE",
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
            })
    }

    completeOrder = async (order)=>{
        console.log(order);

        UserToken.getToken()
            .then( token => {

                return fetch(`https://localhost:5001/api/orders/${order.id}`, {
                    method: "PATCH",
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${token}`
                    },
                    body: JSON.stringify({
                        orderComplete: true
                    })
                })
                    .then( res => {

                        if(!res.ok){
                            return res.json().then( e => Promise.reject(e));
                        };
                        
                        this.props.menuContext.refreshItems();

                        return res.json();
                    });
            });
    };

    refreshItem = async ()=>{
        this.props.menuContext.refreshItems();

        return true;
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
            setOrderType: this.setOrderType,
            setOrderItem: this.setOrderItem,
            refreshItem: this.refreshItem,
            removeItem: this.removeItem,
            completeOrder: this.completeOrder
        };

        console.log(this.state);

        return (
            <OrderContext.Provider value={value}>
                {this.props.children}
            </OrderContext.Provider>
        )
    }
}
