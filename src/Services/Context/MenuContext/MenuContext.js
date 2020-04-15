import React from "react";
import {Text, View, button} from "react-native";
import UserContext from "../UserContext/UserContext";

const MenuContext = React.createContext({
    menuItems: [],
});

export default MenuContext;

export class MenuProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuItems: [],
            error: ""
        }
    }

    componentDidMount(){
        fetch("https://localhost:5001/api/menuitems")
            .then( res => {

                if(!res.ok){
                    
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                this.setState({
                    menuItems: resData
                })
            })
            .catch( err => this.setState({ error: err.error}));
    }

    render(){
        const value = {
            menuItems: this.state.menuItems
        }

        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}