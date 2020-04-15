import React from 'react';

import {AppProvider} from "./src/Services/Context/AppContext/AppContext";
import {UserProvider} from "./src/Services/Context/UserContext/UserContext";
import  {MenuProvider} from "./src/Services/Context/MenuContext/MenuContext";
import {OrderProvider} from "./src/Services/Context/OrderContext/OrderContext";

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
                <UserProvider>
                    <OrderProvider>
                        <AppProvider>
                            <AppContainer/>
                        </AppProvider>
                    </OrderProvider>
                </UserProvider>
            </MenuProvider>
            );
        }
}