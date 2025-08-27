import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <nav>
        <div className="nav-logo"><p className="nav-brand">Contest Reminder</p></div>
        
        <ul className="nav-links">
          <li>
          <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/platform">Platforms</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
