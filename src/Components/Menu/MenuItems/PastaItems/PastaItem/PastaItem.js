import React from "react";
import {View, Text, Button} from "react-native";

export default class PastaItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: this.props.item
        }
    }

    render(){

        return (
            <View>
                <Text>Pasta item</Text>
            </View>
        )
    }
}