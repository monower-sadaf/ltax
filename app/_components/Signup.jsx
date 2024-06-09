"use client";
import InputField from "./FormControl/InputField";
import { number_check, ls } from "halpers/helper.js";
import React, { useEffect, useState } from "react";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import OTPField from "./FormControl/OTPField";
import PasswordField from "./FormControl/PasswordField";
import { getTokenFromCookie } from "../_utils/cookieUtils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { passwordStrengthChecker } from "@/halpers/helper";
import { citizenSignup } from "../_api/api";

const Signup = () => {
  const router = useRouter();
  const [fromInputs, setFromInputs] = useState({});
  const [serverMessage, setServerMessage] = useState(false);
  const [staper, setStaper] = useState("mobile");
  const [formTitle, setFormTitle] = useState("নাগরিক নিবন্ধন");
  const [submitBtnStatus, setSubmitBtnStatus] = useState("success");
  const [valueLength, setValueLength] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState();
  const [res, setRes] = useState({});

  let pass = "";
  const [check, setCheck] = useState({});

  const token = getTokenFromCookie();

  const concatenatedString = (array) => {
    return array.join(" ");
  };

  const headersOption = {
    Authorization: token,
    "content-type": "application/json",
  };

  const mobileVarification = (e) => {
    e.preventDefault();
    setSubmitBtnStatus("loading");
    citizenSignup(fromInputs).then((data) => {
      if (data?.status == "true") {
        setSubmitBtnStatus("success");
        setFormTitle("OTP যাচাই");
        setStaper("otp");
      } else {
        toast.error(data.msg);
        console.log(data.msg);
        setTimeout(() => {
          setSubmitBtnStatus("success");
        }, 6000);
      }

      if (data?.data.length == 0) {
        setMessage(data.msg);
      }
    });
  };

  const otpCheck = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        process.env.BASE_URL + "/api/otp",
        fromInputs,
        { headers: headersOption }
      );

      if (res.data.data == "") {
        setMessage("OTP তথ্য পাওয়া যায় নি");
      }

      if (res.data.status == "true") {
        setSubmitBtnStatus("loading");
        setFormTitle("পাসওয়ার্ড যাচাই করুন");
        setStaper("password");
        let signupIfo = {
          staper: staper,
          fromInputs: fromInputs,
          formTitle: formTitle,
        };
        ls("signupIfo", JSON.stringify(signupIfo));

        setSubmitBtnStatus("success");
      }
    } catch (error) {
      setSubmitBtnStatus("success");
      console.error("Error token:", error);
      throw error;
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (check?.status == false) {
      toast.error(
        "আপনার পাসওয়ার্ড সর্বনিম্ন ৮ ডিজিটের হতে হবে । পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর, একটি ছোট হাতের অক্ষর, একটি সংখ্যা এবং একটি বিশেষ অক্ষর থাকতে হবে । "
      );
      setSubmitBtnStatus("success");
      return false;
    }
    try {
      const res = await axios.post(
        process.env.BASE_URL + "/api/newPassSet",
        fromInputs,
        { headers: headersOption }
      );

      if (res.data.status == "true") {
        setSubmitBtnStatus("success");
        toast.success(
          "আপনি সফলভাবে নিবন্ধিত হয়েছেন । আপনার  ইউজারনেম এবং পাসওয়ার্ড ব্যবহার করে লগইন করুন ।"
        );
        setStaper("otp");
        let signupIfo = {
          staper: staper,
          fromInputs: fromInputs,
          formTitle: formTitle,
        };

        ls("signupIfo", JSON.stringify(signupIfo));
        setSubmitBtnStatus("success");
        router.push("/login");
      }
    } catch (error) {
      setSubmitBtnStatus("success");
      throw error;
    }

    setSubmitBtnStatus("loading");
    setFormTitle("পাসওয়ার্ড যাচাই করুন");
    setStaper("password");
    let signupIfo = {
      staper: staper,
      fromInputs: fromInputs,
      formTitle: formTitle,
    };
    ls("signupIfo", JSON.stringify(signupIfo));
    setSubmitBtnStatus("success");
  };

  const onChange = (value, index) => {
    let newOtp = valueLength?.map((item, index2) => {
      if (index == index2) {
        return value ? parseInt(value) : "";
      } else {
        return item;
      }
    });

    setValueLength(newOtp);

    setFromInputs((prevState) => ({
      ...prevState,
      ["opt"]: newOtp,
    }));
  };

  const phoneNumber = (event) => {
    const { value, name } = event.target;
    if (!value) {
      setFromInputs((pre) => ({
        ...pre,
        [name]: "",
      }));
    }
    if (Number.isInteger(parseInt(value))) {
      if (number_check(value) && value?.length < 12) {
        setFromInputs((pre) => ({
          ...pre,
          [name]: value,
        }));
      }
    }
  };

  const fromData = (e) => {
    const { name, value } = e.target;

    setFromInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const dobDate = (data) => {
    setFromInputs((pre) => ({
      ...pre,
      ["dob"]: data?.datestr.replace(/[-]/g, "/"),
    }));
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() - 15);
    setCurrentDate(newDate);
  }, []);

  const [passwordMessage, setPasswordMessage] = useState("");
  const [isWrongPass, setIsWrongPass] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");

  const conformPass = (e) => {
    const { name, value } = e.target;

    setConfirmPass(value);

    if (fromInputs?.password === value) {
      setSubmitBtnStatus("success");
      setPasswordMessage("");
      setIsWrongPass(false);
    } else {
      setSubmitBtnStatus("disabled");
      setPasswordMessage("The password must match the final password.");
      setIsWrongPass(true);
    }
  };

  const firstPassword = (e) => {
    const { name, value } = e.target;

    setFromInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    pass = pass + value;

    let checked = passwordStrengthChecker(pass);

    setCheck(checked);

    if (value === confirmPass) {
      setSubmitBtnStatus("success");
      setPasswordMessage("");
      setIsWrongPass(false);
      console.log("success");
    } else {
      setSubmitBtnStatus("disabled");
      setPasswordMessage("The password must match the final password.");
      setIsWrongPass(true);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full  py-3">
        <div className="flex justify-center">
          <div className="border border-primary bg-white w-[95%] md:w-[80%] rounded-md">
            {/* <div className="bg-primary rounded-t py-4">
              <p className="text-white text-center text-20"> {formTitle} </p>
            </div> */}

            <div className="px-4 lg:px-12 py-3">
              {staper && staper == "mobile" ? (
                <>
                  <form onSubmit={mobileVarification}>
                    <div className="mb-3">
                      <InputField
                        label="মোবাইল নম্বর"
                        eventHandel={phoneNumber}
                        name="mobile"
                        help=""
                        required={true}
                        type="text"
                        value={fromInputs?.mobile}
                        placeholder="মোবাইল নম্বর"
                        anyMessage={serverMessage}
                        minL={11}
                        maxL={11}
                        icon={faPhone}
                      />
                    </div>

                    <div className="flex justify-end">
                      {/*                                         <button className={`text-10 leading-[10.11px] lg:text-14 lg:leading-[14.16px] inline-flex items-center space-x-3 bg-primary px-5 py-2.5 rounded-md text-white border border-primary group hover:bg-white hover:text-primary cursor-not-allowed`}>
                                            <span>পরবর্তী</span>
                                            <svg className="fill-white group-hover:fill-primary" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z"/></svg>
                                        </button> */}
                      <button
                        disabled={submitBtnStatus == "loading"}
                        type="submit"
                        className={`text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] bg-primary text-white border border-primary group hover:bg-white hover:text-primary inline-flex items-center space-x-2 px-3 py-2 rounded-md ${
                          submitBtnStatus == "loading" && "cursor-not-allowed"
                        }`}
                      >
                        {submitBtnStatus == "loading" ? (
                          <>
                            <svg
                              className="fill-blue-400 animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 512 512"
                            >
                              <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                            </svg>
                            <span>লোড হচ্ছে...</span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="fill-white group-hover:fill-primary"
                              width="17"
                              height="18"
                              viewBox="0 0 17 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.775 2.7125L11.7875 2.7L13.025 3.9375V1.125L12.4 0.5H1.15L0.5125 1.125V1.74125L0.5 1.75V14.6125L0.95 15.1875L7.2 17.3375L8 16.75V15.5H12.4L13.025 14.875V12.0625L11.775 13.3125V14.25H8V3.8875L7.5875 3.3125L3.045 1.75H11.775V2.7125ZM6.75 15.85L1.75 14.175V2.65L6.75 4.325V15.85ZM10.6125 7.4125H16.825V8.6625H10.6625L12.65 10.6625L11.7625 11.5375L8.675 8.4625V7.575L11.7875 4.475L12.6625 5.35L10.6125 7.4125Z"
                              />
                            </svg>
                            <span>পরবর্তী</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                ""
              )}

              {staper == "otp" ? (
                <>
                  <form onSubmit={otpCheck}>
                    <OTPField valueLength={valueLength} onChange={onChange} />

                    <div className="flex justify-end">
                      <button className="text-10 leading-[10.11px] lg:text-14 lg:leading-[14.16px] inline-flex items-center space-x-3 bg-primary  px-5 py-2.5 rounded-md text-white border border-primary group hover:bg-white hover:text-primary">
                        <span>পরবর্তী</span>
                        <svg
                          className="fill-white group-hover:fill-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                        >
                          <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                ""
              )}

              {staper == "password" ? (
                <>
                  <form onSubmit={login}>
                    <PasswordField
                      label="পাসওয়ার্ড"
                      eventHandel={firstPassword}
                      name="password"
                      help="( আপনার পাসওয়ার্ড সর্বনিম্ন ৮ ডিজিটের হতে হবে ।
                                            পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর, একটি ছোট হাতের অক্ষর, একটি সংখ্যা এবং একটি বিশেষ অক্ষর থাকতে হবে । )"
                      required={true}
                      type="password"
                      value={fromInputs?.password}
                      placeholder="পাসওয়ার্ড"
                      anyMessage={serverMessage}
                      minL={8}
                      maxL={30}
                    />

                    <PasswordField
                      label="পাসওয়ার্ড নিশ্চিত করুন"
                      eventHandel={conformPass}
                      name="password"
                      help={passwordMessage}
                      className={`font-size-10 ${
                        isWrongPass ? "text-rose-500" : "text-dark"
                      }`}
                      required={true}
                      value={confirmPass}
                      type="password"
                      placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                      anyMessage={serverMessage}
                      minL="8"
                    />

                    {submitBtnStatus == "success" && (
                      <div className="flex justify-end">
                        <button className="text-10 leading-[10.11px] lg:text-14 lg:leading-[14.16px] inline-flex items-center space-x-3 bg-primary px-5 py-2.5 rounded-md text-white border border-primary group hover:bg-white hover:text-primary">
                          <span>পরবর্তী</span>
                          <svg
                            className="fill-white group-hover:fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                          >
                            <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </form>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
