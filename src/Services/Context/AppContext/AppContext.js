import React from "react";
import MenuContext from "../MenuContext/MenuContext";

const AppContext = React.createContext({
    menuContext: {},
    orderContext: {},
    userContext: {}
});

export default AppContext;

export class AppProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuContext: {},
            orderContext: {},
            userContext: {}
        }
    }

    static contextType = MenuContext;

    render(){
        const value = {
            menuContext: this.props.menuContext,
            orderContext: this.props.orderContext,
            userContext: this.props.userContext
        };
        console.log(value)

        return (
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}