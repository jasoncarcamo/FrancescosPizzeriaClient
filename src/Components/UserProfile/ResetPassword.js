import React from "react";
import {View, Button, Text, TextInput, TouchableOpacity} from "react-native";
import AppContext from "../../Services/Context/AppContext/AppContext";
import UserToken from "../../Services/UserToken/UserToken";

export default class ResetPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            resetPassword: false,
            confirmCurrentPassword: false,
            currentPassword: "",
            changeSuccess: false,
            error: ""
        }
    }

    static contextType = AppContext;

    formatMobileNumber = (phoneNumberString)=> {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

        if (match) {
            return '1+ (' + match[1] + ') ' + match[2] + '-' + match[3]
        };

        return "";
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

    handlePassword = (text) => {
        this.setState({
            password: text
        });
    }

    handleConfirmPassword = (text) => {
        this.setState({
            confirmPassword: text
        })
    }

    handleEditPassword = ()=>{

        if(!this.state.currentPassword){

            this.setState({
                error: "You must enter your current password."
            });

            return;
        }
        UserToken.getToken()
            .then( token => {

                fetch(`https://vast-escarpment-62007.herokuapp.com/api/login`, {
                    method: "POST",
                    headers: {
                        'content-type': "application/json"
                    },
                    body: JSON.stringify({
                        email: this.context.userContext.user.email,
                        password: this.state.currentPassword
                    })
                })
                    .then( res => {
                        if(!res.ok){

                            return res.json().then( e => Promise.reject(e));
                        };

                        return res.json();
                    })
                    .then( resData => {
                        
                        fetch(`https://vast-escarpment-62007.herokuapp.com/api/users/${this.props.id}`, {
                            method: "PATCH",
                            headers: {
                                'content-type': "application/json",
                                'authorization': `bearer ${token}`
                            },
                            body: JSON.stringify({
                                password: this.state.password
                            })
                        })
                            .then( updateRes => {

                                if(!updateRes.ok){

                                    return updateRes.json().then( e => Promise.reject(e));
                                };

                                return updateRes.json();
                            })
                            .then( updateData => {
                                this.setState({
                                    changeSuccess: true,
                                    resetPassword: false,
                                    confirmCurrentPassword: false,
                                    password: "",
                                    confirmPassword: "",
                                    currentPassword: "",
                                    error: ""
                                });
                            })
                            .catch( updateErr => this.setState({ error: updateErr.error}))
                    })
                    .catch( err => this.setState({ error: err.error }));
            })
    }

    renderNewPassword = ()=>{
        return (
            <View>
                <TextInput
                    onChangeText={this.handlePassword}
                    value={this.state.password}
                    placeholder="Enter new password"
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
                    placeholder="Confirm new password"
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

                <View
                    style={{
                        marginVertical: 20,
                        flexDirection: "row",
                        justifyContent: "space-evenly"
                    }}>
                    <TouchableOpacity
                        style={{
                            width: 125,
                            backgroundColor: "skyblue"
                        }}
                        onPress={()=> {
                            if(this.state.password && this.state.confirmPassword && this.state.password === this.state.confirmPassword){
                                this.setState({ resetPassword: false, confirmCurrentPassword: true});
                            };
                        }}>
                        <Text
                            style={{
                                paddingHorizontal: 12,
                                paddingVertical: 16,
                                textAlign: "center",
                                color: "white"
                            }}>Reset</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: 125,
                            backgroundColor: "skyblue"
                        }}
                        onPress={()=> this.setState({ resetPassword: false})}>
                        <Text
                            style={{
                                paddingHorizontal: 12,
                                paddingVertical: 16,
                                textAlign: "center",
                                color: "white"
                            }}>Cancel</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        )
    }

    handleCurrentPassword = (text)=> {
        this.setState({
            currentPassword: text
        });
    }

    finish = ()=>{

        this.context.userContext.refreshUserContext()
            .then( refreshed => {
                this.setState({
                    resetPassword: false, 
                    changeSuccess: false
                });
            });
    }

    renderSuccess = ()=>{
        return (
            <View>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 16
                    }}>Your password has changed successfully</Text>

                <TouchableOpacity
                        style={{
                            width: 125,
                            backgroundColor: "skyblue",alignSelf: "center",
                            marginVertical: 20,
                        }}
                        onPress={this.finish}>
                    <Text
                        style={{
                            paddingHorizontal: 12,
                            paddingVertical: 16,
                            textAlign: "center",
                            color: "white"
                        }}
                        onPress={this.finish}>Ok</Text>
                </TouchableOpacity>                
            </View>
        )
    }

    renderConfirmPassword = ()=>{
        return (
            <View>

                <Text
                    style={{
                        marginTop: 20,
                        marginBottom: 5,
                        textAlign: "center",
                        fontSize: 18
                    }}>Confirm your current password</Text>

                <TextInput
                    value={this.state.currentPassword}
                    secureTextEntry={true}
                    onChangeText={this.handleCurrentPassword}
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
                    placeholder="Password"></TextInput>

                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 16
                    }}>{this.state.error ? this.state.error : ""}</Text>

                <View
                    style={{
                        marginVertical: 20,
                        flexDirection: "row",
                        justifyContent: "space-evenly"
                    }}>

                    <TouchableOpacity
                        style={{
                            width: 125,
                            backgroundColor: "skyblue"
                        }}
                        onPress={this.handleEditPassword}>
                        <Text
                            style={{
                                paddingHorizontal: 12,
                                paddingVertical: 16,
                                textAlign: "center",
                                color: "white"
                            }}>Ok</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: 125,
                            backgroundColor: "skyblue"
                        }}
                        onPress={()=> this.setState({ resetPassword: false, confirmCurrentPassword: false})}>
                        <Text
                            style={{
                                paddingHorizontal: 12,
                                paddingVertical: 16,
                                textAlign: "center",
                                color: "white"
                            }}>Cancel</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        )
    }

    render(){
        return(
            <View
                style={{
                    marginVertical: 25
                }}>

                {this.state.resetPassword ? this.renderNewPassword() : <View></View>}

                {!this.state.resetPassword && !this.state.confirmCurrentPassword && !this.state.changeSuccess ? <Button title="Reset password" onPress={()=> this.setState({ resetPassword: true})}></Button> : <View></View>}

                {this.state.confirmCurrentPassword ? this.renderConfirmPassword() : <View></View>}

                {this.state.changeSuccess ? this.renderSuccess() : <View></View>}
            </View>
        );
    };
};