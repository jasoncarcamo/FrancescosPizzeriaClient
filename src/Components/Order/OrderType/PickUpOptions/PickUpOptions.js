import React from "react";
import {Text, View, Button, TextInput} from "react-native";
import AppContext from "../../../../Services/Context/AppContext/AppContext";
import DateTimePicker from "@react-native-community/datetimepicker";

export default class PickUpOptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderType: "Pick up",
            date: new Date(),
            showDate: false,
            time: new Date(),
            showTime: false,
            address: "",
            mobileNumber: "",
            setOptions: false,
            confirmOptions: false
        };
    };

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

                <Text>Date: {this.state.date.toDateString()}</Text>
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
                {this.state.showTime ? <DateTimePicker is24Hour={false} value={this.state.time} onChange={this.setTime} mode="time" display="spinner"/> : <View></View>}

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
                        setOptions: true,
                    })}></Button>

                <Button
                    title="Later"
                    onPress={()=>this.setState({
                        setOptions: true,
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