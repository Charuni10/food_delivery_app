import { Link } from "react-router-dom";
import "../static/header.css";

export function Header() {
  return (
    <div className="header-container">
      <nav className="navbar">
      <Link className="nav-link" to="/home">
              <strong>Foodie</strong>
            </Link>
            <Link className="nav-link" to="/home">
              Home
            </Link>
        
            <Link className="nav-link" to="/about">
              About
            </Link>
         
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
            <Link className="nav-link" to="/login">
              Login
            </Link>
      </nav>
    </div>
  );
}
