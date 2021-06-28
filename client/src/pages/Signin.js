import React, { useContext } from 'react';
import { useHistory } from 'react-router';

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

	const signinHandler = async inputs => {
		const email = inputs[0].value;
		const password = inputs[1].value;

		const response = await fetch('https://kabootar-mail.herokuapp.com/users/signin', {
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

		ctx.login(data.result.accessToken, data.result.id);

		history.replace('/dashboard');

	};

	return <Accounts items={INPUT} action={'sign in'} login={signinHandler} />;
}

export default Signin;
