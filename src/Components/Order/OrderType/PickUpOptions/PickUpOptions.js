import React from "react";
import {Text, View, Button, TextInput} from "react-native";
import AppContext from "../../../../Services/Context/AppContext/AppContext";

export default class PickUpOptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderType: "Pick up",
            time: "",
            address: "",
            mobileNumber: "",
            setOptions: false,
            confirmOptions: false
        }
    }

    static contextType = AppContext;
    
    asapPickUp = ()=>{
        const asapPickUp = {
            orderType: this.state.orderType,
            time: this.state.time,
            address: this.state.address,
            mobileNumber: this.state.mobileNumber
        };

        this.context.orderContext.setOrderType(asapPickUp);
    }

    renderOrderTime = ()=>{
        return (
            <>
                <Button
                    title="ASAP"
                    onPress={()=>this.setState({ 
                        setOptions: true,
                        time: "ASAP"
                    })}></Button>

                <Button
                    title="Later"
                    onPress={()=>this.setState({
                        setOptions: true,
                        time: "Later"
                    })}></Button>
            </>
        )
    }

    setUserOptions = ()=>{
        return (
            <View>
                <TextInput
                    placeholder="Time"
                    value={this.state.time}></TextInput>
                <TextInput
                    placeholder="Address"></TextInput>
                <TextInput
                    placeholder="Mobile number"></TextInput>
                
                <Button
                    title="Ok"
                    onPress={()=>this.setState({
                        setOptions: false,
                        confirmOptions: true
                    })}></Button>
            </View>
        )
    }

    renderConfirmOptions = ()=>{
        return (
            <View>
                <Text>Is the address: {this.state.address} correct?</Text>
                
                <Button
                    title="Yes"></Button>
                
                <Button
                    title="Edit address"></Button>
            </View>
        )
    }

    render(){

        return (
            <View>

                {!this.state.setOptions && !this.state.confirmOptions ? this.renderOrderTime() : <View></View>}

                {this.state.setOptions ? this.setUserOptions() : <View></View>}

                {this.state.confirmOptions ? this.renderConfirmOptions() : <View></View>}
            </View>
        )
    }
}