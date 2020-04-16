import React from "react";
import {Text, View, Button} from "react-native";
import OrderContext from "../../../../Services/Context/OrderContext/OrderContext";

export default class PickUpOptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    static contextType = OrderContext;

    render(){

        return (
            <View>
                <Text>ASAP</Text>

                <Button
                    title="ASAP"></Button>

                <Button
                    title="Later"></Button>                
            </View>
        )
    }
}