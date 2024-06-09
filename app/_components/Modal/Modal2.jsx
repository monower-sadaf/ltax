"use client";

import { useState, FormEvent } from "react";

const Modal2 = () => {
  const [hidden, setHidden] = useState(true);
  const openModal = () => {
    setHidden(false);
  };

  const closeModal = () => {
    setHidden(true);
  };


  const HandleSubmit = async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    setHidden(true);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="text-14 leading-[14.16px] text-white bg-primary p-3 flex items-center space-x-2 rounded-md"
      >
        <span>সংস্থার অন্তর্ভুক্ত হন</span>
        <span>
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 0.1875C3.28906 0.1875 0.6875 2.78906 0.6875 6C0.6875 9.21094 3.28906 11.8125 6.5 11.8125C9.71094 11.8125 12.3125 9.21094 12.3125 6C12.3125 2.78906 9.71094 0.1875 6.5 0.1875ZM9.875 6.65625C9.875 6.81094 9.74844 6.9375 9.59375 6.9375L7.4375 6.9375L7.4375 9.09375C7.4375 9.24844 7.31094 9.375 7.15625 9.375H5.84375C5.68906 9.375 5.5625 9.24844 5.5625 9.09375L5.5625 6.9375H3.40625C3.25156 6.9375 3.125 6.81094 3.125 6.65625V5.34375C3.125 5.18906 3.25156 5.0625 3.40625 5.0625H5.5625V2.90625C5.5625 2.75156 5.68906 2.625 5.84375 2.625H7.15625C7.31094 2.625 7.4375 2.75156 7.4375 2.90625V5.0625L9.59375 5.0625C9.74844 5.0625 9.875 5.18906 9.875 5.34375V6.65625Z"
              fill="white"
            />
          </svg>
        </span>
      </button>
      {!hidden && (
        <div className="bg-gray-800/50 w-full h-full fixed top-0 left-0 z-50 flex justify-center items-center">
          <div
            id="defaultModal"
            tabIndex="-1"
            aria-hidden="true"
            className="flex justify-center drop-shadow-2xl w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 "
          >
            <div className="relative w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <h3 className="text-16 lg:text-24 lg:leading-[24.27px] text-white bg-primary p-4 text-center rounded-t-md">
                  আপনার প্রোফাইলকে অন্তর্ভুক্ত সংস্থা করুন
                </h3>
                <form onSubmit={HandleSubmit} className="p-4 pt-0">
                  <div className="items-center justify-start w-full inline-flex pb-[28px] lg:pb-[2em]">
                    <hr className="w-full h-px bg-[#BABABA] border-0" />
                    <span className="absolute pr-[10px] text-gray-700 bg-white font-medium text-12 leading-[13.79px] lg:text-18 lg:leading-[18.38px]">
                      সংস্থা তথ্যাবলী
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pb-5">
                    <fieldset className="border border-gray-400 pl-2 rounded-md w-full lg:w-[49%]">
                      <legend className="text-12 lg:text-18 lg:leading-[18.38px] text-secondary bg-white px-2">
                        সংস্থার নাম
                      </legend>
                      <input
                        type="text"
                        name="name"
                        placeholder="সংস্থার নাম"
                        className="w-full border-none focus:outline-none focus:ring-0 rounded-md"
                      />
                    </fieldset>
                    <fieldset className="border border-gray-400 rounded-md pl-2 w-full lg:w-[49%]">
                      <legend className="text-12 lg:text-18 lg:leading-[18.38px] text-secondary bg-white px-2">
                        ক্যাটাগরি
                      </legend>
                      <select
                        name="category"
                        className="w-full border-none focus:outline-none rounded-md focus:ring-0 text-gray-500"
                      >
                        <option value="0">select</option>
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                      </select>
                    </fieldset>
                    {/* <fieldset className="border border-gray-400 rounded-md pl-2 w-full lg:w-[49%]">
                      <legend className="text-12 lg:text-18 lg:leading-[18.38px] text-secondary bg-white px-2">
                        মোবাইল নম্বর{" "}
                      </legend>
                      <input
                        type="text"
                        placeholder="নিবন্ধিত মোবাইল নম্বর"
                        className="w-full border-none focus:outline-none rounded-md focus:ring-0"
                        name="mobile"
                      />
                    </fieldset> */}
                  </div>
                  <div className="w-full flex justify-end space-x-4">
                    <button
                      onClick={closeModal}
                      className="text-12 leading-[12px] lg:text-16 lg:leading-[16px]  border border-gray-400 px-5 py-2 rounded-md hover:bg-[#777777] text-[#777777] hover:text-white"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="text-12 leading-[12px] lg:text-16 lg:leading-[16px] bg-secondary text-50 px-5 py-2 border border-secondary rounded-md text-white hover:text-secondary hover:bg-[#FFF]"
                    >
                      অনুরোধ প্রেরণ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal2;
