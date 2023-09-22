import Todo from "./image/todos.png";
import "./style.css"
import ThemeContext from "../../contexts/ThemeContext";

import { useContext } from "react";
import { Link } from "react-router-dom";

const Error = () => {
   
    const {theme} = useContext(ThemeContext)
    const classError = theme === "light" ?"error error--light" : "error error--dark"
  return (
    <div className={classError}>
      <div className="box-left">
        <img src={Todo} alt="todo app" className="img-logo_todo" />
        <h1 className="text-error--light text-error--dark text-title">404. That's an error</h1>
        <h2 className="text-error--light text-error--dark">Page not found</h2>
        <p className="text-error--light text-error--dark">
        Oops the requested URL <strong className="pathname">{window.location.pathname}</strong> was not found on this
          server. 
        </p>
        <p className="text-error--light text-error--dark">The page you are looking for doesn't exist or an other error occurred.</p>
        <p className="text-error--light text-error--dark">
        Go back, or head over to <Link to="/" className="error-link error-link--light error-link--dark"><strong>ci87app.netlify.app</strong></Link> to choose a new direction.
        </p>
      </div>
      <button type="button" title="back home" className="error-button" onClick={()=>window.history.back()}>Back</button>
    </div>
  );
};

export default Error;
