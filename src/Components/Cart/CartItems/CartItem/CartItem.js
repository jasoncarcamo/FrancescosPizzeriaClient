import React from "react";
import {View, Button, Text, TextInput, TouchableOpacity} from "react-native";
import AppContext from "../../../../Services/Context/AppContext/AppContext";

export default class CartItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: {},
            edit: false,
            quantity: "",
            size: "",
            confirmDelete: false,
            error: ""
        }
    }

    static contextType = AppContext;

    componentDidMount(){

        this.setState({
            item: this.props.item,
            size: this.getSize(),
            quantity: this.props.item.quantity
        });
    }

    componentWillUnmount(){
        this.setState({
            item: {},
            edit: false,
            quantity: "",
            size: "",
            confirmDelete: false,
            error: ""
        });
    }

    getSize = ()=>{
        let item = this.props.item;
        let size;

        if(item.priceReg === 0){
            size = "priceSmall";
        } else if(item.priceSmall === 0){
            size = "priceReg";
        }

        return size;
    }

    handleDelete = ()=>{
        this.context.orderContext.removeItem(this.context.orderContext.orderItems[this.props.index].id)
            .then( deleted => {
                
                this.context.orderContext.refreshItem()
                    .then( refreshed => {
                        this.props.showCheckout();
                        this.setState({
                            confirmDelete: false
                        })
                    });
            })
            .catch( err => this.setState({ error: err.error}))
    }

    confirmDelete = ()=>{
        return (
            <>
                <Text
                        style={{
                            textAlign: "center"
                        }}>Are you sure?</Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignSelf: "center",
                        marginVertical: 20
                    }}>

                    <TouchableOpacity
                        onPress={this.handleDelete}
                        style={{
                            backgroundColor: "skyblue",
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
                                }}>Yes</Text>
                        </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=> {
                            this.props.showCheckout();
                            this.setState({ confirmDelete: false});
                        }}
                        style={{
                            backgroundColor: "skyblue",
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
            </>
        )
    }

    renderOptions = ()=>{
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignSelf: "center",
                    marginVertical: 20
                }}>

                <TouchableOpacity
                    onPress={()=>{
                        this.props.showCheckout();
                        this.setState({ edit: true})
                    }}
                    style={{
                        backgroundColor: "skyblue",
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
                            }}>Edit item</Text>
                    </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=> {
                        this.props.showCheckout();
                        this.setState({ confirmDelete: true});
                    }}
                    style={{
                        backgroundColor: "skyblue",
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
                            }}>Remove item</Text>
                    </TouchableOpacity>
            </View>
        )
    }

    displayItem = ()=>{

        return (
            <View>
                <Text 
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>{this.props.item.title}</Text>

                <Text
                    style={{
                        textAlign: "center"
                    }}><Text style={{
                        fontWeight: "bold"
                    }}>Description:</Text> {this.props.item.description}</Text>

                <Text
                    style={{
                        textAlign: "center"
                    }}><Text style={{
                        fontWeight: "bold"
                    }}>Ingredients:</Text> {this.props.item.ingredients}</Text>

                <Text
                    style={{
                        textAlign: "center"
                    }}><Text style={{
                        fontWeight: "bold"
                    }}>Special requests:</Text> {this.props.item.specialRequests}</Text>

                <Text
                    style={{
                        textAlign: "center"
                    }}><Text style={{
                        fontWeight: "bold"
                    }}>Quantity:</Text> {this.props.item.quantity}</Text>

                {!this.state.edit & !this.state.confirmDelete ? this.renderOptions() : <View></View>}

                {this.state.confirmDelete ? this.confirmDelete() : <View></View>}

                {this.state.edit ? this.editItem() : <View></View>}
            </View>
        )
    }

    handelSpecialRequests = (text)=>{
        const item = this.state.item;

        item.specialRequests = text;

        this.setState({
            item
        });
    }

    cancelEdit = ()=>{
        this.context.orderContext.refreshItem()
            .then( refreshed => {

                this.props.showCheckout();
                this.setState({
                    quantity: this.props.item.quantity,
                    edit: false,
                    item: this.props.item
                });

                this.componentDidMount();
            });
    }

    addQuantity = ()=>{
        let quantity = this.state.quantity;

        quantity = ++quantity;

        this.setState({
            quantity: quantity
        });
    }

    subtractQuantity = ()=>{
        let quantity = this.state.quantity;

        quantity = --quantity;

        if(quantity < 1){
            quantity = 1;
        };

        quantity = quantity;

        this.setState({
            quantity
        });
    }

    updateItem =()=>{
        this.context.orderContext.setOrderItem("PATCH", this.state.size, this.state.quantity, this.state.item)  
            .then( data => {
                this.context.orderContext.refreshItem()
                    .then( refreshed => {
                        
                        this.props.showCheckout();
                        this.setState({
                            edit: false
                        });
                    })
            })
            .catch( err => this.setState({ error: err.error}));
    }

    editItem = ()=>{
        return (
            <>
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
                    value={this.state.item.specialRequests} 
                    onChangeText={this.handelSpecialRequests}
                    style={{
                        width: "100%",
                        height: 125,
                        borderWidth: 1,
                        borderColor: "grey",
                        paddingTop: 10,
                        paddingLeft: 10
                    }}></TextInput>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignSelf: "center",
                        marginVertical: 20
                    }}>

                    <TouchableOpacity
                        onPress={this.updateItem}
                        style={{
                            backgroundColor: "skyblue",
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
                                }}>Confirm</Text>
                        </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={this.cancelEdit}
                        style={{
                            backgroundColor: "skyblue",
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
            </>
        )
    }

    render(){

        return (
            <View
                style={{
                    marginVertical: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgrey"
                }}>
                {this.displayItem()}
            </View>
        )
    }
}