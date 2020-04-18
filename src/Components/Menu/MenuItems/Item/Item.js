import React from "react";
import {View, Text, Button, TextInput} from "react-native";
import AppContext from "../../../../Services/Context/AppContext/AppContext";

export default class PizzaItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: this.props.item,
            order: false,
            orderOption: this.props.item,
            specialRequests: ""
        }
    }

    static contextType = AppContext;

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

                <View 
                    style={{
                        flexDirection: "row"
                    }}>
                    <Button
                        title={`Regular: ${this.props.item.priceReg}`}
                        onPress={()=> this.setState({ order: true})}></Button>
                    
                    {this.props.item.priceSmall !== 0 ? <Button
                        title={`Small: ${this.props.item.priceSmall}`}
                        onPress={()=> this.setState({ order: true})}></Button> : <View></View>}
                </View>
            </>
        )
    }

    addItem = ()=>{
        this.context.orderContext.setOrderItem("POST", this.state.item);
    }

    setRequest = (text)=>{
        const item = this.state.item;

        item.specialRequests = text;

        this.setState({
            item
        });
    }

    orderItem = ()=>{
        return (
            <View>

                <Text>{this.props.item.title}</Text>

                <Text>{this.props.item.description}</Text>

                <Text>{this.props.item.ingredients}</Text>

                <TextInput
                    multiline={true}
                    style={{
                        width: "100%",
                        height: "5em"
                    }}
                    value={this.state.item.specialRequests}
                    onChangeText={this.setRequest}
                    placeholder="Special requests"></TextInput>
                
                <View
                    style={{
                        flexDirection: "row"
                    }}>
                    
                    <Button
                        title="Add to cart"
                        onPress={this.addItem}></Button>

                    <Button
                        title="Cancel"
                        onPress={()=>this.setState({ order: false})}></Button>
                </View>
            </View>
        )
    }

    render(){
        console.log(this.state)
        return(
            <View>
                {!this.state.order ? this.displayItem() : <View></View>}

                {this.state.order ? this.orderItem() : <View></View>}
            </View>
        )
    }
} 