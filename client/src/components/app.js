import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';
import Header from './header';

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <main>
        <div className="container">
          <Switch>
            {renderRoutes(routes)}
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default hot(module)(App);
