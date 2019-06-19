import React from 'react';
import { Link } from "react-router-dom";

import './footer.css'

const Footer: React.FC = () => {
    return (
        <footer>
          <nav>
            <ul className="footer-nav-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/photos">Photos</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>            
            </ul>
          </nav>
        </footer>
    )
}

export default Footer
