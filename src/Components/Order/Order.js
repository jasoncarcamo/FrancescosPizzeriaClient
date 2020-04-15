import React from "react";
import {Text, View, Button} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";

import OrderType from "./OrderType/OrderType";

const Stack = createStackNavigator();

export default class Order extends React.Component{
    render(){
        return (
            <Stack.Navigator initialRouteName="Order">
                <Stack.Screen name="Order" component={OrderType}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}