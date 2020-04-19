import React from "react";
import {View, Text, Button} from "react-native";
import AppContext from "../../../../Services/Context/AppContext/AppContext";

import Item from "../Item/Item";

export default class HeroItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            itemType: "Hero"
        }
    }

    static contextType = AppContext;

    renderHeroes = ()=>{
        let items = this.context.menuContext.menuItems;

        items = items.map( (item, index) => {
            
            if(item.category === this.state.itemType){

                return <Item key={index} item={item} navigation={this.props.navigation}/>;
            }
        });

        return items;
    }

    render(){

        return (
            <View>
                {this.renderHeroes()}
            </View>
        )
    }
}