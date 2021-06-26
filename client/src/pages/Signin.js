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

function Signin(){
    return <Accounts items={INPUT} action={"sign in"} />
}

export default Signin;