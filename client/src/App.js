import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import AuthContext from './store/auth-context';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import History from './pages/History';
import Create from "./pages/Create";

function App() {

	const ctx = useContext(AuthContext);

	return (
		<div className="App">
			<CssBaseline />
			<main>
				<Switch>
					<Route path="/" exact>
						<NavBar />
						<Landing />
					</Route>
					<Route path="/signin" exact>
						{ !ctx.isLoggedIn && <Signin />}
						{ ctx.isLoggedIn && <Redirect to="/dashboard" />}
					</Route>
					<Route path="/signup" exact>
						{ !ctx.isLoggedIn && <Signup />}
						{ ctx.isLoggedIn && <Redirect to="/dashboard" />}
					</Route>
					<Route path="/dashboard" exact>						
						{ ctx.isLoggedIn && < Dashboard />}
						{ !ctx.isLoggedIn && <Signin />}
					</Route>
					<Route path="/history" exact>						
						{ ctx.isLoggedIn && <History />}
						{ !ctx.isLoggedIn && <Signin />}
					</Route>
					<Route path="/create" exact>						
						{ ctx.isLoggedIn && <Create />}
						{ !ctx.isLoggedIn && <Signin />}						
					</Route>
					<Route path="*">
						<NavBar />
						<p>404 Not Found</p>
					</Route>
				</Switch>
			</main>
		</div>
	);
}

export default App;
