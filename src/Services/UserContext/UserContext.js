import React from "react";
import UserToken from "../UserToken/UserToken";

const UserContext = React.createContext({
    user: {},
    isLoggedIn: false,
    refreshApp: ()=>{}
});

export default UserContext;

export class UserProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount(){
        UserToken.hasToken()
            .then( token => {

                if(token){
                    
                    this.setState({
                        isLoggedIn: true
                    });

                } else{
                    this.setState({
                        isLoggedIn: false
                    })
                }
            })
    }

    refreshApp = ()=>{
        this.componentDidMount();
    }

    render(){
        const value = {
            user: this.state.user,
            isLoggedIn: this.state.isLoggedIn,
            refreshApp: this.refreshApp
        };
        
        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}