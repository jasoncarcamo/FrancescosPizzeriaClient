import React from "react";
import {View, Text, Button} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import AppContext from "../../Services/Context/AppContext/AppContext";

import MenuIcon from "../MenuIcon/MenuIcon";
import MenuItems from "./MenuItems/MenuItems";
import PizzaItems from "./MenuItems/PizzaItems/PizzaItems";
import PastaItems from "./MenuItems/PastaItems/PastaItems";
import HeroItems from "./MenuItems/HeroItems/HeroItems";

const Stack = createStackNavigator();

export default class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories: []
        }
    }

    static contextType = AppContext;

    render(){

        return (
            <Stack.Navigator 
            screenOptions={{
                headerRight: ()=> <MenuIcon navigation={this.props.navigation}/>   
            }}
            initialRouteName="Menu">
                <Stack.Screen name="Menu" component={MenuItems}></Stack.Screen>
                <Stack.Screen name="Pizza items" component={PizzaItems}></Stack.Screen>
                <Stack.Screen name="Pasta items" component={PastaItems}></Stack.Screen>
                <Stack.Screen name="Hero items" component={HeroItems}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}