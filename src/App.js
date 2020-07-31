import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Grids } from './components/Grids.js';
import { Settings } from './components/Settings.js';
import { Home } from './components/Home.js';
import { NoMatch } from './components/NoMatch.js';
import { Layout } from './components/Layout.js';
import { NavigationBar } from './components/NavigationBar.js';
import { Jumbotron } from './components/Jumbotron.js';
import { Logout } from './components/Logout.js';
import { GiftGrid } from './components/GiftGrid.js';
import { Footer } from './components/Footer.js';
import { Auth } from './components/Auth.js';
import { Login } from './components/Login.js';
import decode from 'jwt-decode';

const checkAuth = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  if (!token || !refreshToken) {
    return false;
  }

  try {
    const { exp } = decode(refreshToken);
    if (exp < new Date().getTime()/1000) return false;
  } catch (e) { return false; }

  return true;
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
      <Login/>
    )
  )} />
)

export default function App() {
  const headerText= 'Welcome to Gift Grid!';
  return (
    <React.Fragment>
      <NavigationBar authentication={false}/>
      <Jumbotron text={headerText}/>
      <Layout>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/settings' component={Settings} />
            <Route path='/grids' component={Grids} />
            <Route path='/grid' render={(props) => <GiftGrid {...props} />} />
            <Route path='/logout' components={Logout} />
            <Route component={NoMatch} />
            <AuthRoute exact path='/auth' component={Auth} />
          </Switch>
        </Router>
      </Layout>
      <Footer />
    </React.Fragment>
  );
}
