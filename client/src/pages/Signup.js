import Accounts from "../components/Accounts";

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
    {
        id: 'cnfpassword',
        label: 'Confirm Password',
        type: 'password',
        name: 'cnfpassword',
        autofocus: false,
    }
];

function Signup(){
    return <Accounts items={INPUT} action={"sign up"} />
}

export default Signup;