import React from "react";
import {View, Text, Button, ScrollView} from "react-native";
import UserContext from "../../Services/Context/UserContext/UserContext";
import {createStackNavigator} from "@react-navigation/stack";
import ResetPassword from "./ResetPassword";

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
            <ScrollView>

                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 18,
                        marginTop: 60,
                        marginBottom: 30
                    }}>{this.context.user.firstName} {this.context.user.lastName}</Text>

                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 18,
                        marginVertical: 20
                    }}>{this.context.user.address}, {this.context.user.city}, {this.context.user.state}, {this.context.user.zipCode}</Text>

                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 18,
                        marginVertical: 20
                    }}>{this.context.user.mobileNumber}</Text>

                <Button
                    title="Edit profile"
                    onPress={() => this.props.navigation.navigate("Edit Profile")}></Button>

                <ResetPassword id={this.context.user.id} navigation={this.props.navigation
                }/>

            </ScrollView>
        )
    }
}