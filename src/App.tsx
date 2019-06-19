import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from './components/Footer/footer'
import './App.css';
import Home from './components/Home/home';
import Photos from './components/Photos/photos';
import Dashboard from './components/Dashboard/dashboard';
import Header from './components/Header/header';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
            <Route exact path="/" component={Home} />
            <Route path="/photos" component={Photos} />
            <Route path="/dashboard" component={Dashboard} />
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
