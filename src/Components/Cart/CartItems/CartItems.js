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
        this.componentDidMount();
    }

    continue = ()=>{
        if(this.context.orderContext.orderItems.length > 0){
            return <Button title="Check out" onPress={()=>this.props.navigation.navigate("Check out")}></Button>
        } else{
            return (
                <>
                    <Text>No items in your cart yet.</Text>

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