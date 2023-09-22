import "./style.css";
import ThemeContext from "../../contexts/ThemeContext";

import { useContext } from "react";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const classHeader =
    theme === "light" ? "footer footer_bg-light" : "footer footer_bg-dark";

  return (
    <div className={classHeader}>
      <div className="footer_text">
        <p>Chịu trách nhiệm nội dung: NHT</p>
        <p>© 2023 Công ty Cổ phần CIJS87</p>
        <p>Địa chỉ: Ở đâu còn lâu mới nói ...</p>
        <p>Số điện thoại: 02888888888</p>
      </div>
      <div className="footer_text">
        <p className="paragraph">
          Giấy phép thiết lập APP số 99/GP-BTTTT,
          <span> Tự ký ngày: 99/99/9999</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
