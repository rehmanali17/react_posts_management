import React from "react"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Todos from "./components/dashboard/Todos";
import ContextProvider from "./contexts/Context";

function App() {
  return (
    <Router>
      <ContextProvider>
            <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/user" component={Todos} />
            </Switch>
        </ContextProvider>
    </Router>
  );
}

export default App;
