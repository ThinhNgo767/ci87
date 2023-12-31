import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";

import ThemeContext from "./contexts/ThemeContext";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

function App() {
  const user = !!Cookies.get("token");
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(user);

  const appClassName =
    theme === "light"
      ? `App App_background--light`
      : `App App_background--dark`;

  const handleLoggin = () => {
    setIsLoggedIn(true);
  };
  const handleLoggout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className={appClassName}>
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo isLoggedIn={isLoggedIn} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/sign-in"
            element={
              <SignIn
                onLoggedIn={handleLoggin}
                onLoggout={handleLoggout}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
