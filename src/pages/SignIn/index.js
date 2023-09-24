import React, { useState ,useContext } from "react";
import axios from "axios";
import ThemeContext from "../../contexts/ThemeContext";

import "./style.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
const {theme} = useContext(ThemeContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu đăng nhập lên API và nhận dữ liệu người dùng
      const response = await axios.get(
        "https://650fc1353ce5d181df5ca751.mockapi.io/user/"
      );
      
      const users = response.data;
      const isLogin = users.find(
        (user) => user.username === username && user.password === password
      );

      if (isLogin) {
        // Lưu thông tin người dùng vào biến trạng thái
        setUserData(isLogin);
        setIsLoggedIn(true);
      } else {
        // Đăng nhập thất bại
        setError("sai username or password");
      }

      // Xử lý phản hồi từ API
    } catch (error) {
      setError("Đã xảy ra lỗi khi gửi yêu cầu");
    }
  };

  const handleLogout = () => {
    // Xóa dữ liệu người dùng và đăng xuất
    setUserData(null);
    setIsLoggedIn(false);
    setError("");
    setUsername("")
    setPassword("")
  };

  return (
    <div className="sign-in">
      {isLoggedIn ? (
        <div className="user_islogin">
          <h1 style={theme === "light" ? {color :"black"} : {color:"white"}}>Chào mừng {userData.fullName} đã đăng nhập</h1>
          <img src={userData.avatar} alt="Avatar" title="Avatar Use"/>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      ) : (
        <form className="login-form">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="autoComplete"
          />
          <button onClick={handleLogin}>Đăng nhập</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default SignIn;
