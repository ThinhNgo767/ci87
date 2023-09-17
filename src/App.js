import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Profile from "./pages/Profile";

import ThemeContext from "./contexts/ThemeContext";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState("light");
  const appClassName = theme === "light" ? `App` : `App background--dark`;
  return (
    <div className={appClassName}>
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
