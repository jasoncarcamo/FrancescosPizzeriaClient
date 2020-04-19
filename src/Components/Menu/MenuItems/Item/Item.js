import React from "react";
import {View, Text, Button, TextInput} from "react-native";
import AppContext from "../../../../Services/Context/AppContext/AppContext";
import UserToken from "../../../../Services/UserToken/UserToken";

export default class Item extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: {},
            order: false,
            orderOption: {},
            specialRequests: "",
            setSize: "",
            quantity: 1,
            confirmAdd: false,
            error: ""
        }
    }

    static contextType = AppContext;

    componentDidMount(){
        this.setState({
            item: this.props.item,
            orderOption: this.props.item
        });
    }

    setPrice = (size, price)=>{
        this.setState({
            setSize: size,
            order: true
        });
    }

    displayItem = ()=>{
        return (
            <>
                <Text>{this.props.item.title}</Text>

                <Text>{this.props.item.description}</Text>

                <Text>{this.props.item.ingredients}</Text>

                <View 
                    style={{
                        flexDirection: "row"
                    }}>
                    <Button
                        title={`Regular: ${this.props.item.priceReg}`}
                        onPress={(price)=>this.setPrice("priceReg", this.props.item.priceReg)}></Button>
                    
                    {this.props.item.priceSmall !== 0 ? <Button
                        title={`Small: ${this.props.item.priceSmall}`}
                        onPress={( price)=>this.setPrice("priceSmall", this.props.item.priceSmall)}></Button> : <View></View>}
                </View>
            </>
        );
    }

    confirmAdd = ()=>{
        return (
            <View>
                <Text>Item successfully added</Text>

                <Button
                    title="Thanks"
                    onPress={this.resetItem}></Button>
            </View>
        );
    }

    addItem = ()=>{

        

        UserToken.hasToken()
            .then( token => {
                console.log(this.context);
                if(!token){
                    this.props.navigation.navigate("Log in");
                } else{
                    this.context.orderContext.setOrderItem("POST", this.state.setSize, this.state.quantity, this.state.orderOption)
                        .then( data => {
                            console.log(data);
                            this.setState({
                                confirmAdd: true
                            })
                        })
                        .catch( err => this.setState({ error: err.error}))
                };                
            });
    }

    setRequest = (text)=>{
        let item = this.state.orderOption;

        item.specialRequests = text;

        this.setState({
            orderOption: item
        });
    }

    resetItem = ()=>{
        this.setState({
            setSize: "",
            order: false,
            quantity: 1,
            confirmAdd: false,
            item: this.props,
            orderOption: this.props.item
        });
    }

    addQuantity =()=>{
        this.setState({
            quantity: ++this.state.quantity
        });
    }

    subtractQuantity = ()=>{
        let quantity = this.state.quantity;

        quantity = --quantity;

        if(quantity < 1){
            quantity = 1;
        };

        this.setState({
            quantity
        });
    }

    orderItem = ()=>{
        return (
            <View>

                <Text>{this.props.item.title}</Text>

                <Text>{this.props.item.description}</Text>

                <Text>{this.props.item.ingredients}</Text>

                <View
                    style={{
                        flexDirection: "row"
                    }}>
                    <Button
                        title="-"
                        onPress={this.subtractQuantity}></Button>

                    <Text>{this.state.quantity}</Text>

                    <Button
                        title="+"
                        onPress={this.addQuantity}></Button>
                </View>

                <TextInput
                    multiline={true}
                    style={{
                        width: "100%",
                        height: "5em"
                    }}
                    value={this.state.orderOption.specialRequests || ""}
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
                        onPress={this.resetItem}></Button>
                </View>
            </View>
        )
    }

    render(){
        console.log(this.state)
        console.log(this.props.item)
        return(
            <View>
                {!this.state.order ? this.displayItem() : <View></View>}

                {this.state.order && !this.state.confirmAdd ? this.orderItem() : <View></View>}

                {this.state.confirmAdd ? this.confirmAdd() : <View></View>}
            </View>
        )
    }
} 