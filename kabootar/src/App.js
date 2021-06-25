import { Route, Switch } from 'react-router-dom'
import "./App.css";

function App() {

  return (
    <div className="App">
      <main>
        <Switch>
          <Route path="/" exact>
            <p>Welcome Page</p>
          </Route>
          <Route path="/accounts" exact>
            <p>accounts</p>
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
