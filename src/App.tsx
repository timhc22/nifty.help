import React from 'react';
import './App.css';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, Link,
} from 'react-router-dom';
import WebThreeSection from "./components/WebThreeSection";

function App() {

  return (
    <div className="App">
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              <Link to="/" className="logo">
                Nifty
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>

        <WebThreeSection />

        <Switch>
          <Route exact path="/" component={DashboardPage}/>
          <Redirect to="/"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
