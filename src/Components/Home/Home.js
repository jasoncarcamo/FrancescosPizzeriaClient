import React from "react";
import {View, Text, Button} from "react-native";
import UserToken from "../../Services/UserToken/UserToken";
import AppContext from "../../Services/Context/AppContext/AppContext";
import UserContext from "../../Services/Context/UserContext/UserContext";
import MenuContext from "../../Services/Context/MenuContext/MenuContext";

import MenuIcon from "../MenuIcon/MenuIcon";

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    static contextType = AppContext;

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
            <View
                style={{
                    justifyContent: "space-evenly",
                }}>
                
                <View
                    style={{
                        alignSelf: "flex-end",
                        marginVertical: 20,
                        marginHorizontal: 15
                    }}>
                    <MenuIcon 
                        navigation={this.props.navigation}/>   
                </View>
                        
                <Text
                    style={{
                        marginVertical: 80,
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>Francescos Pizzeria</Text>
                <Button
                    title="Pick Up"
                    onPress={() => this.props.navigation.navigate("Order", { screen: "Pick up time", params: "Pick up time"})}></Button>
                
                <Button
                    title="Delivery"
                    onPress={()=> this.props.navigation.navigate("Order", { screen: "Delivery time", params: "Delivery time"})}></Button>


                {this.context.userContext.isLoggedIn ? this.isLoggedIn() : this.isNotLoggedIn()}
            </View>
        )
    }
}
