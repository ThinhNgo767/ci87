import "./style.css";
import ThemeContext from "../../contexts/ThemeContext";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const classIntro = theme === "light"?"home_intro home_intro-light":"home_intro home_intro-dark"
  const classTitle = theme === "light"?"home_title home_title-light":"home_title home_title-dark"

  return (
    <div className="home">
      <p className={classIntro}>
        This is why React is more than a library, an architecture, or even an
        ecosystem. React is a community. It's a place where you can ask for
        help, find opportunities, and meet new friends. You will meet both
        developers and designers, beginners and experts, researchers and
        artists, teachers and students. Our backgrounds may be very different,
        but React lets us all create user interfaces together.
      </p>
      <i class="fa-solid fa-hands-holding-circle circle-style"></i>
      <h1 className={classTitle}>
        Welcome to the
        <br />
        Todo app
      </h1>
      <button
        className="get_todo"
        onClick={() => {
          navigate("/todo");
        }}
      >
        Get todo
      </button>
    </div>
  );
};

export default Home;
