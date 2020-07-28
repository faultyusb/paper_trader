import React from 'react';

import { HashRouter, Route, Redirect, Switch} from 'react-router-dom';
import HomePage from './home_page/HomePage/home_page.js';
import Authenticate from './authenticate/authenticate.js';
import SignUp from './authenticate/signup';
import Portfolio from './portfolio/portfolio.js';
import Error from './shared/error/error.js';
import Navigation from './shared/Navigation/Navigation.js';

function App() {
  return (
    <HashRouter basename="/">
      <main>
        <Navigation />
        <Switch>
          <Route path='/home_page' exact>
            <HomePage/>
          </Route>

          <Route path='/portfolio' exact>
            <Portfolio/>
          </Route>

          <Route path='/SignIn' exact>
            <Authenticate/>
          </Route>

          <Route path='/SignUp' exact>
            <SignUp/>
          </Route>

          <Route path='/error' exact>
            <Error/>
          </Route>

          <Redirect to="/home_page" />
        </Switch>
      </main>
    </HashRouter>
  );
}

export default App;
