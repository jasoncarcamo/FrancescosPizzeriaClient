import React from "react";
import MenuContext from "../MenuContext/MenuContext";

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

    static contextType = MenuContext;

    render(){
        const value = {
        };
        console.log(this.context)

        return (
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}