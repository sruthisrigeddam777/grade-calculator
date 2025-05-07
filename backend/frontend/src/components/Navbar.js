import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import "./Navbar.css"; // Import the CSS file for custom styles

export default function Navbar() {
  let style1 = {
    position: "fixed",
    top: "0",
    width: "100%",
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(40, 14, 16, 0.7)", // Updated color with transparency
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg Navbar1" style={style1}>
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">Navbar</Link >
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link >
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link" aria-current="page" to="/Student">Student</Link >
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link" aria-current="page" to="/Profile">Profile</Link >
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link" aria-current="page" to="/Login">Login</Link >
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link" aria-current="page" to="/Register">Grant Access</Link >
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link" aria-current="page" to="/Viewer">Viewer</Link >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
