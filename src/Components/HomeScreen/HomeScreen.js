import React from "react";
import {View, Text, Button} from "react-native";
import UserToken from "../../Services/UserToken/UserToken";
import UserContext from "../../Services/UserContext/UserContext";

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    static contextType = UserContext;

    componentDidMount(){

    }

    handleSignOut = ()=>{
        UserToken.deleteToken()
            .then( deletedToken => {
                console.log("Signing out!", this.props.context)
                this.context.refreshApp();
            })
    }

    isLoggedIn = ()=>{
        return <Button 
        title="Sign Out"
        onPress={this.handleSignOut}></Button>;
    }
    isNotLoggedIn = ()=>{
        return <Button
        title="Sign In"
        onPress={this.toLogIn}></Button>
    }

    toLogIn = () => {
        this.props.navigation.navigate("Login");
    }

    render(){
        console.log(this.context)
        return (
            <View>
                <Text>Open up App.js to start working on your app!</Text>
                <Button
                    title="Pick Up"></Button>
                
                <Button
                    title="Delivery"></Button>


                {this.context.isLoggedIn ? this.isLoggedIn() : this.isNotLoggedIn()}
            </View>
        )
    }
}
