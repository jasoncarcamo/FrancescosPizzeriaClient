import React from "react";
import {Text, View, Button, ImageBackground, TouchableOpacity} from "react-native";

export default class OrderType extends React.Component{
    render(){
        return (
            <View
                style={{
                    padding: 0,
                    margin: 0,
                    height: "100vh"
                }}>

                <ImageBackground
                    source={{
                        uri: "https://slicelife.imgix.net/stock_photos/pw_v2/desktop/img-home.png?auto=compress&w=1440"
                    }}
                    style={{
                        flex: 1,
                        width: "100%",
                        maxHeight: 500,
                        margin: 0,
                        padding: 0,
                        
                    }}>

                    <Text 
                    style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        position: "absolute",
                        top: "30%",
                        transform: [{ translateY: "-30%"}],
                        alignSelf: "center",
                        width: 300,
                        textAlign: "center",
                        color: "white"
                    }}>Order type</Text>

                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate("Pick up time")}
                        style={{
                            marginVertical: 20,
                            backgroundColor: "skyblue",
                            width: 115,
                            alignSelf: "center",
                            position: "absolute",
                            top: "40%",
                            transform: [{ translateY: "-40%"}],
                        
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
                            marginVertical: 25,
                            backgroundColor: "skyblue",
                            width: 115,
                            alignSelf: "center",
                            position: "absolute",
                            top: "55%",
                            transform: [{ translateY: "-55%"}],
                            
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
        )
    }
}