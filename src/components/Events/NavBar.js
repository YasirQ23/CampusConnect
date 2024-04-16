import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
        <li>
          <Link to="/create">Create Event</Link>
        </li>
        <li>
          <Link to="/search">Search Event</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
