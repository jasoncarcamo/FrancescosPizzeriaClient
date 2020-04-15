import React from "react";

const AppContext = React.createContext({
    menuContext: {},
    userContext: {},
    orderContext: {}
});

export default AppContext;

export class AppProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuContext: {},
            userContext: {},
            orderContext: {}
        }
    }

    componentDidMount(){
        
    }

    UNSAFE_componentWillReceiveProps(){
    }

    render(){
        const value = {
            menuContext: this.state.menuContext,
            userContext: this.state.userContext,
            orderContext: this.state.orderContext
        };

        return (
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}