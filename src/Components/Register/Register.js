import React from "react";
import {Text, View, Button, TextInput, TouchableOpacity, ScrollView} from "react-native";
import UserToken from "../../Services/UserToken/UserToken";
import AppContext from "../../Services/Context/AppContext/AppContext";

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            email: "",
            mobileNumber: "",
            password: "",
            error: ""
        };
    };

    static contextType = AppContext;

    componentDidMount(){

    }

    handleFirstName = (text)=>{
        this.setState({
            firstName: text
        });
    }

    handleLastName = (text)=>{
        this.setState({
            lastName: text
        });
    }

    handleAddress = (text)=>{
        this.setState({
            address: text
        });
    }

    handleCity = (text)=>{
        this.setState({
            city: text
        });
    }

    handleState = (text)=>{
        this.setState({
            state: text
        });
    }

    handleZipCode = (text)=>{
        this.setState({
            zipCode: text
        });
    }

    handleEmail = (text)=>{
        this.setState({
            email: text
        })
    }

    handleMobileNumber = (text)=>{
        this.setState({
            mobileNumber: text
        })
    }

    handlePassword = (text)=>{
        this.setState({
            password: text
        })
    }

    handleSignUp = ()=>{
        fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zipCode: this.state.zipCode,
                email: this.state.email,
                mobileNumber: this.state.mobileNumber,
                password: this.state.password,
            })
        })
            .then( res => {

                if(!res.ok){

                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                UserToken.saveToken(resData.token)
                    .then( savedToken => {
                        
                        this.context.userContext.refreshUserContext()
                            .then( isLoggedIn => {
                                this.props.navigation.navigate("Profile");
                            });
                    })
            })
            .catch( err => this.setState({ error: err.error}))
    }

    render(){

        return (
            <ScrollView 
            contentContainerStyle = {{
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    
                }}>

                <Text
                    style={{
                        textAlign: "center",
                        marginVertical: 25,
                        fontSize: 25
                    }}>Register</Text>

                <TextInput
                    onChangeText={this.handleFirstName}
                    value={this.state.firstName}
                    placeholder="First name"
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
                    onChangeText={this.handleLastName}
                    value={this.state.lastName}
                    placeholder="Last name"
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
                    onChangeText={this.handleAddress}
                    value={this.state.address}
                    placeholder="Address"
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
                    onChangeText={this.handleCity}
                    value={this.state.city}
                    placeholder="City"
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
                    onChangeText={this.handleState}
                    value={this.state.state}
                    placeholder="State"
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
                    onChangeText={this.handleZipCode}
                    value={this.state.zipCode}
                    placeholder="Zip code"
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
                    onChangeText={this.handleEmail}
                    value={this.state.email}
                    placeholder="Email"
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
                    onChangeText={this.handleMobileNumber}
                    value={this.state.mobileNumber}
                    placeholder="Mobile number"
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
                    onChangeText={this.handlePassword}
                    value={this.state.password}
                    placeholder="Password"
                    secureTextEntry
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

                <Text>{this.state.error ? this.state.error : ""}</Text>

                <TouchableOpacity
                    style={{
                        width: 100,
                        backgroundColor: "skyblue",
                        padding: 0,
                        marginVertical: 20,
                        alignSelf: "center"
                    }}
                    onPress={this.handleSignUp}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                margin: 0,
                                paddingVertical: 15,
                                color: "white"
                            }}>Sign Up</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}