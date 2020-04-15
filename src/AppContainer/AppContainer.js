import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import { StyleSheet, Text, View } from 'react-native';
import UserToken from "../Services/UserToken/UserToken";

import UserContext from "../Services/Context/Usercontext/UserContext";
import AppContext from "../Services/Context/AppContext/AppContext";
import Order from "../Components/Order/Order";
import Home from "../Components/Home/Home";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import UserProfile from "../Components/UserProfile/UserProfile";
import SignOut from "../Components/SignOut/SignOut";

const Drawer = createDrawerNavigator();

 class AppContainer extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            appLoading: true,
        }
    }

    componentDidMount(){
    }
    
    refreshApp = ()=>{
        this.componentDidMount();
    }

    isLoggedIn = (context)=>{

        return (
            <>
                <Drawer.Screen name="Profile" component={UserProfile}></Drawer.Screen>
                <Drawer.Screen name="Sign out" component={SignOut}></Drawer.Screen>
            </>
        );
    }

    notLoggedIn =(context)=>{
        return (
            <>
                <Drawer.Screen name="Log in" component={Login}></Drawer.Screen>
                <Drawer.Screen name="Sign up" component={Register}></Drawer.Screen>
            </>
        )
    }

    render(){
        console.log(this.context);

        return (
            <NavigationContainer>
                <Drawer.Navigator>                            
                    <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
                    <Drawer.Screen name="Order" component={Order}></Drawer.Screen>
                    {this.context.isLoggedIn ? this.isLoggedIn() : this.notLoggedIn()}
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

AppContainer.contextType = UserContext;

export default AppContainer;