import React, { useState } from 'react';

const AuthContext = React.createContext({
	token: '',
	userId: '',
	isLoggedIn: false,
	login: (recievedToken, recievedId) => {},
	logout: () => {},
});

export const AuthContextProvider = props => {
	const tokenData = localStorage.getItem('token') ?? null;
	const idData = localStorage.getItem('userId') ?? null;

	const [token, setToken] = useState(tokenData);
	const [userId, setUserId] = useState(idData);

	// let userIsLoggedIn = false;

	// if(token){
	//     userIsLoggedIn = true;
	// }

	const userIsLoggedIn = !!token;

	const loginHandler = (recievedToken, recievedId) => {
		setToken(recievedToken);
		setUserId(recievedId);
		localStorage.setItem('token', recievedToken);
		localStorage.setItem('userId', recievedId);
	};

	const logoutHandler = () => {
		setToken(null);
		setUserId(null);
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
	};

	const contextValue = {
		token: token,
		userId: userId,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
