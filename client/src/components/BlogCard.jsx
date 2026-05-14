import React, {
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  Link,
} from "react-router-dom";

function BlogCard({ blog, onDelete }) {

  const { isLoggedIn } =
    useContext(AuthContext);

  return (

    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "14px",
        overflow: "hidden",
        marginBottom: "30px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >

      <Link to={`/blog/${blog._id}`}>

        <img
          src={
            blog.image ||
            "https://images.unsplash.com/photo-1546182990-dffeafbe841d"
          }
          alt="Wildlife"
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "cover",
            display: "block",
          }}
        />

      </Link>

      <div style={{ padding: "20px" }}>

        <span
          style={{
            backgroundColor: "#d8f3dc",
            color: "#1b4332",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
          }}
        >
          {blog.category}
        </span>

        <h2 style={{ marginTop: "15px" }}>
          {blog.title}
        </h2>

        <p
          style={{
            color: "#555",
            lineHeight: "1.6",
          }}
        >
          {blog.content.substring(0, 120)}...
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
          }}
        >

          <Link to={`/blog/${blog._id}`}>
            <button>
              Read More
            </button>
          </Link>

          {isLoggedIn && (

            <>

              <Link to={`/edit/${blog._id}`}>
                <button>
                  Edit
                </button>
              </Link>

              <button
                onClick={() =>
                  onDelete(blog._id)
                }
                style={{
                  backgroundColor:
                    "#d62828",
                }}
              >
                Delete
              </button>

            </>

          )}

        </div>

      </div>

    </div>

  );
}

export default BlogCard;