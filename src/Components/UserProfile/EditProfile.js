import React from "react";
import {ScrollView, Text, Button, TouchableOpacity, TextInput} from "react-native";
import AppContext from "../../Services/Context/AppContext/AppContext";

export default class EditProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {},
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
        }
    }

    static contextType = AppContext;

    componentDidMount(){
        this.setState({
            user: this.context.userContext.user
        })
    }

    componentWillUnmount(){
        this.setState({
            user: {},
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
        });
    }

    handleFirstName = (text)=>{
        const user = this.state.user;
        user.firstName = text;
        this.setState({
            user,
            firstName: text
        });
    }

    handleLastName = (text)=>{
        const user = this.state.user;
        user.lastName = text;
        this.setState({
            user,
            lastName: text
        });
    }

    handleAddress = (text)=>{
        const user = this.state.user;
        user.address = text;
        this.setState({
            user,
            address: text
        });
    }

    handleCity = (text)=>{
        const user = this.state.user;
        user.city = text;
        this.setState({
            user,
            city: text
        });
    }

    handleState = (text)=>{
        const user = this.state.user;
        user.state = text;
        this.setState({
            user,
            state: text
        });
    }

    handleZipCode = (text)=>{
        const user = this.state.user;
        user.zipCode = text;
        this.setState({
            user,
            zipCode: text
        });
    }

    handleEmail = (text)=>{
        const user = this.state.user;
        user.email= text;
        this.setState({
            user,
            email: text
        });
    }

    handleMobileNumber = (text)=>{
        const user = this.state.user;
        user.mobileNumber = text;
        this.setState({
            user,
            mobileNumber: text
        });
    }

    handlePassword = (text)=>{
        const user = this.state.user;
        user.password = text;
        this.setState({
            user,
            password: text
        });
    }

    render(){

        return (
            <ScrollView>
                <Text
                    style={{
                        textAlign: "center",
                        marginVertical: 25,
                        fontSize: 25
                    }}>Register</Text>

                <TextInput
                    onChangeText={this.handleFirstName}
                    value={this.state.user.firstName}
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
                    value={this.state.user.lastName}
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
                    value={this.state.user.address}
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
                    value={this.state.user.city}
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
                    value={this.state.user.state}
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
                    value={this.state.user.zipCode}
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
                    value={this.state.user.email}
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
                    value={this.state.user.mobileNumber}
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
                    value={this.state.user.password}
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
                            }}>Confirm</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}