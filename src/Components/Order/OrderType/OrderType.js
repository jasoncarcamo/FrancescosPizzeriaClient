import React from "react";
import {Text, View, Button} from "react-native";

export default class OrderType extends React.Component{
    render(){
        return (
            <View>
                <Text>Order type</Text>

                <Button
                    title="Pick up"></Button>
                
                <Button
                    title="Delivery"></Button>
            </View>
        )
    }
}