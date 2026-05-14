import React,
{
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

function BlogDetails() {

  const { id } = useParams();

  const [blog, setBlog] =
    useState(null);

useEffect(() => {

  fetchBlog();

  // eslint-disable-next-line

}, []);

  const fetchBlog = async () => {

    try {

      const res =
        await axios.get(
          `https://wildguard-backend.onrender.com/api/blogs/${id}`
        );

      setBlog(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!blog) {

    return <h2>Loading...</h2>;

  }

  return (
    <div>

      <Navbar />

      <div
        style={{
          width: "80%",
          margin: "40px auto",
          backgroundColor: "white",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >

        <img
          src={
            blog.image ||
            "https://images.unsplash.com/photo-1546182990-dffeafbe841d"
          }
          alt="Wildlife"
          style={{
            width: "100%",
            maxHeight: "600px",
            objectFit: "contain",
            backgroundColor: "#eef5ee",
          }}
        />

        <div
          style={{
            padding: "30px",
          }}
        >

          <span
            style={{
              backgroundColor:
                "#d8f3dc",
              color: "#1b4332",
              padding:
                "6px 12px",
              borderRadius: "20px",
            }}
          >
            {blog.category}
          </span>

          <h1
            style={{
              marginTop: "20px",
            }}
          >
            {blog.title}
          </h1>

          <p
            style={{
              lineHeight: "1.8",
              color: "#444",
            }}
          >
            {blog.content}
          </p>

        </div>

      </div>

    </div>
  );
}

export default BlogDetails;