import React from 'react'

import logo from './../../images/smarter-click-logo.png'
import './header.css'

const Header: React.FC = () => {
    return (
        <header>
          <img src={logo} alt="the Smarter Click logo" />
        </header>
    )
}

export default Header
