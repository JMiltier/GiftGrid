import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Grids } from './components/Grids.js';
import { Profile } from './components/Profile.js';
import { Home } from './components/Home.js';
import { NoMatch } from './components/NoMatch.js';
import { Layout } from './components/Layout.js';
import { NavigationBar } from './components/NavigationBar.js';
import { Jumbotron } from './components/Jumbotron.js';
import { Logout } from './components/Logout.js';

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Jumbotron />
      <Layout>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/grids' component={Grids} />
            <Route path='/logout' components={Logout} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;
