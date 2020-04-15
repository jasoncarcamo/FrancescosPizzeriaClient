import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import { StyleSheet, Text, View } from 'react-native';
import UserToken from "./src/Services/UserToken/UserToken";

import AppContext, {AppProvider} from "./src/Services/Context/AppContext/AppContext";
import UserContext, {UserProvider} from "./src/Services/Context/UserContext/UserContext";
import MenuContext, {MenuProvider} from "./src/Services/Context/MenuContext/MenuContext";
import OrderContext, {OrderProvider} from "./src/Services/Context/OrderContext/OrderContext";

import AppContainer from "./src/AppContainer/AppContainer";

const Drawer = createDrawerNavigator();

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            appLoading: true,
        }
    }

    componentDidMount(){

    }

    componentDidUpdate(){
        console.log("Updated")
    }
    
    refreshApp = ()=>{
        this.componentDidMount();
    }

    render(){

        return (
            <MenuProvider>
                <UserProvider>
                    <AppContainer/>
                </UserProvider>
            </MenuProvider>
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
