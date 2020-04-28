import React from "react";
import {View, Text, Button} from "react-native";
import UserContext from "../../Services/Context/UserContext/UserContext";
import {createStackNavigator} from "@react-navigation/stack";

import MenuIcon from "../MenuIcon/MenuIcon";

const Stack = createStackNavigator();

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    static contextType = UserContext;
    
    render(){
        console.log(this.context)
        return (
            <View>

                <Text>User profile</Text>

                <Text>{this.context.user.firstName} {this.context.user.lastName}</Text>

                <Text>{this.context.user.address}, {this.context.user.city}, {this.context.user.state}, {this.context.user.zipCode}</Text>

                <Text>{this.context.user.mobileNumber}</Text>

                <Button
                    title="Edit profile"
                    onPress={()=> this.props.navigation.navigate("Edit Profile")}></Button>
            </View>
        )
    }
}