import Accounts from '../components/accounts';

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

function Login() {
	return <Accounts items={INPUT} action={'sign up'} />;
}

export default Login;
