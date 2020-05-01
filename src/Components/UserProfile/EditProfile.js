import React from "react";
import {ScrollView, Text, Button, TouchableOpacity, TextInput} from "react-native";
import AppContext from "../../Services/Context/AppContext/AppContext";
import UserToken from "../../Services/UserToken/UserToken";

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

    handleEdit = ()=>{

        const {
            firstName,
            lastName,
            address,
            city,
            state,
            zipCode,
            email,
            mobileNumber
        } = this.state;
        
        const updateUser = {
            firstName,
            lastName,
            address,
            city,
            state,
            zipCode,
            email,
            mobileNumber
        };

        for( const key of Object.keys(updateUser)){

            if(updateUser[key] == ""){
                delete updateUser[key];
            };
        };

        UserToken.getToken()
            .then( token => {

                fetch(`http://localhost:8000/api/users/${this.state.user.id}`, {
                    method: "PATCH", 
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${token}`
                    },
                    body: JSON.stringify(updateUser)
                })
                    .then( res => {

                        if(!res.ok){

                            return res.json().then( e => Promise.reject(e));
                        };

                        return res.json();
                    })
                    .then( resData => {
                        
                        this.context.userContext.refreshUserContext()
                            .then( refreshed => {
                                this.props.navigation.navigate("Profile");
                            })
                    })
                    .catch( err => this.setState({ error: err.error }));
            });
    }

    render(){
        console.log(this.state)
        return (
            <ScrollView>

                <Text
                    style={{
                        textAlign: "center",
                        marginVertical: 25,
                        fontSize: 25
                    }}>Edit account</Text>

                <TextInput
                    onChangeText={this.handleFirstName}
                    defaultValue={this.state.user.firstName}
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
                    defaultValue={this.state.user.lastName}
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
                    defaultValue={this.state.user.address}
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
                    defaultValue={this.state.user.city}
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
                    defaultValue={this.state.user.state}
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
                    defaultValue={this.state.user.zipCode}
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
                    defaultValue={this.state.user.email}
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
                    defaultValue={this.state.user.mobileNumber}
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
                    }}
                    keyboardType="phone-pad"
                    dataDetectorTypes="phoneNumber"></TextInput>

                <Text
                    style={{
                        textAlign: "center"
                    }}>{this.state.error ? this.state.error : ""}</Text>

                <TouchableOpacity
                    style={{
                        width: 100,
                        backgroundColor: "skyblue",
                        padding: 0,
                        marginVertical: 20,
                        alignSelf: "center"
                    }}
                    onPress={this.handleEdit}
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