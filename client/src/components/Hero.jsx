import React from "react";

function Hero() {

  return (

    <div
      style={{
        padding: "35px 20px",
        background:
          "linear-gradient(to bottom, #dff3e3, #eef7ef)",
        textAlign: "center",
        position: "relative",
      }}
    >

      <h1
        style={{
          fontSize: "2.5rem",
          color: "#1f5132",
          marginBottom: "8px",
          marginTop: "0",
        }}
      >
        WildGuard
      </h1>

      <p
        style={{
          fontSize: "1rem",
          color: "#345c46",
          margin: 0,
        }}
      >
        Protecting Wildlife Through Stories
      </p>

    </div>

  );
}

export default Hero;