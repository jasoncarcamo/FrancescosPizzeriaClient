import React from "react";
import {} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";

import CartItems from "./CartItems/CartItems";

const Stack = createStackNavigator();

export default class Cart extends React.Component{

    render(){

        return (
            <Stack.Navigator initialRouteName="Cart items">
                <Stack.Screen name="Cart items" component={CartItems}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}