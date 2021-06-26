import { Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NavBar from './components/NavBar';

function App() {
	return (
		<div className="App">
			<CssBaseline />
			<main>
				<Switch>
					<Route path="/" exact>
						<NavBar />
						<p>Welcome Page</p>
					</Route>
					<Route path="/signin" exact>
						<Signin />
					</Route>
					<Route path="/signup" exact>
						<Signup />
					</Route>
					<Route path="/home" exact>
						<NavBar />
						<p>home</p>
					</Route>
					<Route path="/history" exact>
						<NavBar />
						<p>history</p>
					</Route>
					<Route path="/create" exact>
						<NavBar />
						<p>create</p>
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
