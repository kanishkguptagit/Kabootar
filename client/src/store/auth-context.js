import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    userId: '',
    isLoggedIn: false,
    login: (token,id) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {

    const tokenData = localStorage.getItem('token') ?? '';
    const idData = localStorage.getItem('userId') ?? '';
    
    const [token, setToken] = useState(tokenData);
    const [userId, setUserId] = useState(idData);

    let userIsLoggedIn = false;

    if(tokenData){
        userIsLoggedIn = true;
    }

    const loginHandler = (token, id) => {
        setToken(token);
        setUserId(id);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
    }

    const logoutHandler = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    }

    const contextValue = {
        token: token,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;