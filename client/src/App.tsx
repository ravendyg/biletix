import React from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import { Deps, DepsProvider } from './hooks/useDeps';
import { MainPage } from './pages/MainPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderPage } from './pages/OrderPage';
import { OrderServiceImpl } from './services/orderService';

function App() {
  const deps: Deps = {
    orderService: new OrderServiceImpl(process.env.REACT_APP_BASE_URL),
  };

  return (
    <DepsProvider deps={deps}>
    <div className="App">
      <Router>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/order/:orderLocator" component={OrderPage} />
        <Route exact path="/orders" component={OrdersPage} />
        <Route path="*" render={() => <Redirect to={{pathname: '/'}} />} />
      </Switch>
      </Router>
    </div>
    </DepsProvider>
  );
}

export default App;
