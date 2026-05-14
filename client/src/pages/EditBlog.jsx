import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

function EditBlog() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [images, setImages] =
    useState([]);

  const [preview, setPreview] =
    useState([]);

useEffect(() => {

  const fetchBlog = async () => {

    try {

      const res =
        await axios.get(
          `https://natureblogging.onrender.com/api/blogs/${id}`
        );

      setTitle(res.data.title);

      setContent(res.data.content);

      setCategory(res.data.category);

      setPreview(
        res.data.images || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  fetchBlog();

}, [id]);

  

  const updateBlog =
    async (e) => {

      e.preventDefault();

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "content",
        content
      );

      formData.append(
        "category",
        category
      );

      images.forEach((img) => {

        formData.append(
          "images",
          img
        );

      });

      try {

        await axios.put(
          `https://natureblogging.onrender.com/api/blogs/${id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Blog Updated Successfully"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div>

      <Navbar />

      <div
        style={{
          padding: "40px",
          maxWidth: "700px",
          margin: "auto",
        }}
      >

        <h1>Edit Blog</h1>

        <form
          onSubmit={updateBlog}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

          <textarea
            rows="6"
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            required
          />

          <input
            type="text"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            required
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {

              const files =
                Array.from(
                  e.target.files
                );

              setImages(files);

              setPreview(
                files.map((file) =>
                  URL.createObjectURL(
                    file
                  )
                )
              );

            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(150px,1fr))",
              gap: "10px",
            }}
          >

            {preview.map(
              (img, index) => (

                <img
                  key={index}
                  src={img}
                  alt="preview"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                  }}
                />

              )
            )}

          </div>

          <button type="submit">
            Update Blog
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditBlog;