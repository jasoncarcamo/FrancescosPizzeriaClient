import React from "react";
import {View, Button, Text, TextInput} from "react-native";
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
            <View>
                <Text>Are you sure?</Text>
                <Button
                    title="Yes"
                    onPress={this.handleDelete}></Button>

                <Button
                    title="Cancel"
                    onPress={()=> {
                        this.props.showCheckout();
                        this.setState({ confirmDelete: false});
                    }}></Button>
            </View>
        )
    }

    renderOptions = ()=>{
        return (
            <View>

                <Button
                    title="Edit item"
                    onPress={()=>{
                        this.props.showCheckout();
                        this.setState({ edit: true})
                    }}></Button>

                <Button
                    title="Remove item"
                    onPress={()=> {
                        this.props.showCheckout();
                        this.setState({ confirmDelete: true});
                    }}></Button>
            </View>
        )
    }

    displayItem = ()=>{

        return (
            <View>
                <Text>{this.props.item.title}</Text>

                <Text>{this.props.item.description}</Text>

                <Text>{this.props.item.ingredients}</Text>

                <Text>{this.props.item.specialRequests}</Text>

                <Text>Quantity: {this.props.item.quantity}</Text>

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
                    edit: false
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
                <View>
                    <Button
                        title="-"
                        onPress={this.subtractQuantity}></Button>

                    <Text>{this.state.quantity}</Text>

                    <Button
                        title="+"
                        onPress={this.addQuantity}></Button>
                </View>

                <TextInput multiline={true} value={this.state.item.specialRequests} onChangeText={this.handelSpecialRequests}></TextInput>

                <View>

                    <Button
                        title="Confirm"
                        onPress={this.updateItem}></Button>
                    
                    <Button
                        title="Cancel"
                        onPress={this.cancelEdit}></Button>
                </View>
            </>
        )
    }

    render(){
        return (
            <View>
                {this.displayItem()}
            </View>
        )
    }
}