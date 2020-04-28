import React from "react";
import {Button} from "react-native";
import AppContext from "../../../Services/Context/AppContext/AppContext";

export default class CartAmount extends React.Component{

    static contextType = AppContext;

    render(){

        return <Button 
            title={this.context.orderContext.orderItems.length.toString()}
            onPress={()=> {}}></Button>;
    }
}