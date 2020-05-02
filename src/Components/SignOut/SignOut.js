import React from "react";
import {Text, View, Button, TouchableOpacity} from "react-native";
import AppContext from "../../Services/Context/AppContext/AppContext";
import UserToken from "../../Services/UserToken/UserToken";

export default class SignOut extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    static contextType = AppContext;

    handleSignOut = ()=>{
        UserToken.deleteToken()
            .then( deletedToken => {
                this.context.userContext.refreshUserContext()
                    .then( isLoggedIn => {
                        this.props.navigation.navigate("Home");
                    });                
            })
    }

    render(){
        return (
            <View>
                <TouchableOpacity
                    style={{
                        alignSelf: "center",
                        width: 100,
                        marginTop: 155,
                        backgroundColor: "skyblue"
                    }}
                    onPress={this.handleSignOut}>
                    <Text
                        style={{
                            margin: 0,
                            paddingHorizontal: 12,
                            paddingVertical: 16,
                            textAlign: "center"
                        }}>Sign out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}