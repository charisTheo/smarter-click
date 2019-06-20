import React from 'react'
import { Link } from "react-router-dom"
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import './nav.css'

interface NavState {
    menuIsOpen: Boolean
}

class Nav extends React.Component {
    state = {
        menuIsOpen: false,
    }

    handleMenuClick = () => {        
        this.setState((prevState: NavState) => ({
                menuIsOpen: !prevState.menuIsOpen
            })
        )
    }

    handleLinkClick = () => {
        this.setState({
            menuIsOpen: false
        })
    }
    
    render(): React.ReactNode {

        return (
        <nav>
    
            <div className="menu-button">
                <IconButton onClick={this.handleMenuClick} edge="start" color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
            </div>
            <ul className={`nav-list ${this.state.menuIsOpen ? 'visible' : ''}`} >
                <li>
                    <Link onClick={this.handleLinkClick} to="/newUser">New User</Link>
                </li>
                <li>
                    <Link onClick={this.handleLinkClick} to="/photos">Photos</Link>
                </li>
                <li>
                    <Link onClick={this.handleLinkClick} to="/dashboard">Dashboard</Link>
                </li>            
            </ul>
          </nav>
        )
    }
}

export default Nav
