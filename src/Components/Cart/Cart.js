import React from "react";
import {} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";

import MenuIcon from "../MenuIcon/MenuIcon"
import CartItems from "./CartItems/CartItems";
import Checkout from "./Checkout/Checkout";

const Stack = createStackNavigator();

export default class Cart extends React.Component{

    render(){

        return (
            <Stack.Navigator 
                initialRouteName="Cart items"
                screenOptions={{
                    headerRight: ()=> <MenuIcon navigation={this.props.navigation}/>   
                }}>
                <Stack.Screen name="Cart items" component={CartItems}></Stack.Screen>
                <Stack.Screen name="Check out" component={Checkout}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}