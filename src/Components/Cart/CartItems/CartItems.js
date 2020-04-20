import React from "react";
import {View, Text, Button, ScrollView} from "react-native";
import AppContext from "../../../Services/Context/AppContext/AppContext";

import CartItem from "./CartItem/CartItem";

export default class CartItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
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

        items = items.map( ( item, index)=> {

            return <CartItem key={index} index={index} item={item} refreshItem={this.refreshItems}/>
        });

        return items;
    }

    refreshItems =()=>{
        console.log(this.context);
        this.componentDidMount();
    }

    render(){
        return (
            <ScrollView>
                <Text>Cart items</Text>

                {this.renderItems()}
            </ScrollView>
        )
    }
}