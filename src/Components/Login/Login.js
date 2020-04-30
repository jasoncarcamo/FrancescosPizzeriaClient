import React from "react";
import {View, Text, TextInput, Button, ScrollView, TouchableOpacity} from "react-native"
import UserService from "../../Services/UserToken/UserToken";
import AppContext from "../../Services/Context/AppContext/AppContext";

import MenuIcon from "../MenuIcon/MenuIcon";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    static contextType = AppContext;

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
        fetch("https://vast-escarpment-62007.herokuapp.com/api/login", {
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
                        this.context.userContext.refreshUserContext()   
                            .then( isLoggedIn => {

                                this.props.navigation.navigate("Profile");
                                
                            });
                    })
                
            })
            .catch( err => this.setState({ error: err.error}));
    }

    render(){
        
        return (
            <ScrollView
                contentContainerStyle = {{
                    flexDirection: "column",
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
                        textAlign: "center",
                        marginTop: 125,
                        marginBottom: 20,
                        fontSize: 30
                    }}>Log into account</Text>

                <TextInput 
                    placeholder="Email" 
                    onChangeText={this.handleEmail} 
                    value={this.state.email}
                    style={{
                        borderBottomColor: "black",
                        borderWidth: 1,
                        borderRadius: 4,
                        width: 280,
                        height: 40,
                        marginVertical: 10,
                        alignSelf: "center",
                        paddingLeft: 15                        
                    }}></TextInput>

                <TextInput 
                    secureTextEntry={true} 
                    onChangeText={this.handlePassword} 
                    placeholder="Password" 
                    value={this.state.password}
                    style={{
                        borderBottomColor: "black",
                        borderWidth: 1,
                        borderRadius: 4,
                        width: 280,
                        height: 40,
                        marginVertical: 10,
                        alignSelf: "center",
                        paddingLeft: 15                        
                    }}></TextInput>

                <Text
                    style={{
                        textAlign: "center"
                    }}>{this.state.error ? this.state.error : "" }</Text>

                <TouchableOpacity 
                    onPress={this.handleLogin}
                    style={{
                        width: 100,
                        backgroundColor: "skyblue",
                        padding: 0,
                        marginVertical: 20,
                        alignSelf: "center"
                    }}>
                        <Text
                            style={{
                                textAlign: "center",
                                margin: 0,
                                paddingVertical: 15,
                                color: "white"
                            }}>Log In</Text>
                    </TouchableOpacity>
            </ScrollView>
        )
    }
}