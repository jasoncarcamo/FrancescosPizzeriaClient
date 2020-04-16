import React from "react";
import {View, Text, Button} from "react-native";

export default class HeroItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: this.props.item
        }
    }

    render(){
        console.log(this.state)
        return (
            <View>
                <Text>Hero item</Text>
            </View>
        )
    }
}