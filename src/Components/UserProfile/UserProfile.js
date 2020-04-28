import React from "react";
import {View, Text} from "react-native";
import UserContext from "../../Services/Context/UserContext/UserContext";
import {createStackNavigator} from "@react-navigation/stack";

import MenuIcon from "../MenuIcon/MenuIcon";

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

                <View
                    style={{
                        alignSelf: "flex-end",
                        marginVertical: 20,
                        marginHorizontal: 15
                    }}>
                    <MenuIcon 
                        navigation={this.props.navigation}/>   
                </View>

                <Text>User profile</Text>
            </View>
        )
    }
}