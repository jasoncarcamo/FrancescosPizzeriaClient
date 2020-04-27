import React from "react";
import {View, Text, Button, TextInput} from "react-native";
import AppContext from "../../../../Services/Context/AppContext/AppContext";

import DateTimePicker from "@react-native-community/datetimepicker";

export default class DeliveryOptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderType: "Delivery",
            date: new Date(),
            showDate: false,
            time: new Date(),
            showTime: false,
            address: "",
            mobileNumber: "",
            setOptions: false,
            confirmOptions: false
        }
    }

    static contextType = AppContext;
    
    asapDelivery = ()=>{
        const asapDelivery = {
            orderType: this.state.orderType,
            time: this.state.time,
            address: this.state.address,
            mobileNumber: this.state.mobileNumber,
            orderComplete: false
        };

        this.context.orderContext.setOrderType(asapDelivery)
            .then( orderSet => {
                this.context.orderContext.refreshItem()
                    .then( refreshed => {
                        this.props.navigation.navigate("Menu");
                    })
            })
            .catch( err => this.setState({ error: err.error}));

    }

    setAddress = (text)=>{
        this.setState({
            address: text
        });
    }

    setMobile = (text)=>{
        this.setState({
            mobileNumber: text
        });
    }

    setDate = ( event, date)=>{

        if(!date){

            return;
        }

        this.setState({
            date,
            showDate: false
        });
    }

    setTime = ( event, time)=>{

        if(!time){

            return;
        }

        this.setState({
            time,
            showTime: false
        });
    }

    showDate = ()=>{
        return (
            <View>
                {this.state.showDate ? <DateTimePicker value={this.state.date} onChange={this.setDate} mode="date" display="default"/> : <View></View>}
                <Text>Date: {new Date(this.state.date).toDateString()}</Text>
                <Button
                    title="Set date"
                    onPress={()=>this.setState({ showDate: true, showTime: false})}></Button>
            </View>
        )
    }

    getTime = (date)=>{
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        
        return strTime;
    }

    showTime = ()=>{
        return (
            <View>
                {this.state.showTime ? <DateTimePicker value={this.state.time} onChange={this.setTime} mode="time" display="spinner"/> : <View></View>}
                <Text>Time: {this.getTime(new Date(this.state.time))}</Text>
                <Button
                    title="Set time"
                    onPress={()=>this.setState({ showTime: true, showDate: false})}></Button>
            </View>
        )
    }

    renderOrderTime = ()=>{
        return (
            <>
                <Button
                    title="ASAP"
                    onPress={()=>this.setState({ 
                        setOptions: true
                    })}></Button>

                <Button
                    title="Later"
                    onPress={()=>this.setState({
                        setOptions: true
                    })}></Button>
            </>
        )
    }

    setUserOptions = ()=>{
        return (
            <View>
                {this.showDate()}

                {this.showTime()}

                <TextInput
                    placeholder="Address"
                    value={this.state.address}
                    onChangeText={this.setAddress}
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
                    placeholder="Mobile number"
                    value={this.state.mobileNumber}
                    onChangeText={this.setMobile}
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
                    title="Yes"
                    onPress={this.asapDelivery}></Button>
                
                <Button
                    title="Edit address"
                    onPress={()=>this.setState({setOptions: true, confirmOptions: false})}></Button>
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