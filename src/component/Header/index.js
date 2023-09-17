import ThemeContext from "../../contexts/ThemeContext";
import "./style.css"

import {NavLink} from 'react-router-dom'
import { useContext } from "react";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const activeClass = (params) => {
   return theme === "light" ? params.isActive ? "active-item-light" : "color-link-light" : params.isActive ? "active-item-dark" : "color-link-dark" 
    
  }

  const classNavLink = theme === "light" ? "navigator light--link" :"navigator dark--link"
  const classHeader = theme === "light" ? "header header_bg-light" :"header header_bg-dark"

  return (
    <div className={classHeader}>
      <ul className={classNavLink}>
			<li>
				<NavLink to="/" className={activeClass}>Home</NavLink>
			</li>
			<li>
				<NavLink to="/todo" className={activeClass}>Todo</NavLink>
			</li>
			<li>
				<NavLink to="/profile" className={activeClass}>Profile</NavLink>
			</li>
		</ul>
      {theme === "light" ? (
        <button
          onClick={() => setTheme("dark")}
          className="light--theme"
          title="Dark Theme"
          value={theme}
        >
          <i className="fa-regular fa-moon"></i>
        </button>
      ) : (
        <button
          onClick={() => setTheme("light")}
          className="dark--theme"
          title="Light Theme"
          value={theme}
        >
          <i className="fa-regular fa-sun"></i>
        </button>
      )}
    </div>
  );
};

export default Header;
