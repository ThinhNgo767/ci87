import React, { useState, useContext } from "react";
import axios from "axios";
import ThemeContext from "../../contexts/ThemeContext";
import Cookies from "js-cookie";

import "./style.css";

const SignIn = ({ onLoggedIn, onLoggout, isLoggedIn }) => {
  const userCookie = Cookies.get("user");
  let user;
  if (userCookie) {
    user = JSON.parse(userCookie);
  } else {
    user = [];
  }
  const { avatar, fullName, age, major, address, intro } = user;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);
  //
  const [editAvatar, setEditAvatar] = useState(avatar);
  const [editName, setEditName] = useState(fullName);
  const [editAge, setEditAge] = useState(age);
  const [editMajor, setEditMajor] = useState(major);
  const [editAddress, setEditAddress] = useState(address);
  const [editIntro, setEditIntro] = useState(intro);

  const { theme } = useContext(ThemeContext);

  const handleLogin = async (e) => {
    const expirationDateToken = new Date();
    expirationDateToken.setTime(expirationDateToken.getTime() + 15 * 60 * 1000);
    const options = { expires: expirationDateToken };
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
        Cookies.set("token", isUser.userName, options);
        Cookies.set("user", JSON.stringify(isUser));
        // setUserData(isUser);
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
    Cookies.remove("token");
    Cookies.remove("user");
    onLoggout();
    // setUserData(null);
    setError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    const userUpdate = {
      avatar: editAvatar,
      fullName: editName,
      age: editAge,
      major: editMajor,
      address: editAddress,
      intro: editIntro,
    };
    try {
    const currentUser = await axios.get(`https://650d41c5a8b42265ec2be909.mockapi.io/user/${user.id}`)
    const updatedUser = { ...currentUser.data, ...userUpdate };
    axios.put(`https://650d41c5a8b42265ec2be909.mockapi.io/user/${user.id}`,updatedUser);
    Cookies.set("user", JSON.stringify(updatedUser));
    console.log("Cập nhật thông tin người dùng thành công.");
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin người dùng:", error);
  }
  setEdit(false);
   
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  const classUserLogin =
    theme === "light"
      ? "user_islogin user_islogin--light"
      : "user_islogin user_islogin--dark";

  return (
    <div className="sign-in">
      {isLoggedIn ? (
        <div className={classUserLogin}>
          {edit ? (
            <form className="edit-user">
              <label htmlFor="avatar">
                Avatar :{" "}
                <input
                  type="text"
                  id="avatar"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                />
              </label>
              <label htmlFor="full-name">
                Họ và Tên :{" "}
                <input
                  type="text"
                  id="full-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </label>
              <label htmlFor="user-age">
                Tuổi :{" "}
                <input
                  type="number"
                  id="user-age"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                />
              </label>
              <label htmlFor="user-major">
                Nghề nghiệp :{" "}
                <input
                  type="text"
                  id="user-major"
                  value={editMajor}
                  onChange={(e) => setEditMajor(e.target.value)}
                />
              </label>
              <label htmlFor="user-address">
                Địa chỉ :{" "}
                <input
                  type="text"
                  id="user-address"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                />
              </label>
              <div className="edit-intro">
                <label htmlFor="user-intro">Lời giới thiệu <textarea
                  title="intro"
                  id="user-intro"
                  value={editIntro}
                  onChange={(e) => setEditIntro(e.target.value)}
                ></textarea></label>
                
              </div>

              <div className="button-user">
                <button type="button" onClick={() => setEdit(false)} title="cancel" className="user-btn-cancel">CANCEL</button>
                <button type="button" onClick={handleUpdate} title="update" className="user-btn-update">UPDATE</button>
              </div>
            </form>
          ) : (
            <div>
              <p>
                Chào mừng <b>{user.userName}</b> đã đăng nhập
              </p>
              <button type="button" className="button-setting" onClick={() => setEdit(true)} title="edit">
                edit
              </button>
              <div className="item-info">
                <div className="item-img">
                  <img src={user.avatar} alt="Avatar" title="Avatar Use" />
                </div>

                <div>
                  <p>
                    Họ và Tên : <strong>{user.fullName}</strong>
                  </p>
                  <p>
                    Tuổi : <strong>{user.age}</strong>
                  </p>
                  <p>
                    Nghề nghiệp : <strong>{user.major}</strong>
                  </p>
                  <p>
                    Địa chỉ : <strong>{user.address}</strong>
                  </p>
                  <fieldset className="fieldset">
                    <legend>
                      <i>Lời giới thiệu :</i>
                    </legend>
                    <sub>{user.intro}</sub>
                  </fieldset>
                  <button
                    type="button"
                    title="Logout"
                    className="btn-logout"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <form className="login-form">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
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
