import React from "react";
import {View, Text} from "react-native";

export default class PizzaItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: this.props.item
        }
    }

    render(){
        
        return(
            <View>
                <Text>Pizza item</Text>
            </View>
        )
    }
} 