import React from "react";
import {View, Text, Button, TextInput, TouchableOpacity} from "react-native";
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
            <View
                style={{
                    marginVertical: 20
                }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>{this.props.item.title}</Text>

                <Text
                    style={{
                        textAlign: "center"
                    }}>Description: {this.props.item.description}</Text>

                <Text
                    style={{
                        textAlign: "center"
                    }}>Ingredients: {this.props.item.ingredients}</Text>

                <View 
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        marginVertical: 20,
                        alignSelf: "center"
                    }}>

                    <TouchableOpacity
                        onPress={(price)=>this.setPrice("priceReg", this.props.item.priceReg)}
                        style={{
                            backgroundColor: "skyblue",
                            color: "white",
                            padding: 0,
                            marginHorizontal: 10,
                            borderRadius: 3
                        }}>
                            <Text
                                style={{
                                    color: "white",
                                    paddingHorizontal: 12,
                                    paddingVertical: 12,
                                    margin: 0
                                }}>{`Regular: ${this.props.item.priceReg}`}</Text>
                        </TouchableOpacity>
                    
                    {this.props.item.priceSmall !== "0.00" ? <TouchableOpacity  style={{
                            backgroundColor: "skyblue",
                            color: "white",
                            marginHorizontal: 10,
                            padding: 0,
                            borderRadius: 3
                        }}
                        onPress={( price)=>this.setPrice("priceSmall", this.props.item.priceSmall)}>
                            <Text
                                style={{
                                    color: "white",
                                    paddingHorizontal: 12,
                                    paddingVertical: 12,
                                    margin: 0
                                }}>{`Small: ${this.props.item.priceSmall}`}</Text>
                        </TouchableOpacity> : <View></View>}
                </View>
            </View>
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

                if(!token){
                    this.props.navigation.navigate("Log in");
                } else{

                    if(!this.context.orderContext.isOrdering){

                        this.props.navigation.navigate("Order");

                        return;
                    }

                    this.context.orderContext.setOrderItem("POST", this.state.setSize, this.state.quantity, this.state.orderOption)
                        .then( data => {
                            this.setState({
                                confirmAdd: true
                            });
                        })
                        .catch( err => this.setState({ error: err.error}));
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
            <View
                style={{
                    marginVertical: 20
                }}>

                <Text 
                    style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>{this.props.item.title}</Text>

                <Text
                    style={{
                        textAlign: "center"
                    }}>Description: {this.props.item.description}</Text>

                <Text
                    style={{
                        textAlign: "center"
                    }}>Ingredients: {this.props.item.ingredients}</Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignSelf: "center",
                        marginVertical: 10
                    }}>
                    <Button
                        title="-"
                        onPress={this.subtractQuantity}></Button>

                    <Text
                        style={{
                            marginHorizontal: 15,
                            paddingVertical: 10
                        }}>{this.state.quantity}</Text>

                    <Button
                        title="+"
                        onPress={this.addQuantity}></Button>
                </View>

                <TextInput
                    multiline={true}
                    style={{
                        width: "100%",
                        height: 125,
                        borderWidth: 1,
                        borderColor: "grey"
                    }}
                    value={this.state.orderOption.specialRequests || ""}
                    onChangeText={this.setRequest}
                    placeholder="Special requests"></TextInput>
                
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignSelf: "center",
                        marginVertical: 20
                    }}>
                    
                    <TouchableOpacity
                        onPress={this.addItem}
                        style={{
                            backgroundColor: "skyblue",
                            color: "white",
                            padding: 0,
                            marginHorizontal: 10,
                            borderRadius: 3
                        }}>
                                <Text
                                    style={{
                                        color: "white",
                                        paddingHorizontal: 12,
                                        paddingVertical: 12,
                                        margin: 0
                                    }}>Add to cart</Text>
                        </TouchableOpacity>

                    <TouchableOpacity
                        title="Cancel"
                        onPress={this.resetItem}
                        style={{
                            backgroundColor: "skyblue",
                            color: "white",
                            padding: 0,
                            marginHorizontal: 10,
                            borderRadius: 3
                        }}>
                            <Text
                                style={{
                                    color: "white",
                                    paddingHorizontal: 12,
                                    paddingVertical: 12,
                                    margin: 0
                                }}>Cancel</Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }

    render(){
        return(
            <View
                style={{
                    marginVertical: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgrey"
                }}>
                {!this.state.order ? this.displayItem() : <View></View>}

                {this.state.order && !this.state.confirmAdd ? this.orderItem() : <View></View>}

                {this.state.confirmAdd ? this.confirmAdd() : <View></View>}
            </View>
        )
    }
} 