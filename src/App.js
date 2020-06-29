import React from 'react';

import { HashRouter, Route, Redirect, Switch} from 'react-router-dom';
import HomePage from './home_page/home_page.js';
import Authenticate from './authenticate/authenticate.js';
import Portfolio from './portfolio/portfolio.js';
import Error from './shared/error.js';

function App() {
  return (
    <HashRouter basename="/">
      <main>
        <Switch>
          <Route path='/home_page' exact>
            <HomePage/>
          </Route>

          <Route path='/portfolio' exact>
            <Portfolio/>
          </Route>

          <Route path='/authenticate' exact>
            <Authenticate/>
          </Route>

          <Route path='/error'>
            <Error/>
          </Route>

          <Redirect to="/error" />
        </Switch>

      </main>
    </HashRouter>
  );
}

export default App;
