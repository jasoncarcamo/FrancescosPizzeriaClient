import React from "react";
import {View, Text, Button} from "react-native";
import UserToken from "../../Services/UserToken/UserToken";
import UserContext from "../../Services/Context/Usercontext/UserContext";

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    static contextType = UserContext;

    componentDidMount(){
    }

    handleSignOut = ()=>{
        this.props.navigation.navigate("Sign out");
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
        this.props.navigation.navigate("Log in");
    }

    render(){

        return (
            <View>
                <Text>Open up App.js to start working on your app!</Text>
                <Button
                    title="Pick Up"
                    onPress={() => {}}></Button>
                
                <Button
                    title="Delivery"
                    onPress={()=> this.props.navigation.navigate("Profile")}></Button>


                {this.context.isLoggedIn ? this.isLoggedIn() : this.isNotLoggedIn()}
            </View>
        )
    }
}
