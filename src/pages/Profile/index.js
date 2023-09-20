
import "./style.css";
import Information from "./component/Information";

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
  return (
    <div className="profile">
      <Information data={dataUser} />
    </div>
  );
};

export default Profile;
