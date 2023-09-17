import "./style.css"
import ThemeContext from "../../contexts/ThemeContext";

import { useContext } from "react";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const classHeader = theme === "light" ? "footer footer_bg-light" :"footer footer_bg-dark"

  return (
    <div className={classHeader}>
      <div className="footer_text">
        <p>Chịu trách nhiệm nội dung: NHT</p>
        <p>© 2023 Công ty Cổ phần CIJS87</p>
        <p>Địa chỉ: Số 999 Nơi Xa Xôi, P. Ko Nắng Noi, Quận Chảy Mồ Hôi</p>
        <p>Số điện thoại: 02888888888</p>
      </div>
      <p>Giấy phép thiết lập MXH số 99/GP-BTTTT, Ký ngày: 99/99/9999</p>
    </div>
  );
};

export default Footer;
