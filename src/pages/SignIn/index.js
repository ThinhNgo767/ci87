import React, { useState, useContext } from "react";
import axios from "axios";
import ThemeContext from "../../contexts/ThemeContext";

import "./style.css";

const SignIn = ({
  onLoggedIn,
  onLoggout,
  setUserData,
  isLoggedIn,
  userData,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { theme } = useContext(ThemeContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu đăng nhập lên API và nhận dữ liệu người dùng
      const response = await axios.get(
        "https://650d41c5a8b42265ec2be909.mockapi.io/user?fields=username,password"
      );
      const users = response.data;
      const isUser = users.find((user) => {
        return user.userName === username && user.password === password;
      });

      if (isUser) {
        setUserData(isUser);
        setUsername("");
        setPassword("");
        onLoggedIn();
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
    onLoggout();
    setUserData(null);
    setError("");
  };

  return (
    <div className="sign-in">
      {isLoggedIn ? (
        <div className="user_islogin">
          <p
            style={theme === "light" ? { color: "black" } : { color: "white" }}
          >
            Chào mừng <b>{userData.userName}</b> đã đăng nhập
          </p>
          <div className="item-info">
            <div className="item-img">
            <img src={userData.avatar} alt="Avatar" title="Avatar Use" />
            </div>
           
            <div>
              <p>
                Họ và Tên : <strong>{userData.fullName}</strong>
              </p>
              <p>
                Tuổi : <strong>{userData.age}</strong>
              </p>
              <p>
                Nghề nghiệp : <strong>{userData.major}</strong>
              </p>
              <p>
                Địa chỉ : <strong>{userData.address}</strong>
              </p>
              <fieldset>
                <legend>
                  <i>Lời giới thiệu :</i>
                </legend>
                <sub>{userData.intro}</sub>
              </fieldset>
              <button type="button" title="Logout" className="btn-logout" onClick={handleLogout}>
            Đăng xuất
          </button>
            </div>
          </div>

          
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
          <button type="button" title="Login" onClick={handleLogin}>
            Đăng nhập
          </button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default SignIn;
