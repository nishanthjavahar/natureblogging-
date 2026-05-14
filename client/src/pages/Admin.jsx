import React,
{
  useState,
  useContext,
  useRef,
} from "react";

import axios from "axios";

import ReactCrop from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

import Navbar from "../components/Navbar";

import { Navigate }
from "react-router-dom";

import { AuthContext }
from "../context/AuthContext";

function Admin() {

  const { isLoggedIn } =
    useContext(AuthContext);

  const imgRef =
    useRef(null);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [crop, setCrop] =
    useState();

  const [completedCrop,
    setCompletedCrop] =
    useState(null);

  // IMPORTANT:
  // Login check AFTER hooks

  if (!isLoggedIn) {

    return <Navigate to="/login" />;

  }

  const cropImage = () => {

    if (
      !completedCrop ||
      !imgRef.current
    ) return;

    const imageElement =
      imgRef.current;

    const canvas =
      document.createElement(
        "canvas"
      );

    const scaleX =
      imageElement.naturalWidth /
      imageElement.width;

    const scaleY =
      imageElement.naturalHeight /
      imageElement.height;

    const pixelRatio =
      window.devicePixelRatio;

    canvas.width =
      completedCrop.width *
      pixelRatio;

    canvas.height =
      completedCrop.height *
      pixelRatio;

    const ctx =
      canvas.getContext("2d");

    ctx.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      0,
      0
    );

    ctx.imageSmoothingQuality =
      "high";

    ctx.drawImage(
      imageElement,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width *
        scaleX,
      completedCrop.height *
        scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {

      if (!blob) return;

      const croppedFile =
        new File(
          [blob],
          "cropped.jpg",
          {
            type:
              "image/jpeg",
          }
        );

      setImage(croppedFile);

      setPreview(
        URL.createObjectURL(
          croppedFile
        )
      );

    },
    "image/jpeg",
    1);

  };

  const submitBlog = async (e) => {

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

    formData.append(
      "image",
      image
    );

    try {

      await axios.post(
        "https://wildguard-backend.onrender.com/api/blogs",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Blog Added Successfully"
      );

      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);
      setPreview("");

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

        <h1>
          Add Wildlife Blog
        </h1>

        <form
          onSubmit={submitBlog}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >

          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            required
          />

          <textarea
            rows="6"
            placeholder="Blog Content"
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
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            required
          />

          {preview && (

            <div>

              <h3>
                Crop Image
              </h3>

              <ReactCrop
                crop={crop}
                onChange={(c) =>
                  setCrop(c)
                }
                onComplete={(c) =>
                  setCompletedCrop(c)
                }
              >

                <img
                  ref={imgRef}
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "500px",
                  }}
                />

              </ReactCrop>

              <br />

              <button
                type="button"
                onClick={cropImage}
              >
                Crop Image
              </button>

            </div>

          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {

              const file =
                e.target.files[0];

              if (!file) return;

              setImage(file);

              setPreview(
                URL.createObjectURL(
                  file
                )
              );

            }}
            required
          />

          <button type="submit">
            Add Blog
          </button>

        </form>

      </div>

    </div>
  );
}

export default Admin;