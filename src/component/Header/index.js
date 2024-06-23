import ThemeContext from "../../contexts/ThemeContext";
import "./style.css";

import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import Cookies from "js-cookie";

const Header = ({ isLoggedIn, onLoggout }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let prevScrollpos = window.scrollY;
    const handleScroll = () => {
      let currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    // Xóa dữ liệu người dùng và đăng xuất
    Cookies.remove("token");
    Cookies.remove("user");
    onLoggout();
    // setUserData(null);
  };

  const activeClass = (params) => {
    return theme === "light"
      ? params.isActive
        ? "active-item-light"
        : "color-link-light"
      : params.isActive
      ? "active-item-dark"
      : "color-link-dark";
  };

  const classHeader = isScrolled
    ? theme === "light"
      ? "scrolled-up header header--light"
      : "scrolled-up header header--dark"
    : theme === "light"
    ? "scrolled-down header header--light"
    : "scrolled-down header header--dark";

  return (
    <div className={classHeader}>
      <ul className="navigator">
        <li>
          <NavLink to="/" className={activeClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/todo" className={activeClass}>
            Todo
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={activeClass}>
            About
          </NavLink>
        </li>
        <li>
          {!isLoggedIn ? (
            <NavLink to="/sign-in" className={activeClass}>
              Login
            </NavLink>
          ) : (
            <NavLink to="/sign-in" className={activeClass}>
              Profile
            </NavLink>
          )}
        </li>
        <li>
          {!isLoggedIn ? (
            <NavLink to="/sign-up" className={activeClass}>
              Register
            </NavLink>
          ) : (
            <NavLink to="/" className={activeClass} onClick={handleLogout}>
              Logout
            </NavLink>
          )}
        </li>
      </ul>
      {theme === "light" ? (
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className="light--theme"
          title="Dark Theme"
          value={theme}
        >
          <BsMoon className="moon" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setTheme("light")}
          className="dark--theme"
          title="Light Theme"
          value={theme}
        >
          <BsSun className="sun" />
        </button>
      )}
    </div>
  );
};

export default Header;
