import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/logout');
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">GreenStep 🌿 </h1>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Primary navigation">
          <Link to="/" onClick={() => setMenuOpen(false)} className="nav-link">Home</Link>
          <Link to="/calculate" onClick={() => setMenuOpen(false)} className="nav-link">Calculate</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger" />
          <span className="hamburger" />
          <span className="hamburger" />
        </button>
      </div>
    </header>
  );
}
