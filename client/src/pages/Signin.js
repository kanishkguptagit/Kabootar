import Accounts from '../components/Accounts';

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

	const signinHandler = async (inputs) => {
		const email = inputs[0].value;
		const password = inputs[1].value;
		
		const response = await fetch('http://localhost:5000/users/signin', {
				method: 'POST',
				body: JSON.stringify({
					email: email,
					password: password,
				})
			}
		)

		console.log(response);
	}

	return <Accounts items={INPUT} action={'sign in'} login={signinHandler} />;
}

export default Signin;
