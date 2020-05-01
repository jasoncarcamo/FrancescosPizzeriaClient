import React from "react";
import {Text, View, Button, ImageBackground, TouchableOpacity, ScrollView} from "react-native";

export default class OrderType extends React.Component{
    render(){
        return (
            <ScrollView
                style={{
                    padding: 0,
                    margin: 0
                }}>

                <View
                    style={{
                        margin: 0,
                        padding: 0
                    }}>
                    <ImageBackground
                        source={{
                            uri: "https://slicelife.imgix.net/stock_photos/pw_v2/desktop/img-home.png?auto=compress&w=1440"
                        }}
                        style={{
                            flex: 1,
                            width: "100%",
                            maxHeight: 750,
                            margin: 0,
                            padding: 0,
                            
                        }}>

                        <Text 
                        style={{
                            fontSize: 32,
                            fontWeight: "bold",
                            marginVertical: 20,
                            alignSelf: "center",
                            width: 300,
                            textAlign: "center",
                            color: "white"
                        }}>Order type</Text>

                        <TouchableOpacity
                            onPress={()=> this.props.navigation.navigate("Pick up time")}
                            style={{
                                marginVertical: 25,
                                backgroundColor: "skyblue",
                                width: 115,
                                alignSelf: "center",
                                
                            }}>
                                <Text
                                    style={{
                                        color: "white",
                                        paddingHorizontal: 14,
                                        paddingVertical: 16,
                                        margin: 0,
                                        textAlign: "center"
                                    }}>Pick up</Text>
                            </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate("Delivery time")}
                            style={{
                                marginTop: 25,
                                marginBottom: 55,
                                backgroundColor: "skyblue",
                                width: 115,
                                alignSelf: "center",
                                
                            }}>
                                <Text
                                    style={{
                                        color: "white",
                                        paddingHorizontal: 14,
                                        paddingVertical: 16,
                                        margin: 0,
                                        textAlign: "center"
                                    }}>Delivery</Text>
                            </TouchableOpacity>
                    </ImageBackground>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        marginTop: 60
                    }}>

                    <View>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 24
                            }}>Open Hours</Text>
                        <Text
                            style={{
                                fontSize: 18
                            }}>11:00AM - 9:00PM</Text>
                    </View>

                    <View>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 22
                            }}>Delivery Hours</Text>
                        <Text
                            style={{
                                fontSize: 18
                            }}>11:00AM - 8:30PM</Text>
                    </View>
                </View>

            </ScrollView>
        )
    }
}