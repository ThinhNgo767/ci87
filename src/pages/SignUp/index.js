import "./style.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [code, setCode] = useState("");
  const [errorMessenger, setErrorMessenger] = useState("");

  const navigate = useNavigate();

  const today = new Date();
  const referralCode = "NHTLOUIS";

  const handleRegister = async () => {
    const newUser = {
      createdAt: today,
      avatar: "",
      userName: username,
      password: password,
      fullName: "",
      age: "",
      address: address,
      intro: introduce,
      todoTask: [],
    };

    if (username === "" || password === "") {
      setErrorMessenger("Bạn chưa điền username hoặc password");
    } else if (code !== referralCode || code === "") {
      setErrorMessenger(
        "Bạn chưa điền referral code hoặc referral code không đúng!"
      );
    } else {
      axios
        .get("https://650d41c5a8b42265ec2be909.mockapi.io/user/")
        .then((response) => {
          const isUser = response.data.find((u) => u.userName === username);
          if (isUser) {
            setErrorMessenger("Tài khoản đã tồn tại");
            return;
          } else {
            try {
              const response = axios.post(
                "https://650d41c5a8b42265ec2be909.mockapi.io/user",
                newUser
              );

              if (response) {
                setUsername("");
                setPassword("");
                setAddress("");
                setIntroduce("");
                navigate("/sign-in");
              }
            } catch (error) {
              console.error(error);
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="sign-up">
      <h1 className="register">Register</h1>
      <p className="signup-item">
        <label htmlFor="signup-name">UserName</label>
        <input
          type="text"
          id="signup-name"
          onChange={(e) => setUsername(e.target.value)}
        />
      </p>
      <p className="signup-item">
        <label htmlFor="signup-pass">Password</label>
        <input
          type="password"
          id="signup-pass"
          onChange={(e) => setPassword(e.target.value)}
        />
      </p>
      <p className="signup-item">
        <label htmlFor="signup-address">Address</label>
        <input
          type="text"
          id="signup-address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </p>
      <p className="signup-item">
        <label htmlFor="signup-intro">Introduce</label>
        <textarea
          id="signup-intro"
          onChange={(e) => setIntroduce(e.target.value)}
        ></textarea>
      </p>
      <p className="signup-item">
        <label htmlFor="signup-code">Referral code</label>
        <input
          type="text"
          id="signup-code"
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />
      </p>
      <h5 className="errorMessenger">{errorMessenger}</h5>
      <button className="submit-signup" onClick={handleRegister}>
        Submit
      </button>
    </div>
  );
};

export default SignUp;
