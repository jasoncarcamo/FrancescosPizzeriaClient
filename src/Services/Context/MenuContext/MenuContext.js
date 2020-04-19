import React from "react";

const MenuContext = React.createContext({
    menuItems: [],
    refreshItems: ()=>{}
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

    refreshItems = ()=>{
        this.componentDidMount();
    }

    render(){
        const value = {
            menuItems: this.state.menuItems,
            refreshItems: this.refreshItems
        };

        return (
            <MenuContext.Provider value={value}>
                {this.props.children}
            </MenuContext.Provider>
        )
    }
}