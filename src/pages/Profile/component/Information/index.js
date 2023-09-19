import avatar from "../../image/avatar/user_01.jpg";
import "./style.css";
import ThemeContext from "../../../../contexts/ThemeContext";

import { useContext } from "react";

const Information = ({ data }) => {
  const { name, age, major, description, address, location, phone, email } =
    data;
;
const {theme} = useContext(ThemeContext)
const classInfomation = theme === "light" ? "information information_bg-light" :"information information_bg-dark"
const classInfoUser = theme === "light" ? "info_user-light" :"info_user-dark"

  return (
    <div className={classInfomation}>
      <div className="avatar_user">
        <img
          className="info_image"
          src={avatar}
          alt={`Avatar for ${data.name}`}
        ></img>
      </div>
      <div className={classInfoUser}>
        <h3>hello everybody, i am</h3>
        <h1>
          {name} {age}
        </h1>
        <h3>{major}</h3>
        <p className="description-width">{description}</p>
        <p><i className="fa-solid fa-house-user user_icon--style"></i> {address}</p>
        <p><i className="fa-solid fa-phone user_icon--style"></i> {phone}</p>
        <p><i className="fa-solid fa-envelope user_icon--style"></i> {email}</p>
        <p><i className="fa-solid fa-location-dot user_icon--style"></i> {location}</p>
      
      </div>
    </div>
  );
};

export default Information;
