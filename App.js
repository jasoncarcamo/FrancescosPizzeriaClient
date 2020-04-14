import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import { StyleSheet, Text, View } from 'react-native';
import UserToken from "./src/Services/UserToken/UserToken";

import UserContext from "./src/Services/UserContext/UserContext";
import {UserProvider} from "./src/Services/UserContext/UserContext";
import Order from "./src/Components/Order/Order";
import Home from "./src/Components/Home/Home";
import Register from "./src/Components/Register/Register";
import Login from "./src/Components/Login/Login";
import UserProfile from "./src/Components/UserProfile/UserProfile";
import SignOut from "./src/Components/SignOut/SignOut";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            appLoading: true,
        }
    }

    static contextType = UserContext;

    componentDidMount(){

    }

    componentDidUpdate(){
        console.log("Updated")
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
        return (
                <UserProvider>
                    <NavigationContainer>
                        <UserContext.Consumer>
                            { context => (
                                <>
                                    <Drawer.Navigator>                            
                                        <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
                                        <Drawer.Screen name="Order" component={Order}></Drawer.Screen>
                                        {context.isLoggedIn ? this.isLoggedIn() : this.notLoggedIn()}
                                    </Drawer.Navigator>
                                </>
                                )
                            }
                        </UserContext.Consumer>
                    </NavigationContainer>
                </UserProvider>
            );
        }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
