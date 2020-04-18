import React from "react";
import {View, Text, Button, TextInput} from "react-native";

export default class PizzaItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: this.props.item,
            order: false
        }
    }

    displayItem = ()=>{
        return (
            <>
                <Text>{this.props.item.title}</Text>

                <Text>{this.props.item.description}</Text>

                <Text>{this.props.item.ingredients}</Text>

                <Text>{this.props.item.specialRequests}</Text>

                <Text>{this.props.item.sizeReg}</Text>

                <Text>{this.props.item.sizeSmall}</Text>

                <Text>{this.props.item.priceReg}</Text>

                <Text>{this.props.item.priceSmall}</Text>

                <View>
                    <Button
                        title={`Regular: ${this.props.item.priceReg}`}
                        onPress={()=> this.setState({ order: true})}></Button>
                    <Button
                        title={`Small: ${this.props.item.priceSmall}`}
                        onPress={()=> this.setState({ order: true})}></Button>
                </View>
            </>
        )
    }

    orderItem = ()=>{
        return (
            <View>

                <Text>{this.props.item.title}</Text>

                <Text>{this.props.item.description}</Text>

                <Text>{this.props.item.ingredients}</Text>

                <Text>{this.props.item.specialRequests}</Text>

                <TextInput
                    multiline={true}
                    style={{
                        width: "100%",
                        height: "5em"
                    }}
                    placeholder="Special requests"></TextInput>
                
                <Button
                    title="Add to cart"></Button>
            </View>
        )
    }

    render(){
        
        return(
            <View>
                {!this.state.order ? this.displayItem() : <View></View>}

                {this.state.order ? this.orderItem() : <View></View>}
            </View>
        )
    }
} 