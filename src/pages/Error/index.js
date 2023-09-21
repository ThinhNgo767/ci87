import Todo from "./image/todos.png";
import "./style.css"
import ThemeContext from "../../contexts/ThemeContext";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
    const {theme} = useContext(ThemeContext)
    const classError = theme === "light" ?"error error--light" : "error error--dark"
  return (
    <div className={classError}>
      <div className="box-left">
        <img src={Todo} alt="todo app" className="img-logo_todo" />
        <h1 className="text-error--light text-error--dark text-title">404. That's an error</h1>
        <h2 className="text-error--light text-error--dark">Page not found</h2>
        <p className="text-error--light text-error--dark">
        Oops the requested URL <strong>{window.location.pathname}</strong> was not found on this
          server. 
        </p>
        <p className="text-error--light text-error--dark">The page you are looking for doesn't exist or an other error occurred.</p>
        <p className="text-error--light text-error--dark">
        Go back, or head over to <strong>todoappci87.netlify.app </strong> to choose a new direction.
        </p>
      </div>
      <button type="button" title="back home" className="error-button" onClick={() => {
          navigate("/");
        }}>Back to home</button>
    </div>
  );
};

export default Error;
