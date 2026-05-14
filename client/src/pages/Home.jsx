import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";

function Home() {

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {

    try {

      const res = await axios.get(
        "https://wildguard-backend.onrender.com/api/blogs"
      );

      setBlogs(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const deleteBlog = async (id) => {

    try {

      await axios.delete(
        `https://wildguard-backend.onrender.com/api/blogs/${id}`
      );

      fetchBlogs();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <Navbar />

      <Hero />

      <div
        className="container"
        style={{
          maxWidth: "900px",
          margin: "auto",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >

        <h1>Latest Wildlife Blogs</h1>

        <input
          type="text"
          placeholder="Search wildlife blogs..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "30px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        {

          blogs
            .filter((blog) =>
              blog.title
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )
            .map((blog) => (

              <BlogCard
                key={blog._id}
                blog={blog}
                onDelete={deleteBlog}
              />

            ))

        }

      </div>

    </div>

  );
}

export default Home;