import React, { Component } from "react";
import {Text, View, Button} from "react-native";

export default class MenuItems extends React.Component{

    viewPizzas = ()=>{
        this.props.navigation.navigate("Pizza items");
    }

    render(){

        return(
            <View>
                <View>
                    <Text>Pizza</Text>
                    <Button
                        title="View all pizza pies"
                        onPress={this.viewPizzas}></Button>
                </View>
            </View>
        )
    }
}