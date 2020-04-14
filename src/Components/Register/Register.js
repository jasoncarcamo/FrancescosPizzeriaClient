import React from "react";
import {Text, View, Button, TextInput} from "react-native";
import UserToken from "../../Services/UserToken/UserToken";
import UserContext from "../../Services/UserContext/UserContext";

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    };

    static contextType = UserContext;

    render(){

        return (
            <View>
                <Text>Register</Text>
            </View>
        )
    }
}