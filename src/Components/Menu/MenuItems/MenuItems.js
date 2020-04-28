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
            <View
                style={{
                    marginVertical: 25,
                }}>

                <View
                    style={{
                        marginVertical: 20
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: "center"
                        }}>Pizza</Text>

                    <Button
                        title="View all pizza pies"
                        onPress={this.viewPizzas}></Button>
                </View>

                <View
                    style={{
                        marginVertical: 20
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: "center"
                        }}>Pastas</Text>

                    <Button
                        title="View all pasta"
                        onPress={this.viewPastas}></Button>
                </View>

                <View
                    style={{
                        marginVertical: 20
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: "center"
                        }}>Heros</Text>
                        
                    <Button
                        title="View all heroes"
                        onPress={this.viewHeroes}></Button>
                </View>
            </View>
        )
    }
}