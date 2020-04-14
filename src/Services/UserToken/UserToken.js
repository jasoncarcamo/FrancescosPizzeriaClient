import {AsyncStorage} from "react-native"; 

const UserToken = {
    async getToken(){
        return await AsyncStorage.getItem("Francesos-pizzeria-user");
    },
    hasToken(){
        return UserToken.getToken();
    },
    async saveToken(token){
        return await AsyncStorage.setItem("Francesos-pizzeria-user", token);
    },
    async deleteToken(){
        return await AsyncStorage.removeItem("Francesos-pizzeria-user");
    }
};

export default UserToken;