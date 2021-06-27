import Accounts from '../components/Accounts';

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
		autofocus: true,
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

	const signupHandler = (inputs) => {
		const fname = inputs[0].value;
		const lname = inputs[1].value;
		const email = inputs[2].value;
		const password = inputs[3].value;

		console(fname,lname,email,password);
	}

	return <Accounts items={INPUT} action={'sign up'} register={signupHandler} />;
}

export default Signup;
