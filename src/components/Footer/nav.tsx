import React from 'react'
import { Link, withRouter } from "react-router-dom"
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import './nav.css'

// TODO: make sure the menu is closed when the url has changed
interface NavProps {
    location: any,
    history: any,
    match: any
}

interface NavState {
    menuIsOpen: Boolean,
    location: String
}

class Nav extends React.Component<NavProps, NavState> {
    state = {
        menuIsOpen: false,
        location: this.props.location.pathname
    }

    handleMenuClick = () => {        
        this.setState(prevState => ({
                menuIsOpen: !prevState.menuIsOpen
            })
        )
    };
    
    render(): React.ReactNode {

        return (
        <nav>
    
            <div className="menu-button">
                <IconButton onClick={this.handleMenuClick} edge="start" color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
            </div>
            { this.state.menuIsOpen && 
                <ul className="nav-list">
                    <li>
                        <Link to="/newUser">New User</Link>
                    </li>
                    <li>
                        <Link to="/photos">Photos</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>            
                </ul>
            }
          </nav>
        )
    }
}

export default withRouter(Nav)
