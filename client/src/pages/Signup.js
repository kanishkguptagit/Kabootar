import { useState } from 'react';
import Accounts from '../components/Accounts';
import { useHistory } from 'react-router-dom';

const INPUT = [
	{
		id: 'fname',
		label: 'First Name',
		type: 'text',
		name: 'fname',
		autofocus: true,
	},
	{
		id: 'lname',
		label: 'Last Name',
		type: 'text',
		name: 'lname',
		autofocus: false,
	},
	{
		id: 'email',
		label: 'Email Address',
		type: 'email',
		name: 'email',
		autofocus: false,
	},
	{
		id: 'password',
		label: 'Password',
		type: 'password',
		name: 'password',
		autofocus: false,
	},
];

function Signup() {
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);

	const signupHandler = async inputs => {
		const fname = inputs[0].value;
		const lname = inputs[1].value;
		const email = inputs[2].value;
		const password = inputs[3].value;

		setIsLoading(true);
		const response = await fetch(process.env.REACT_APP_BACKEND + '/users/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstName: fname,
				lastName: lname,
				email: email,
				password: password,
			}),
		});

		const data = await response.json();
		setIsLoading(false);

		if (data.sucess) {
			history.push('/');
		} else {
			alert(data.result);
		}
	};

	return (
		<Accounts items={INPUT} action={'sign up'} register={signupHandler} loading={isLoading} />
	);
}

export default Signup;
