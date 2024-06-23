import React, { useState, useContext } from "react";
import axios from "axios";
import ThemeContext from "../../contexts/ThemeContext";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

import "./style.css";

const SignIn = ({ onLoggedIn, onLoggout, isLoggedIn }) => {
  const userCookie = Cookies.get("user");
  let user;
  if (userCookie) {
    user = JSON.parse(userCookie);
  } else {
    user = [];
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  //
  const [editAvatar, setEditAvatar] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editMajor, setEditMajor] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editIntro, setEditIntro] = useState("");

  const { theme } = useContext(ThemeContext);

  const handleLogin = async (e) => {
    const expirationDateToken = new Date();
    expirationDateToken.setTime(expirationDateToken.getTime() + 15 * 60 * 1000);
    const options = { expires: expirationDateToken };
    if (username === "" || password === "") {
      setError("Không được để trống username hoặc password");
      return;
    } else {
      try {
        // Gửi yêu cầu đăng nhập lên API và nhận dữ liệu người dùng
        const response = await axios.get(
          "https://650d41c5a8b42265ec2be909.mockapi.io/user"
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
          setError("Sai username hoặc password");
        }

        // Xử lý phản hồi từ API
      } catch (error) {
        setError("Đã xảy ra lỗi khi gửi yêu cầu");
      }
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

  const handleEdit = async (id) => {
    try {
      // Gửi yêu cầu đăng nhập lên API và nhận dữ liệu người dùng
      const response = await axios.get(
        ` https://650d41c5a8b42265ec2be909.mockapi.io/user/${id}`
      );

      const { avatar, fullName, age, major, address, intro } = response.data;

      setEdit(true);
      setEditAvatar(avatar);
      setEditName(fullName);
      setEditAge(age);
      setEditMajor(major);
      setEditAddress(address);
      setEditIntro(intro);
      // Xử lý phản hồi từ API
    } catch (error) {
      setError("Đã xảy ra lỗi khi gửi yêu cầu");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userUpdate = {
      avatar: editAvatar,
      fullName: editName,
      age: editAge,
      major: editMajor,
      address: editAddress,
      intro: editIntro,
    };
    try {
      const currentUser = await axios.get(
        `https://650d41c5a8b42265ec2be909.mockapi.io/user/${user.id}`
      );
      const updatedUser = { ...currentUser.data, ...userUpdate };
      axios.put(
        `https://650d41c5a8b42265ec2be909.mockapi.io/user/${user.id}`,
        updatedUser
      );
      Cookies.set("user", JSON.stringify(updatedUser));
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
          <h2 className="welcome">
            Chào mừng <span className="user_name">{user.fullName}</span> đã quay
            lại
          </h2>

          <div className="item-info">
            <div className="item-img">
              <img src={user.avatar} alt="Avatar" title="Avatar Use" />
            </div>

            <div className="item-infomation">
              <div className="item">
                <p>Họ và Tên :</p>
                {edit ? (
                  <input
                    type="text"
                    id="full-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  <strong>{user.fullName}</strong>
                )}
              </div>

              <div className="item">
                <p>Tuổi :</p>
                {edit ? (
                  <input
                    type="number"
                    id="user-age"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                  />
                ) : (
                  <strong>{user.age}</strong>
                )}
              </div>

              <div className="item">
                <p>Nghề nghiệp :</p>
                {edit ? (
                  <input
                    type="text"
                    id="user-major"
                    value={editMajor}
                    onChange={(e) => setEditMajor(e.target.value)}
                  />
                ) : (
                  <strong>{user.major}</strong>
                )}
              </div>

              <div className="item">
                <p>Địa chỉ :</p>
                {edit ? (
                  <input
                    type="text"
                    id="user-address"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                  />
                ) : (
                  <strong>{user.address}</strong>
                )}
              </div>
            </div>
          </div>
          <>
            <fieldset className="fieldset">
              <legend>
                <i>Lời giới thiệu :</i>
              </legend>
              {edit ? (
                <textarea
                  title="intro"
                  id="user-intro"
                  value={editIntro}
                  onChange={(e) => setEditIntro(e.target.value)}
                ></textarea>
              ) : (
                <sub>{user.intro}</sub>
              )}
            </fieldset>
            {edit ? (
              <div className="button-user">
                <button
                  type="button"
                  onClick={() => setEdit(false)}
                  title="cancel"
                  className="user-btn-cancel"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  title="update"
                  className="user-btn-update"
                >
                  UPDATE
                </button>
              </div>
            ) : (
              <div className="footer-account">
                <button
                  type="button"
                  title="Logout"
                  className="btn-logout"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
                <button
                  type="button"
                  className="button-setting"
                  onClick={() => handleEdit(user.id)}
                  title="edit"
                >
                  edit
                </button>
              </div>
            )}
          </>
        </div>
      ) : (
        <>
          <h1 className="login-title">Login</h1>
          <form className="login-form">
            <input
              type="text"
              className="login-name"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              onKeyDown={handleKeyPress}
            />
            <input
              type="password"
              className="login-password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              autoComplete="autoComplete"
            />
            <p>
              Bạn chưa có tài khoản{" "}
              <NavLink to="/sign-up" className="dang-ky">
                Đăng Ký
              </NavLink>
            </p>
            <button type="button" title="Login" onClick={handleLogin}>
              Đăng nhập
            </button>
            {error && <p>{error}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default SignIn;
