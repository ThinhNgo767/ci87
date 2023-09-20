import "./style.css";
import ThemeContext from "../../contexts/ThemeContext";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BsListCheck } from "react-icons/bs";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

const classHome =theme === "light"
? "home home-light"
: "home home-dark";

  return (
    <div className={classHome}>
      <p className="home_intro home_intro-light home_intro-dark">
        Ứng dụng quản lý nhiệm vụ đa nền tảng đích thực. Dù bạn đang dùng ứng
        dụng trên máy tính khi ở nhà hay ứng dụng dành cho thiết bị di động khi
        di chuyển, bạn đều có thể truy nhập vào danh sách nhiệm vụ và luôn sắp
        xếp mọi thứ khoa học, những đề xuất thông minh và được cá nhân hóa để cập
        nhật danh sách việc cần làm hàng ngày hoặc hàng tuần của bạn.
      </p>
      <BsListCheck className="circle-style"/>
      
      <h1 className="home_title home_title-light home_title-dark">
        Welcome to the Todo app</h1>
      <button type="button"
        className="get_todo" title="get todo app"
        onClick={() => {
          navigate("/todo");
        }}
      >
        Get todo app
      </button>
    </div>
  );
};

export default Home;
