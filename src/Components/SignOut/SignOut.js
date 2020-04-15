import React from "react";
import {Text, View, Button} from "react-native";
import UserContext from "../../Services/Context/Usercontext/UserContext";
import UserToken from "../../Services/UserToken/UserToken";

export default class SignOut extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    static contextType = UserContext;

    handleSignOut = ()=>{
        UserToken.deleteToken()
            .then( deletedToken => {
                this.context.refreshApp();
                this.props.navigation.navigate("Home");
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