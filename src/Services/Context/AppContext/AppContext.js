import React from "react";
import MenuContext from "../MenuContext/MenuContext";
import UserContext from "../UserContext/UserContext";

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

    static contextType = UserContext;

    render(){
        const value = {
            menuContext: this.props.menuContext,
            orderContext: this.props.orderContext,
            userContext: this.props.userContext
        };
        

        return (
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}