import React from "react";
import {View, Button, Text} from "react-native";

export default class MenuIcon extends React.Component{

    render(){

        return (
            <Text
                onPress={()=> this.props.navigation.openDrawer()}
                style={{
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                    width: 100,
                    height: 20,
                    marginHorizontal: 20,
                    fontSize: 2
            }}>

                    <Text
                        style={{
                            fontSize: 2,
                            width: 25,
                            height: 4,
                            backgroundColor: "black",
                        }}
                        >qwwqqwqw</Text>

                    <Text
                        style={{
                            fontSize: 2,
                            width: 25,
                            height: 4,
                            marginVertical: 4,
                            backgroundColor: "black",
                        }}
                        >eqweqe</Text>
                    
                    <Text
                        style={{
                            fontSize: 2,
                            width: 25,
                            height: 4,
                            marginTop: 0,
                            backgroundColor: "black",
                        }}
                        >jgfsdvfghvhdfvghvfdvd</Text>
            </Text>
        );
    };
};