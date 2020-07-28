import React, { useState } from 'react';
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


function App() {
  const [headerText, setHeaderText] = useState('Welcome to Gift Grid!')
  return (
    <React.Fragment>
      <NavigationBar />
      <Jumbotron text={headerText}/>
      <Layout>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/settings' component={Settings} />
            <Route path='/grids' component={Grids} />
            <Route path='/grid' component={GiftGrid} />
            <Route path='/logout' components={Logout} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default App;
