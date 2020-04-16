import React from "react";
import {Text, View, Button, TextInput} from "react-native";
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
        fetch("https://localhost:5001/api/registeruser", {
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
            <View>
                <Text>Register</Text>

                <TextInput
                    onChangeText={this.handleFirstName}
                    value={this.state.firstName}
                    placeholder="First name"></TextInput>
                <TextInput
                    onChangeText={this.handleLastName}
                    value={this.state.lastName}
                    placeholder="Last name"></TextInput>

                <TextInput
                    onChangeText={this.handleAddress}
                    value={this.state.address}
                    placeholder="Address"></TextInput>
                
                <TextInput
                    onChangeText={this.handleCity}
                    value={this.state.city}
                    placeholder="City"></TextInput>

                <TextInput
                onChangeText={this.handleState}
                value={this.state.state}
                placeholder="State"></TextInput>

                <TextInput
                    onChangeText={this.handleZipCode}
                    value={this.state.zipCode}
                    placeholder="Zip code"></TextInput>
                <TextInput
                    onChangeText={this.handleEmail}
                    value={this.state.email}
                    placeholder="Email"></TextInput>
                <TextInput
                    onChangeText={this.handleMobileNumber}
                    value={this.state.mobileNumber}
                    placeholder="Mobile number"></TextInput>
                <TextInput
                    onChangeText={this.handlePassword}
                    value={this.state.password}
                    placeholder="Password"
                    secureTextEntry></TextInput>

                <Text>{this.state.error ? this.state.error : ""}</Text>

                <Button
                    title="Sign Up"
                    onPress={this.handleSignUp}></Button>
            </View>
        )
    }
}