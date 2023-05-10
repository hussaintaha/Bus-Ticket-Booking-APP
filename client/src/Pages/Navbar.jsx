import { useNavigate } from "react-router-dom";
import { success } from "../Utils/notification";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../Redux/authentication/auth.action";


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.data.token);
  const handlelogout = () => {
    Cookies.remove("jwttoken");
    Cookies.remove("userid");
    dispatch(logoutAPI());
    navigate("/");
    success("Logout Successfully");
  };
  return (

    <nav className="navbar navbar-light navbar-expand-lg bg-body-tertiary "
    style={{backgroundImage:"linear-gradient( 95.2deg, rgba(173,252,234,1) 26.8%, rgba(192,229,246,1) 64% )"}}>
      <div className="container-fluid">
        <a
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img
            style={{
              height: "50px",
              width: "90px"
            }}
            src={require("../Images/bus.png")} alt="BigCo Inc. logo" />
        </a>
        <a
          className="navbar-brand"
          style={{
            cursor: "pointer",
            color: "#5d5d5d"
          }}
          onClick={() => navigate("/")}
        >
          ONLINE BUS BOOKING
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0">
            <li className="nav-item">

            </li>
            <li className="nav-item">

            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                style={{
                  cursor: "pointer",
                  color: "#5d5d5d"
                }}
                onClick={() => navigate(`/service`)}
              >
                Our Services
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                style={{
                  cursor: "pointer",
                  color: "#5d5d5d"
                }}
                onClick={() => navigate(`/about`)}
              >
                About Us
              </a>
            </li>
          </ul>
          <div style={{
            margin: "0px 30px"
          }}>
            <a
              className="nav-link active"
              style={{
                cursor: "pointer",
                color: "#5d5d5d"
              }}
              onClick={() => navigate(`/myticket`)}
            >
              My Tickets
            </a>

          </div>
          <div>
            {token ? (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => handlelogout()}
              >
                Logout
              </button>
            ) : (
              <div>
                {" "}
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
