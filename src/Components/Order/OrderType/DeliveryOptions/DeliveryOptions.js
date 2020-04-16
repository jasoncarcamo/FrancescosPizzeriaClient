import React from "react";
import {View, Text, Button} from "react-native";
import AppContext from "../../../../Services/Context/AppContext/AppContext";

export default class DeliveryOptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    static contextType = AppContext;

    asapDelivery = ()=>{
        this.context.orderContext.setOrderType("Delivery", "ASAP");
    }

    render(){

        return (
            <View>

                <Text>Delivery</Text>

                <Button
                    title="ASAP"
                    onPress={this.asapDelivery}></Button>

                <Button
                    title="Later"></Button>
            </View>
        )
    }
} 