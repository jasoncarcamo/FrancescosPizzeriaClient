import React from "react";
import {View, Text} from "react-native";
import Profile from "./Profile";
import UserContext from "../../Services/Context/UserContext/UserContext";
import {createStackNavigator} from "@react-navigation/stack";

import MenuIcon from "../MenuIcon/MenuIcon";
import EditProfile from "../UserProfile/EditProfile";

const Stack = createStackNavigator();

export default class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    static contextType = UserContext;
    
    render(){
        return (
            <Stack.Navigator initialRouteName="Profile" screenOptions={{
                headerRight: ()=> <MenuIcon navigation={this.props.navigation}/>   ,
                
            }}>
                <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
                <Stack.Screen name="Edit Profile" component={EditProfile} options={{
                }}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}