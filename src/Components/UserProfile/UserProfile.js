import React from "react";
import {View, Text} from "react-native";
import UserContext from "../../Services/Context/UserContext/UserContext";
import {createStackNavigator} from "@react-navigation/stack";

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
            <View>
                <Text>User profile</Text>
            </View>
        )
    }
}