import { Route, Switch } from 'react-router-dom';

import Signin from './pages/signin';
import Signup from './pages/signup';

function App() {

  return (
    <div className="App">
      <main>
        <Switch>
          <Route path="/" exact>
            <p>Welcome Page</p>
          </Route>
          <Route path="/signin" exact>
            <Signin />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/home" exact>
            <p>home</p>
          </Route>
          <Route path="/history" exact>
            <p>history</p>
          </Route>
          <Route path="/create" exact>
            <p>create</p>
          </Route>
          <Route path="*">
            <p>404 Not Found</p>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
