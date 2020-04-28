import React from "react";
import {View, Text, Button, ScrollView} from "react-native";
import AppContext from "../../../Services/Context/AppContext/AppContext";

import CartItem from "./CartItem/CartItem";

export default class CartItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showCheckout: true,
            refresh: false
        };
    }

    static contextType = AppContext;

    componentDidMount(){
        this.setState({
            refresh: false
        })
    }

    renderItems = ()=>{
        let items = this.context.orderContext.orderItems;

        if(items.length < 1 || !items){
            return items;
        };

        items = items.map( ( item, index)=> {

            return <CartItem key={index} index={index} item={item} showCheckout={this.showCheckout} navigation={this.props.navigation}/>
        });

        return items;
    }

    showCheckout =()=>{
        this.setState({
            showCheckout: !this.state.showCheckout
        })
    }

    continue = ()=>{
        if(this.context.orderContext.orderItems.length > 0){
            return <Button title="Check out" onPress={()=>this.props.navigation.navigate("Check out")}></Button>
        } else{
            return (
                <>
                    <Text
                        style={{
                            marginVertical: 30,
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: 20
                        }}>No items in your cart yet.</Text>

                    <Button
                        title="Start ordering"
                        onPress={()=> this.props.navigation.navigate("Menu")}></Button>
                </>
            )
        }
    }

    render(){
        return (
            <ScrollView>

                {this.renderItems()}

                {this.continue()}
            </ScrollView>
        )
    }
}