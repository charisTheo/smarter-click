import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import Footer from './components/Footer/footer'
import NewUserPage from './components/NewUser/newUserPage'
import PhotosPage from './components/Photos/photosPage'
import DashboardPage from './components/Dashboard/dashboardPage'
import Header from './components/Header/header'

import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
            <Route path="/newUser" component={NewUserPage} />
            <Route path="/photos" component={PhotosPage} />
            <Route path="/dashboard" component={DashboardPage} />
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
