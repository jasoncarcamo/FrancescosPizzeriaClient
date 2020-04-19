import React from 'react';

import {AppProvider} from "./src/Services/Context/AppContext/AppContext";
import UserContext, {UserProvider} from "./src/Services/Context/UserContext/UserContext";
import  MenuContext, {MenuProvider} from "./src/Services/Context/MenuContext/MenuContext";
import OrderContext, {OrderProvider} from "./src/Services/Context/OrderContext/OrderContext";

import AppContainer from "./src/AppContainer/AppContainer";

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            appLoading: true,
        }
    };

    render(){

        return (
            <MenuProvider>
                <MenuContext.Consumer>
                    { menuContext => (
                        <UserProvider>
                            <UserContext.Consumer>
                                { userContext => (
                                    <OrderProvider
                                    menuContext={menuContext}
                                    userContext={userContext}>
                                        <OrderContext.Consumer>
                                            { orderContext => (
                                                <AppProvider
                                                    menuContext={menuContext}
                                                    userContext={userContext}
                                                    orderContext={orderContext}>
                                                    <AppContainer/>
                                                </AppProvider>
                                            )}
                                        </OrderContext.Consumer>
                                    </OrderProvider>
                                )}
                            </UserContext.Consumer>
                        </UserProvider>
                    )}
                </MenuContext.Consumer>
            </MenuProvider>
            );
        }
}