import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Accounts from '../components/Accounts';
import AuthContext from '../store/auth-context';

const INPUT = [
	{
		id: 'email',
		label: 'Email',
		type: 'email',
		name: 'email',
		autofocus: true,
	},
	{
		id: 'password',
		label: 'Password',
		type: 'password',
		name: 'password',
		autofocus: false,
	},
];

function Signin() {
	const ctx = useContext(AuthContext);
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);

	const signinHandler = async inputs => {
		const email = inputs[0].value;
		const password = inputs[1].value;

		setIsLoading(true);
		const response = await fetch(process.env.REACT_APP_BACKEND + '/users/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});

		const data = await response.json();
		setIsLoading(false);

		if (data.sucess) {
			ctx.login(data.result.accessToken, data.result.id);
			history.replace('/dashboard');
		} else {
			alert(data.result);
		}
	};

	return <Accounts items={INPUT} action={'sign in'} login={signinHandler} loading={isLoading} />;
}

export default Signin;
