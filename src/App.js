import React from 'react';

import Layout from './hoc/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';

import Home from './containers/Home/Home';

import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
  );
}

export default App;
