import React from "react";

const AppContext = React.createContext({
    app: []
});

export default AppContext;

export class AppProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        const value = {
        };

        return (
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}