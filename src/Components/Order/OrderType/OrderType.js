import React from "react";
import {Text, View, Button} from "react-native";

export default class OrderType extends React.Component{
    render(){
        return (
            <View>
                <Text>Order type</Text>

                <Button
                    title="Pick up"
                    onPress={()=> this.props.navigation.navigate("Pick up time")}></Button>
                
                <Button
                    title="Delivery"
                    onPress={this.props.navigation.navigate("Delivery time")}></Button>
            </View>
        )
    }
}