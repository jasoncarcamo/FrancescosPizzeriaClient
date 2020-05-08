import React from "react";
import UserToken from "../../UserToken/UserToken";

const UserContext = React.createContext({
    isLoggedIn: false,
    user: {},
    refreshUserContext: ()=>{}
});

export default UserContext;

export class UserProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {},
            isLoggedIn: false,
            error: ""
        }
    }

    componentDidMount(){
        UserToken.hasToken()
            .then( token => {
                if(token){
                    
                    this.setState({
                        isLoggedIn: true
                    });

                    fetch("https://vast-escarpment-62007.herokuapp.com/api/users", {
                        headers: {
                            'content-type': "application/json",
                            'authorization': `bearer ${token}`
                        }
                    })
                        .then( res => {

                            if(!res.ok){

                                return res.json().then( e => Promise.reject(e));
                            };

                            return res.json();
                        })
                        .then( resData => {

                            this.setState({
                                user: resData.user
                            })
                        })
                        .catch( err => this.setState({ 
                            error: err.error, 
                            isLoggedIn: false
                        }));

                } else{

                    this.setState({
                        isLoggedIn: false
                    });

                };
            });
    }

    refreshUserContext = async ()=>{
        return UserToken.hasToken()
            .then( token => {
                if(token){
                    
                    this.setState({
                        isLoggedIn: true
                    });

                    return fetch("https://vast-escarpment-62007.herokuapp.com/api/users", {
                        headers: {
                            'content-type': "application/json",
                            'authorization': `bearer ${token}`
                        }
                    })
                        .then( res => {

                            if(!res.ok){

                                return res.json().then( e => Promise.reject(e));
                            };

                            return res.json();
                        })
                        .then( resData => {

                            this.setState({
                                user: resData.user
                            });

                            return true;
                        })
                        .catch( err => this.setState({ error: err.error}))

                } else{

                    this.setState({
                        isLoggedIn: false
                    });

                    return false;
                };
            });
    }

    render(){
        const value = {
            user: this.state.user,
            isLoggedIn: this.state.isLoggedIn,
            refreshUserContext: this.refreshUserContext
        };
        
        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}