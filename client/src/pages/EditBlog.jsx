import React,
{
  useEffect,
  useState,
  useRef,
} from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ReactCrop from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

import Navbar from "../components/Navbar";

function EditBlog() {

  const { id } = useParams();

  const navigate =
    useNavigate();

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

      setTitle(res.data.title);

      setContent(res.data.content);

      setCategory(
        res.data.category
      );

      setPreview(res.data.image);

    } catch (error) {

      console.log(error);

    }

  };

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

  const updateBlog = async (e) => {

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

    if (image) {

      formData.append(
        "image",
        image
      );

    }

    try {

      await axios.put(
        `https://wildguard-backend.onrender.com/api/blogs/${id}`,
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
              setTitle(
                e.target.value
              )
            }
          />

          <textarea
            rows="6"
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
          />

          <input
            type="text"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
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
          />

          <button type="submit">
            Update Blog
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditBlog;