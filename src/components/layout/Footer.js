import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </li>
        <li>
          <Link to="/profile">profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
