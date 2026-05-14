import React, {
  useState,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { AuthContext }
from "../context/AuthContext";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const loginUser = (e) => {

    e.preventDefault();

    if (
      email === "admin@gmail.com" &&
      password === "123456"
    ) {

      login();

      alert("Login Successful");

      navigate("/admin");

    } else {

      alert("Invalid Credentials");

    }

  };

  return (
    <div>

      <Navbar />

      <div
        style={{
          width: "400px",
          margin: "60px auto",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >

        <h1>Admin Login</h1>

        <form
          onSubmit={loginUser}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;