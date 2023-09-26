import avatarCrazy from "../../image/avatar/crazy_code.jpg";
import avatarDark from "../../image/avatar/avatar-dark.jpg";
import "./style.css";
import ThemeContext from "../../../../contexts/ThemeContext";

import { useContext } from "react";
import {
  BsHouseFill,
  BsTelephonePlusFill,
  BsFillEnvelopeAtFill,
  BsFillGeoAltFill,
} from "react-icons/bs";

const Information = ({ data }) => {
  const { name, major, description, address, location, phone, email } = data;
  const { theme } = useContext(ThemeContext);

  const classInfomation =
    theme === "light"
      ? "information information--light"
      : "information information--dark";

  return (
    <div className={classInfomation}>
      <div className="avatar_user">
        <img
          className="info_image image-light image-dark"
          src={theme === "light" ?avatarCrazy : avatarDark}
          alt={`Avatar for ${data.name}`}
        ></img>
      </div>
      <div className="info_user info_user-light info_user-dark">
        <h3>hello everybody, i am</h3>
        <h1>{name}</h1>
        <h3>{major}</h3>
        <p className="description-width">{description}</p>
        <p className="user-text--flex">
          <BsHouseFill className="info_user-icon color-light color-dark"/>{address}
        </p>
        <p className="user-text--flex">
          <BsTelephonePlusFill className="info_user-icon color-light color-dark"/>{phone}
        </p>
        <p className="user-text--flex">
          <BsFillEnvelopeAtFill className="info_user-icon color-light color-dark"/>{email}
        </p>
        <p className="user-text--flex">
          <BsFillGeoAltFill className="info_user-icon color-light color-dark"/>{location}
        </p>
      </div>
    </div>
  );
};

export default Information;
