import React from "react";
import {Text, View, Button} from "react-native";
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
                <Button
                    title="Sign out"
                    onPress={this.handleSignOut}></Button>
            </View>
        )
    }
}