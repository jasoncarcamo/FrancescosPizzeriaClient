import React, { Component } from "react";
import {Text, View, Button} from "react-native";

export default class MenuItems extends React.Component{

    viewPizzas = ()=>{
        this.props.navigation.navigate("Pizza items");
    }

    viewPastas = ()=>{
        this.props.navigation.navigate("Pasta items");
    };

    viewHeroes = ()=>{
        this.props.navigation.navigate("Hero items");
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

                <View>
                    <Text>Pastas</Text>
                    <Button
                        title="View all pasta"
                        onPress={this.viewPastas}></Button>
                </View>

                <View>
                    <Text>Heros</Text>
                    <Button
                        title="View all heroes"
                        onPress={this.viewHeroes}></Button>
                </View>
            </View>
        )
    }
}