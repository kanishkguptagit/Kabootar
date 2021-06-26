import { Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import History from './pages/History';
import Create from "./pages/Create";

function App() {
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
						<Signin />
					</Route>
					<Route path="/signup" exact>
						<Signup />
					</Route>
					<Route path="/dashboard" exact>						
						<Dashboard />
					</Route>
					<Route path="/history" exact>						
						<History />
					</Route>
					<Route path="/create" exact>
						<Create />
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
