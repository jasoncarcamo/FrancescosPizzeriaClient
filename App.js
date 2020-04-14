import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { StyleSheet, Text, View } from 'react-native';
import UserToken from "./src/Services/UserToken/UserToken";

import UserContext from "./src/Services/UserContext/UserContext";
import {UserProvider} from "./src/Services/UserContext/UserContext";
import LoadingApp from "./src/Components/LoadingApp/LoadingApp";
import HomeScreen from "./src/Components/HomeScreen/HomeScreen";
import LoginUser from "./src/Components/LoginUser/LoginUser";

const Stack = createStackNavigator();

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
                <Stack.Screen
                        name="Home">
                    {()=> <HomeScreen context={context}/>}
                </Stack.Screen>
            </>
        )
    }

    notLoggedIn =(context)=>{
        return (
            <>
                <Stack.Screen
                        name="Login">
                            {()=> <LoginUser context={context}/>}
                        </Stack.Screen>
            </>
        )
    }

    render(){
        return (
                <UserProvider>
                    <NavigationContainer>
                        <Stack.Navigator>

                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}>
                            </Stack.Screen>

                            <Stack.Screen
                                name="Login"
                                component={LoginUser}>
                            </Stack.Screen>
                        </Stack.Navigator>
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
