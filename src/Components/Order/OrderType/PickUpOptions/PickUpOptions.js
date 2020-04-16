import React from "react";
import {Text, View, Button} from "react-native";
import AppContext from "../../../../Services/Context/AppContext/AppContext";

export default class PickUpOptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderType: "Pick up",
            time: "",
            address: "",
            mobileNumber: ""
        }
    }

    static contextType = AppContext;

    render(){

        return (
            <View>
                <Text>Pick up</Text>

                <Button
                    title="ASAP"></Button>

                <Button
                    title="Later"></Button>                
            </View>
        )
    }
}