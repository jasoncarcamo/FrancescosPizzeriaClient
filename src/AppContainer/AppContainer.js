import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";

import AppContext from "../Services/Context/AppContext/AppContext";
import UserContext from "../Services/Context/UserContext/UserContext";
import Order from "../Components/Order/Order";
import Home from "../Components/Home/Home";
import Menu from "../Components/Menu/Menu";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import UserProfile from "../Components/UserProfile/UserProfile";
import SignOut from "../Components/SignOut/SignOut";

const Drawer = createDrawerNavigator();

export default class AppContainer extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            appLoading: true,
        }
    }

    static contextType = AppContext;

    isLoggedIn = ()=>{

        return (
            <>
                <Drawer.Screen name="Profile" component={UserProfile}></Drawer.Screen>
                <Drawer.Screen name="Sign out" component={SignOut}></Drawer.Screen>
            </>
        );
    }

    notLoggedIn =()=>{
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
                <Drawer.Navigator screenOptions={{
                    unmountOnBlur: true,
                
                }}>                            
                    <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
                    <Drawer.Screen name="Menu" component={Menu}></Drawer.Screen>
                    <Drawer.Screen name="Order" component={Order}></Drawer.Screen>
                    {this.context.userContext.isLoggedIn ? this.isLoggedIn() : this.notLoggedIn()}
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}