import React from "react";
import {View, Text, TextInput, Button} from "react-native"
import UserService from "../../Services/UserToken/UserToken";
import UserContext from "../../Services/UserContext/UserContext";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    static contextType = UserContext;

    handleEmail = (text)=>{
        this.setState({
            email: text
        })
    }

    handlePassword = (text)=>{
        this.setState({
            password: text
        })
    }

    handleLogin = ()=>{
        fetch("https://localhost:5001/api/loginuser", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then( res => {
                if(!res.ok){
                    
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {

                UserService.saveToken( resData.token)
                    .then( savedToken => {
                        this.context.refreshApp();
                        this.props.navigation.navigate("Home")
                    })
                
            })
            .catch( err => this.setState({ error: err.error}));
    }

    render(){
        
        return (
            <View>
                <Text>hello from log in user screen token: {this.state.token}{this.state.error}</Text>
                <TextInput placeholder="Email" onChangeText={this.handleEmail} value={this.state.email}></TextInput>
                <TextInput secureTextEntry={true} onChangeText={this.handlePassword} placeholder="Password" value={this.state.password}></TextInput>

                <Text>{this.state.error ? this.state.error : "" }</Text>

                <Button 
                    title="Log In"
                    onPress={this.handleLogin}></Button>
            </View>
        )
    }
}