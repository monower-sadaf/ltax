"use client";
import React, { useState } from "react";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";
import dynamic from "next/dynamic";
import { number_check, passwordStrengthChecker } from "@/halpers/helper";
import { destroyCookie, setCookie, parseCookies } from "nookies";

const InputField = dynamic(() =>
  import("@/app/_components/FormControl/InputField")
);
const SubmitButton = dynamic(() =>
  import("@/app/_components/Buttons/SubmitButton")
);
const OTPField = dynamic(() =>
  import("@/app/_components/FormControl/OTPField")
);
const PasswordField = dynamic(() =>
  import("@/app/_components/FormControl/PasswordField")
);

const ChangePassword = ({c}) => {
  const router = useRouter();
  const [formInputs, setFormInputs] = useState({});
  const [serverMessage, setServerMessage] = useState(false);
  const [staper, setStaper] = useState("mobile");
  const [formTitle, setFormTitle] = useState("পাসওয়ার্ড পরিবর্তন");
  const [submitBtnStatus, setSubmitBtnStatus] = useState("success");
  const [valueLength, setValueLength] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState();

  /* const cookies = parseCookies();
  const citizen = JSON.parse(cookies.citizen); */



  const citizenInfo = c;

  let tempC =
    c?.data?.username == undefined ? formInputs?.mobile : c?.data?.username;

  const token = getTokenFromCookie();

  const headersOption = {
    Authorization: token,
    "content-type": "application/json",
  };

  let pass = "";
  const [check, setCheck] = useState({});

  const [verifiedOTP, setVerifiedOTP] = useState("");

  const mobileVarification = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        process.env.BASE_URL + "/api/otpSend/" + tempC,
        {},
        { headers: headersOption }
      );

      if (res.data.data == "") {
        setMessage(res.data.msg);
        toast.error(res.data.msg);
      }

      if (res.data.status == 200) {
        if (res?.data?.data?.otp != "undefined")
          setVerifiedOTP(res?.data?.data?.otp);
        toast.success("আপনার মোবাইল OTP পাঠানো হয়েছে ।");
        setSubmitBtnStatus("success");
        setFormTitle("OTP যাচাই");
        setStaper("otp");
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      setSubmitBtnStatus("success");
      throw error;
    }
  };

  const concatenatedString = (array) => {
    return array.join("");
  };

  const otpCheck = async (e) => {
    e.preventDefault();

    const otp =
      formInputs?.opt != undefined ? concatenatedString(formInputs?.opt) : "";

    if (otp.length == 6) {
      try {
        const res = await axios.post(
          process.env.BASE_URL + "/api/otp",
          {
            otp: otp,
            verifiedOTP: verifiedOTP,
            mobile: tempC,
          },
          { headers: headersOption }
        );

        if (res.data.data == "") {
          toast.error("OTP তথ্য পাওয়া যায় নি");
          setMessage("OTP তথ্য পাওয়া যায় নি");
        }

        if (res.data.status == "true") {
          toast.success(
            "আপনার ওটিপি মিলে গেছে, আপনার পাসওয়ার্ড পরিবর্তন করুন।"
          );
          setSubmitBtnStatus("loading");
          setFormTitle("পাসওয়ার্ড পরিবর্তন");
          setStaper("password");
          let signupIfo = {
            staper: staper,
            formInputs: formInputs,
            formTitle: formTitle,
          };
          setSubmitBtnStatus("success");
        }
      } catch (error) {
        setSubmitBtnStatus("success");
        console.error("Error token:", error);
        throw error;
      }
    } else {
      toast.error("OTP ৬ ডিজিটের হবে ।");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setSubmitBtnStatus("loading");
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
        formInputs,
        { headers: headersOption }
      );

      if (res.data.status == "true") {
        setSubmitBtnStatus("success");
        toast.success(
          "আপনার পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে । নতুন পাসওয়ার্ড ব্যাবহার করে লগিন করুন ।"
        );
        setStaper("otp");
        let signupIfo = {
          staper: staper,
          formInputs: formInputs,
          formTitle: formTitle,
        };

        setSubmitBtnStatus("success");
        destroyCookie("citizen");
        sessionStorage.removeItem("citizen");
        router.push("/login");
      }
    } catch (error) {
      setSubmitBtnStatus("success");
      throw error;
    }

    setSubmitBtnStatus("loading");
    setFormTitle("পাসওয়ার্ড যাচাই");
    setStaper("password");
    let signupIfo = {
      staper: staper,
      formInputs: formInputs,
      formTitle: formTitle,
    };
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

    setFormInputs((prevState) => ({
      ...prevState,
      ["opt"]: newOtp,
    }));
  };

  const [passwordMessage, setPasswordMessage] = useState("");
  const [isWrongPass, setIsWrongPass] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");

  const conformPass = (e) => {
    const { name, value } = e.target;

    setConfirmPass(value);

    if (formInputs?.password === value) {
      setSubmitBtnStatus("success");
      setPasswordMessage("");
      setIsWrongPass(false);
    } else {
      setSubmitBtnStatus("disabled");
      setPasswordMessage(
        "আপনার পাসওয়ার্ডটি একই নয় । উপরের পাসওয়ার্ড এর সদৃশ প্রদান করুন"
      );
      setIsWrongPass(true);
    }
  };

  const firstPassword = (e) => {
    const { name, value } = e.target;

    pass = pass + value;

    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    let checked = passwordStrengthChecker(pass);

    setCheck(checked);

    {
      /*
            console.log('value === confirmPass : ',value === confirmPass);

            if (value === confirmPass) {
                setSubmitBtnStatus("success")
                setPasswordMessage("")
                setIsWrongPass(false)
                console.log('success');
            } else {
                setSubmitBtnStatus("disabled")
                setPasswordMessage("The password must match the final password.")
                setIsWrongPass(true)
            }
        */
    }
  };

  const phoneNumber = (event) => {
    const { value, name } = event.target;
    if (!value) {
      setFormInputs((pre) => ({
        ...pre,
        [name]: "",
      }));
    }
    if (Number.isInteger(parseInt(value))) {
      if (number_check(value) && value?.length < 12) {
        setFormInputs((pre) => ({
          ...pre,
          [name]: value,
        }));
      }
    }
  };

  return (
    <div className="bg-white border border-primary w-[95%] md:w-[60%] rounded-md">
      <div className="bg-primary rounded-t py-4">
        <p className="text-white text-center text-20"> {formTitle} </p>
      </div>

      <div className="px-4 lg:px-12 py-3">
        {staper && staper == "mobile" ? (
          <>
            <form onSubmit={mobileVarification}>
              <div className="mb-3">
                <InputField
                  label="মোবাইল নম্বর"
                  name="mobile"
                  help=""
                  required={true}
                  type="text"
                  placeholder="মোবাইল নম্বর"
                  anyMessage={serverMessage}
                  minL={11}
                  maxL={11}
                  icon={faPhone}
                  eventHandel={phoneNumber}
                />
              </div>

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
                help="(আপনার পাসওয়ার্ড সর্বনিম্ন ৮ ডিজিটের হতে হবে । পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর, একটি ছোট হাতের অক্ষর, একটি সংখ্যা এবং একটি বিশেষ অক্ষর থাকতে হবে । )"
                required={true}
                type="password"
                value={formInputs?.password}
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
                onChange={conformPass}
              />

              <div className="flex justify-end">
                {submitBtnStatus == "success" && (
                  <button className="text-10 leading-[10.11px] lg:text-14 lg:leading-[14.16px] inline-flex items-center space-x-3 bg-primary px-5 py-2.5 rounded-md text-white border border-primary group hover:bg-white hover:text-primary">
                    <span>সাবমিট</span>
                    <svg
                      className="fill-white group-hover:fill-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z" />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
