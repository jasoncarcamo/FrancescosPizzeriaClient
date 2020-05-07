import React from "react";
import {Button, Text, ScrollView, View, TouchableOpacity} from "react-native";
import AppContext from "../../../Services/Context/AppContext/AppContext";

export default class Checkout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderPlaced: false,
            orderCanceled: false
        }
    }

    static contextType = AppContext;

    renderOrderInfo = ()=>{
        return (
            <View
                style={{
                    marginVertical: 20,
                    
                }}>
                <Text style={{
                    textAlign: "center",
                    fontSize: 20
                }}>Order type: {this.context.orderContext.orderType}</Text>

                {this.context.orderContext.orderType == "Delivery" ? <Text style={{
                    textAlign: "center",
                    fontSize: 16
                }}>Delivery address: {this.context.orderContext.address}</Text> : <View></View>}
            </View>
        )
    }

    renderUserInfo = ()=>{
        return (
            
            <View>
                <Text style={{
                    textAlign: "center",
                    marginVertical: 20,
                    fontSize: 16
                }}>Name: {this.context.userContext.user.firstName} {this.context.userContext.user.lastName}</Text>

                <Text style={{
                    textAlign: "center",
                    marginVertical: 20,
                    fontSize: 16
                }}>Mobile number: {this.context.userContext.user.mobileNumber}</Text>
            </View>
        )
    }

    placeOrder = ()=>{
        this.context.orderContext.completeOrder(this.context.orderContext.order)
            .then( data => {
                this.context.orderContext.refreshItem()
                    .then( refreshed => {
                        
                        this.setState({
                            orderPlaced: true
                        });
                        
                        this.context.orderContext.resetOrder();
                    });
            })
            .catch( err => this.setState({ error: err.error}));
    }

    cancelOrder = ()=>{
        this.context.orderContext.cancelOrder(this.context.orderContext.order)
            .then( data => {
                this.context.orderContext.refreshItem()
                    .then( refreshed => {
                        this.context.orderContext.resetOrder();
                        this.props.navigation.navigate("Cart items");
                    });
            })
            .catch( err => this.setState({ error: err.error}));
    }

    renderOptions = ()=>{
        return (
            <View
                style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 25
                }}>
                <TouchableOpacity
                    title="Edit items"
                    onPress={()=> this.props.navigation.navigate("Cart items")}
                    style={{
                        marginVertical: 8,
                        backgroundColor: "skyblue",
                        width: 125,
                        height: 40
                    }}>
                        <Text
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                textAlign: "center",
                                color: "white"
                            }}>Edit items</Text>
                    </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.placeOrder}
                    style={{
                        marginVertical: 8,
                        backgroundColor: "skyblue",
                        width: 125,
                        height: 40
                    }}>
                        <Text
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                textAlign: "center",
                                color: "white"
                            }}>Place order</Text>
                    </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={this.cancelOrder}
                    style={{
                        marginVertical: 8,
                        backgroundColor: "skyblue",
                        width: 125,
                        height: 40,
                    }}>
                        <Text
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            textAlign: "center",
                            color: "white"
                        }}>Cancel order</Text>
                    </TouchableOpacity>
            </View>
        )
    }

    refreshApp = ()=>{

        this.context.orderContext.refreshItem()
            .then( refreshed => {
                this.props.navigation.navigate("Home");
            })
    }

    renderOrderComplete = ()=>{
        return (
            <View style={{
                marginTop: 25
            }}>
                <Text style={{
                    textAlign: "center",
                    marginTop: 20,
                    marginBottom: 35,
                    fontSize: 16
                }}>Order has been placed</Text>

                <Button
                    title="Ok"
                    onPress={this.refreshApp}></Button>
            </View>
        );
    };

    render(){

        return (
            <ScrollView
                style={{
                    fontSize: 18,
                    textAlign: "center"
                }}>
                <Text style={{
                    marginTop: 25,
                    fontSize: 18
                }}></Text>

                {!this.state.orderPlaced ? this.renderOrderInfo() : <View></View>}

                {!this.state.orderPlaced ? this.renderUserInfo() : <View></View>}

                {!this.state.orderPlaced ? this.renderOptions() : <View></View>}

                {this.state.orderPlaced ? this.renderOrderComplete() : <View></View>}
            </ScrollView>
        );
    };
};