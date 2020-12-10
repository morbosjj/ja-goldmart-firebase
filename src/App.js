import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Maintenance from './components/screen/Maintenance';
import './css/App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Maintenance} />
      </Switch>
    </Router>
  );
};

export default App;
