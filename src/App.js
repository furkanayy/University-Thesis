import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Introduction from "./pages/Introduction"
import Home from "./pages/Home"
import PrivateRoute from "./pages/PrivateRoute"
import Error from "./pages/Error"

export default function App() {
  return (
    <Router>
      <div id="appo">
        <Switch>
          <Route exact path="/">
            {localStorage.getItem("token") ? <Redirect to="/home" /> : <Introduction/>}
          </Route>
          <PrivateRoute path="/home" component={Home} />
          <Route path="*" component={Error} />
        </Switch>
      </div>
    </Router>
  )
}