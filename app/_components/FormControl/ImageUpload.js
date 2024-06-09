"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

export default function ImageUpload(props) {
  let previewImageLink =
    "https://t3.ftcdn.net/jpg/01/17/72/36/360_F_117723612_z7zQmUrrpG4IRGQLvgX5nwtwC18ke3qU.jpg";

  const [image, setImage] = useState(null);
  const [imageSizeMaxWarning, setImageSizeMaxWarning] = useState(null);

  const handleImageError = (event) => {
    event.target.src = previewImageLink;
  };

  const upload = (event) => {

    const file = event.target.files[0];
    const fileSize = (file?.size / 1024 / 1024).toFixed(2);

    if( file?.type == 'application/pdf' || file?.type == 'image/png' || file?.type == 'image/jpg' || file?.type == 'image/jpeg') {
      if (fileSize < props.size ) {
        if (props.onChangeHandel) {
          props.onChangeHandel(event);
        }
        setImageSizeMaxWarning(null);
        setImage(event.target.files[0]);
      } else {
        toast.warning("ফাইলের সাইজ 2mb হতে হবে ।");
        setImage(null);
      }
    }else {
        toast.warning('ফাইলের টাইপ .jpg, .jpeg, .png, .pdf হবে ।');
        setImage(null);
    }

  };

  const route = usePathname();

  return (
    <>
      <div
        className={`${route === "/citizen/khotian/create" ? "mb-0" : "mb-5"}`}
      >
        <div>
          <span className="text-xs text-danger">
            {imageSizeMaxWarning ?? ""}
          </span>
        </div>
        <fieldset className="pl-3 border border-primary rounded">
          <legend className="px-2 text-primary text-12 leading-[14.06px]">
            {props.label}
            <span className="text-red-600">
              {props.required == true ? " ** " : ""}
            </span>
          </legend>
          <input
            type="file"
            accept={props.accept ?? "image/*"}
            className="custom-file-input"
            id={props?.id ?? props.name}
            onChange={(e) => upload(e)}
            required={props.required}
            name={props.name}
            style={{ display: "none" }}
          />
          <label
            className="flex justify-between items-center"
            htmlFor={props?.id ?? props.name}
            style={{
              padding: "8px 11px 8px 6px",
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          >
            <label
              style={{
                cursor: "pointer",
              }}
              htmlFor={props?.id ?? props.name}
            >
              {props?.placeholder}
            </label>

            <FontAwesomeIcon
              icon={props?.icon}
              className="w-[15%]"
              style={{ color: "#ebeef4" }}
            />
          </label>
          {props.anyMessage ? (
            <span className="text-danger fs-10">
              {props.anyMessage?.[props.name]?.[0]}
            </span>
          ) : (
            ""
          )}
        </fieldset>
        {props.help ? (
          <span className="font-size-10 capitalize">{props.help}</span>
        ) : (
          ""
        )}
        <span className="text-md text-danger">
          {" ফাইল টাইপ " + props.accept + " ফাইলের সাইজ " + props.size + "mb"}
        </span>

        {/*
            <div className="">                
                {
                image && <img onError={handleImageError} src={image == null ? previewImageLink : URL.createObjectURL(image)} alt="..." className="img-thumbnail image-with-100x100" />
                }
            </div>
            */}

        <div className="text-primary text-500 mt-2">
          {props?.oldImage?.type == "application/pdf"
            ? props?.oldImage?.name
              ? props?.oldImage?.name
              : ""
            : image && (
                <>
                  <img
                    onError={handleImageError}
                    src={
                      image == null
                        ? previewImageLink
                        : URL.createObjectURL(image)
                    }
                    alt="..."
                    className="w-[40%]"
                  />
                  <span>{props?.oldImage?.name}</span>
                </>
              )}
        </div>
      </div>
    </>
  );
}
