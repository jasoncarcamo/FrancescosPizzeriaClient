import React from "react";
import {Text, View, Button, TextInput, TouchableOpacity, ScrollView} from "react-native";
import UserToken from "../../Services/UserToken/UserToken";
import AppContext from "../../Services/Context/AppContext/AppContext";
import MenuIcon from "../MenuIcon/MenuIcon";

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
            unformattedNumber: "",
            password: "",
            confirmPassword: "",
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

    formatMobileNumber = (phoneNumberString)=> {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

        if (match) {
            return '1+ (' + match[1] + ') ' + match[2] + '-' + match[3]
        };

        return "";
    }

    handleMobileNumber = (text)=>{
        this.setState({
            mobileNumber: text
        })
    }

    handleConfirmPassword = (text)=>{
        this.setState({
            confirmPassword: text
        });
    };

    confirmPassword = (password)=>{
        if(this.state.confirmPassword == ""){
            return (
                <>
                    <View
                        style={{
                            width: 280,
                            height: 3,
                            backgroundColor: "grey",
                            alignSelf: "center",
                        }}></View>
                </>
            )
        };

        if(password == this.state.confirmPassword){
            return (
                <>
                    <View
                        style={{
                            width: 280,
                            height: 3,
                            backgroundColor: "green",
                            alignSelf: "center",
                        }}></View>
                    <Text
                        style={{
                            width: 280,
                            paddingLeft: 5,
                            marginBottom: 20,
                            alignSelf: "center"
                        }}>Password matches!</Text>
                </>
            );
        } else{
            return (
                <>
                    <View
                        style={{
                            width: 280,
                            height: 3,
                            backgroundColor: "red",
                            alignSelf: "center",
                        }}></View>
                    <Text
                        style={{
                            width: 280,
                            paddingLeft: 5,
                            marginBottom: 20,
                            alignSelf: "center"
                        }}>Password does not match!</Text>
                </>
            )
        }
    }

    validatePassword = (password) => {
        
        const REGEX_UPPER_LOWER_NUMBER_SPECIAL = (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/);

        const requirements = [ 
            <Text key={0} style={{color: 'gray'}}>Password must be longer than 8 characters</Text>,
            <Text key={1} style={{color: 'gray'}}>Password must be less than 72 characters</Text>,
            <Text key={2} style={{color: 'gray'}}>Password must not start or end with empty spaces</Text>,
            <Text key={3} style={{color: 'gray'}}>Password must contain one upper case, lower case, number and special character</Text>
        ]

        if(password.length > 1){
            if (password.length > 8) {
                requirements[0] = <Text key={0} style={{color: 'green'}}>Password must be longer than 8 characters</Text>
              } else{
      
              }
      
              if (password.length < 72) {
                requirements[1] = <Text key={1} style={{color: 'green'}}>Password must be less than 72 characters</Text>
              } else{
      
              };
      
              if (!password.startsWith(' ') || !password.endsWith(' ')) {
                requirements[2] = <Text key={2} style={{color: 'green'}}>Password must not start or end with empty spaces</Text>
              } else{
                
              };
      
              if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
                  requirements[3] = <Text key={3} style={{color: 'gray'}}>Password must contain one upper case, lower case, number and special character</Text>
              } else{
                  requirements[3] = <Text key={3} style={{color: 'green'}}>Password must contain one upper case, lower case, number and special character</Text>
              };
        }
        
        return requirements
    }

    handlePassword = (text)=>{
        this.setState({
            password: text
        })
    }

    handleSignUp = ()=>{
        const userInfo  = this.state;
        let valid = true;

        for( const key of Object.keys(userInfo)){
            
            if(key != "error" && key != "unformattedNumber"){
                if(userInfo[key] == ""){
                    valid = false;
                };
            };
        };

        if(!valid){

            this.setState({
                error: "Fill out the missing information"
            });

            return;
        }

        fetch("https://vast-escarpment-62007.herokuapp.com/api/register", {
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

                <View
                    style={{
                        alignSelf: "flex-end",
                        marginVertical: 45,
                        marginHorizontal: 15
                    }}>
                    <MenuIcon 
                        navigation={this.props.navigation}/>   
                </View>

                <Text
                    style={{
                        textAlign: "center",
                        marginTop: 40,
                        marginBottom: 65,
                        fontSize: 30
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
                        marginTop: 10,
                        alignSelf: "center",
                        paddingLeft: 15                        
                    }}></TextInput>
                <Text
                    style={{
                        width: 280,
                        alignSelf: "center",
                        paddingLeft: 5,
                        color: "red",
                        marginBottom: 20
                    }}>{this.state.firstName == "" ? "Required" : ""}</Text>

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
                        marginTop: 10,
                        alignSelf: "center",
                        paddingLeft: 15                        
                    }}></TextInput>
                <Text
                    style={{
                        width: 280,
                        alignSelf: "center",
                        paddingLeft: 5,
                        color: "red",
                        marginBottom: 20
                    }}>{this.state.lastName == "" ? "Required" : ""}</Text>

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
                        marginTop: 10,
                        alignSelf: "center",
                        paddingLeft: 15                        
                    }}></TextInput>
                <Text
                    style={{
                        width: 280,
                        alignSelf: "center",
                        paddingLeft: 5,
                        color: "red",
                        marginBottom: 20
                    }}>{this.state.address == "" ? "Required" : ""}</Text>
                
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
                        marginTop: 10,
                        alignSelf: "center",
                        paddingLeft: 15                        
                    }}></TextInput>
                <Text
                    style={{
                        width: 280,
                        alignSelf: "center",
                        paddingLeft: 5,
                        color: "red",
                        marginBottom: 20
                    }}>{this.state.city == "" ? "Required" : ""}</Text>

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
                        marginTop: 10,
                        alignSelf: "center",
                        paddingLeft: 15                        
                    }}></TextInput>
                <Text
                    style={{
                        width: 280,
                        alignSelf: "center",
                        paddingLeft: 5,
                        color: "red",
                        marginBottom: 20
                    }}>{this.state.state == "" ? "Required" : ""}</Text>

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
                        marginTop: 10,
                        alignSelf: "center",
                        paddingLeft: 15                        
                    }}></TextInput>
                <Text
                    style={{
                        width: 280,
                        alignSelf: "center",
                        paddingLeft: 5,
                        color: "red",
                        marginBottom: 20
                    }}>{this.state.zipCode == "" ? "Required" : ""}</Text>

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
                        marginTop: 10,
                        alignSelf: "center",
                        paddingLeft: 15                        
                    }}></TextInput>
                <Text
                    style={{
                        width: 280,
                        alignSelf: "center",
                        paddingLeft: 5,
                        color: "red",
                        marginBottom: 20
                    }}>{this.state.email == "" ? "Required" : ""}</Text>

                <TextInput
                    onChangeText={this.handleMobileNumber}
                    value={this.state.mobileNumber}
                    placeholder="1+ (999) 999 - 9999"
                    style={{
                        borderBottomColor: "black",
                        borderWidth: 1,
                        borderRadius: 4,
                        width: 280,
                        height: 40,
                        marginTop: 10,
                        alignSelf: "center",
                        paddingLeft: 15                        
                    }}
                    keyboardType="phone-pad"
                    dataDetectorTypes="phoneNumber"></TextInput>
                <Text
                    style={{
                        width: 280,
                        alignSelf: "center",
                        paddingLeft: 5,
                        color: "red",
                        marginBottom: 20
                    }}>{this.state.mobileNumber == "" ? "Required" : ""}</Text>

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
                        marginTop: 10,
                        alignSelf: "center",
                        paddingLeft: 15                        
                    }}></TextInput>
                <Text
                    style={{
                        width: 280,
                        alignSelf: "center",
                        paddingLeft: 5,
                        color: "red",
                    }}>{this.state.password == "" ? "Required" : ""}</Text>     
                <View
                    style={{
                        width: 280,
                        alignSelf: "center",
                        padding: 5,
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: "lightgrey",
                        borderRadius: 4
                    }}>{this.validatePassword(this.state.password)}</View>    

                <TextInput
                    secureTextEntry={true}
                    value={this.state.confirmPassword}
                    onChangeText={this.handleConfirmPassword}
                    placeholder="Confirm password"
                    style={{
                        borderBottomColor: "black",
                        borderWidth: 1,
                        borderRadius: 4,
                        width: 280,
                        height: 40,
                        marginTop: 10,
                        alignSelf: "center",
                        paddingLeft: 15                        
                    }}></TextInput> 
                {this.confirmPassword(this.state.password)}  
                <Text
                    style={{
                        width: 280,
                        alignSelf: "center",
                        paddingLeft: 5,
                        color: "red",
                    }}>{this.state.confirmPassword == "" ? "Required" : ""}</Text>    

                <Text
                    style={{
                        textAlign: "center",
                        marginVertical: 15
                    }}>{this.state.error ? this.state.error : ""}</Text>

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