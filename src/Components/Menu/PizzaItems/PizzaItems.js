import React from "react";
import {View, Button, Text} from "react-native";
import AppContext from "../../../Services/Context/AppContext/AppContext";

import PizzaItem from "./PizzaItem/PizzaItem";

export default class PizzaItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            itemType: "Pizza"
        }
    }

    static contextType = AppContext;

    renderPizzaItems = ()=>{
        let items = this.context.menuContext.menuItems;

        items = items.map( (item, index) => {
            
            console.log(item)

            if(item.category == this.state.itemType){

                return <PizzaItem key={index} item={item}/>;
            }
        });

        return items;

    }

    render(){

        return (
            <View>
                {this.renderPizzaItems()}
            </View>
        )
    }
}