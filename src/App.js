import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import CssWizardy from './CssWizardry/CssWizardry';
import SearchApp from './SearchApp/SearchApp';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <header className='App-header'>
          <div className='App-logo'>Leo Danielsson</div>
          <nav>
            <ul className='App-nav'>
              <li>
                <NavLink activeClassName='App-nav-active' to='/css-wizardry'>
                  CSS Wizardry
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName='App-nav-active' to='/search-app'>
                  Search App
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path='/css-wizardry'>
              <CssWizardy />
            </Route>
            <Route path='/search-app'>
              <SearchApp />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
