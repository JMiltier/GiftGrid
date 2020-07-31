import React, { useState, useEffect } from 'react';
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
import axios from 'axios';


export const App = () => {
  const [username, setUsername] = useState('');
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/userloggedin', {
      params: {
        username: 'giftgridOG'
      }
    })
      .then((res) => {setUsername(res.data.username); setAuth(res.data.logged_in);})
      .catch((err) => console.log('Auth error', err));
  });

  const headerText = auth ? `Welcome back, ${username}` : 'Welcome to Gift Grid!';
  return (
    <React.Fragment>
      <NavigationBar auth={auth}/>
      <Jumbotron text={headerText}/>
      <Layout>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/settings' render={() => <Settings username={username} />} />
            <Route path='/grids' component={Grids} />
            <Route path='/grid' render={(props) => <GiftGrid {...props} />} />
            <Route path='/logout' components={Logout} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Layout>
      <Footer />
    </React.Fragment>
  );
}
