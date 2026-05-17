import React,
{
  useContext,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

function Navbar() {

  const {
    isLoggedIn,
    logout,
  } = useContext(AuthContext);

  const navigate =
    useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (
    <nav
  style={{
    backgroundColor: "#d8f3dc",
    padding: "15px 30px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",

    position: "sticky",
    top: "0",
    zIndex: "999",
    width: "100%",
    boxSizing: "border-box",
  }}
>

      <h2
        style={{
          color: "#1b4332",
        }}
      >
        WildGuard
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >

        <Link to="/">
          Home
        </Link>

        {!isLoggedIn ? (

          <Link to="/login">
            Login
          </Link>

        ) : (

          <>
            <Link to="/admin">
              Admin
            </Link>

            <button
              onClick={handleLogout}
            >
              Logout
            </button>
          </>

        )}

      </div>

    </nav>
  );
}

export default Navbar;