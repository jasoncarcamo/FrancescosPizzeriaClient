import React from "react";
import UserToken from "../../UserToken/UserToken";

const UserContext = React.createContext({
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
                console.log(token);
                if(token){
                    
                    this.setState({
                        isLoggedIn: true
                    });

                } else{
                    this.setState({
                        isLoggedIn: false
                    });
                };
            });
    }

    refreshApp = async ()=>{
        this.componentDidMount();

        return await !this.state.isLoggedIn;
    }

    render(){
        const value = {
            isLoggedIn: this.state.isLoggedIn,
            refreshApp: this.refreshApp
        };

        console.log(this.state)

        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}