
import "./style.css";
import Information from "./component/Information";
import ThemeContext from "../../contexts/ThemeContext"

import { useContext } from "react";


const dataUser = 
  {
    name: "Ngô Hưng Thịnh",
    major: "Developer",
    description:
      "To me, being a developer is not just a job, but also a passion and a way to build a better future for everyone.",
    address: "Số 999 Nơi Xa Xôi",
    location: "P. Ko Nắng Nôi, Quận Chảy Mồ Hôi",
    phone: "02888888888",
    email: "thinhngo767@gmail.com",
  }

const Profile = () => {
  const {theme} = useContext(ThemeContext)
  const classTopBackground = theme === "light" ? "top-background top-background-light" :"top-background top-background-dark"
  const classBottomBackground = theme === "light" ? "bottom-background bottom-background-light" :"bottom-background bottom-background-dark"
  return (
    <div className="profile">
      <div className={classTopBackground}></div>
      <div className={classBottomBackground}></div>

      <Information data={dataUser} />
    </div>
  );
};

export default Profile;
