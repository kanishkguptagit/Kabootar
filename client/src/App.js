import React, { useContext, Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import AuthContext from './store/auth-context';
import NavBar from './components/NavBar';
import LoadingSpinner from './components/Spinner/LoadingSpinner';
import './App.css';

const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Landing = lazy(() => import('./pages/Landing'));
const History = lazy(() => import('./pages/History'));
const Create = lazy(() => import('./pages/Create'));
const Task = lazy(() => import('./pages/Task'));

function App() {
	const ctx = useContext(AuthContext);

	return (
		<div className="App">
			<CssBaseline />
			<Suspense
				fallback={
					<div className="centered">
						<LoadingSpinner />
					</div>
				}>
				<Switch>
					<Route path="/" exact>
						<NavBar />
						<Landing />
					</Route>
					<Route path="/signin" exact>
						{!ctx.isLoggedIn && <Signin />}
						{ctx.isLoggedIn && <Redirect to="/dashboard" />}
					</Route>
					<Route path="/signup" exact>
						{!ctx.isLoggedIn && <Signup />}
						{ctx.isLoggedIn && <Redirect to="/dashboard" />}
					</Route>
					<Route path="/dashboard" exact>
						{ctx.isLoggedIn && <Dashboard />}
						{!ctx.isLoggedIn && <Signin />}
					</Route>
					<Route path="/history" exact>
						{ctx.isLoggedIn && <History />}
						{!ctx.isLoggedIn && <Signin />}
					</Route>
					<Route path="/create" exact>
						{ctx.isLoggedIn && <Create />}
						{!ctx.isLoggedIn && <Signin />}
					</Route>
					<Route path="/task" exact>
						{ctx.isLoggedIn && <Task />}
						{!ctx.isLoggedIn && <Signin />}
					</Route>
					<Route path="*">
						<NavBar />
						<p>404 Not Found</p>
					</Route>
				</Switch>
			</Suspense>
		</div>
	);
}

export default App;
