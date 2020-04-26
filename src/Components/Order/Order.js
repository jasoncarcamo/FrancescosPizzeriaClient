import React from "react";
import {Text, View, Button} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";

import MenuIcon from "../MenuIcon/MenuIcon";
import OrderType from "./OrderType/OrderType";
import DeliveryOptions from "./OrderType/DeliveryOptions/DeliveryOptions";
import PickUpOptions from "./OrderType/PickUpOptions/PickUpOptions";

const Stack = createStackNavigator();

export default class Order extends React.Component{

    render(){
        
        return (
            <Stack.Navigator initialRouteName="Order" screenOptions={{
                headerRight: ()=> <MenuIcon navigation={this.props.navigation}/>   
            }}>
                <Stack.Screen name="Order" component={OrderType}></Stack.Screen>
                <Stack.Screen name="Delivery time" component={DeliveryOptions}></Stack.Screen>
                <Stack.Screen name="Pick up time" component={PickUpOptions}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}