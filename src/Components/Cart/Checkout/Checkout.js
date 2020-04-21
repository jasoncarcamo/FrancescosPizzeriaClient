import React from "react";
import {Button, Text, ScrollView, View} from "react-native";
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
            <View>
                <Text>Order type: {this.context.orderContext.orderType}</Text>

                {this.context.orderContext.orderType == "Delivery" ? <Text>Delivery address: {this.context.orderContext.address}</Text> : <View></View>}
            </View>
        )
    }

    renderUserInfo = ()=>{
        return (
            <View>
                <Text>Name: {this.context.userContext.user.firstName} {this.context.userContext.user.lastName}</Text>

                <Text>Mobile number: {this.context.userContext.user.mobileNumber}</Text>
            </View>
        )
    }

    placeOrder = ()=>{
        this.context.orderContext.completeOrder(this.context.orderContext.order)
            .then( data => {
                this.context.orderContext.refreshItem()
                    .then( refreshed => {

                        this.context.orderContext.resetOrder();
                        
                        this.setState({
                            orderPlaced: true
                        });
                    });
            })
            .catch( err => this.setState({ error: err.error}));
    }

    renderOptions = ()=>{
        return (
            <View>
                <Button
                    title="Edit items"
                    onPress={()=> this.props.navigation.navigate("Cart items")}></Button>

                <Button
                    title="Place order"
                    onPress={this.placeOrder}></Button>
                
                <Button
                    title="Cancel order"
                    ></Button>
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
            <View>
                <Text>Order had been placed</Text>

                <Button
                    title="Ok"
                    onPress={this.refreshApp}></Button>
            </View>
        );
    };

    render(){
        
        return (
            <ScrollView>
                <Text>Checking out</Text>

                {!this.state.orderPlaced ? this.renderOrderInfo() : <View></View>}

                {!this.state.orderPlaced ? this.renderUserInfo() : <View></View>}

                {!this.state.orderPlaced ? this.renderOptions() : <View></View>}

                {this.state.orderPlaced ? this.renderOrderComplete() : <View></View>}
            </ScrollView>
        );
    };
};