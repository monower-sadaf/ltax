import React, { useState } from "react";

function ComplainModal(item) {
  let itemId = item?.data[2];
  let owner_attachment = item?.data[3];
  let warish = item?.data[4];

  const [modalContent, setModalContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function openModal(itemId) {
    const dynamicContent = getDynamicContent(itemId); // Replace with your logic to fetch content
    setModalContent(dynamicContent);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function getDynamicContent(itemId) {
    return (
      <div className="px-5 h-full">
        <div className="flex w-full justify-between">
          <h2 className="text-center">সংযুক্তি</h2>
          <button
            className="float-right text-[20px]-800 cursor-pointer text-[12px] leading-[12.14px] lg:text-[14px] lg:leading-[14.16px] border bg-[#CF0000] text-[#FFFF] hover:bg-white hover:text-[#CF0000] rounded-md px-3 py-2"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
        <hr />
        <div className="space-y-6 h-full">
          <div>
            <h2>
              <strong>হোল্ডিং নং : {item?.data[0]}</strong>
            </h2>
            <h2>
              <strong>নাগরিকের মোবাইল নং : {item?.data[1]}</strong>
            </h2>
            <embed
              src={`${process.env.BASE_URL}/img/attachment/${owner_attachment}`}
              title=""
              height="100%"
              width="100%"
            ></embed>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {owner_attachment != null && (
        <div
          className="dynamic-item w-full p-2 text-[10px] ml-2 leading-[10.11px] hover:text-gray-50 text-gray-50 lg:text-14 lg:leading-[14.16px] text-center cursor-pointer flex justify-center items-center"
          onClick={() => openModal(itemId)}
          data-item-id={`${itemId}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.3125 5.55L13.2125 1.425L12.775 1.25H3.125L2.5 1.875V8.75H3.75V2.5H11.25V6.875L11.875 7.5H16.25V8.75H17.5V6L17.3125 5.55ZM12.5 6.25V2.5L16.25 6.25H12.5ZM3.125 10L2.5 10.625V18.125L3.125 18.75H16.875L17.5 18.125V10.625L16.875 10H3.125ZM16.25 16.25V17.5H3.75V11.25H16.25V16.25ZM6.25 15H5.85V16.25H5V12.5H6.325C7.2625 12.5 7.7375 12.95 7.7375 13.75C7.73992 13.92 7.70541 14.0885 7.63635 14.2439C7.56729 14.3993 7.46532 14.5379 7.3375 14.65C7.02772 14.8915 6.64246 15.0155 6.25 15ZM6.175 13.1875H5.85V14.35H6.175C6.625 14.35 6.85 14.15 6.85 13.7625C6.85 13.375 6.625 13.1875 6.175 13.1875ZM11.25 15.725C11.4346 15.5432 11.579 15.3246 11.6737 15.0834C11.7685 14.8422 11.8115 14.5839 11.8 14.325C11.8 13.075 11.1375 12.5 9.8 12.5H8.475V16.25H9.8C10.0644 16.2628 10.3287 16.223 10.5776 16.1329C10.8265 16.0428 11.0551 15.9041 11.25 15.725ZM9.3125 15.5625V13.1875H9.725C9.88443 13.1774 10.0443 13.1999 10.1947 13.2536C10.3451 13.3073 10.4831 13.3912 10.6 13.5C10.7059 13.6113 10.7883 13.7428 10.842 13.8868C10.8957 14.0307 10.9197 14.184 10.9125 14.3375C10.9312 14.667 10.8189 14.9905 10.6 15.2375C10.4856 15.347 10.3502 15.4322 10.2019 15.4881C10.0537 15.544 9.89575 15.5693 9.7375 15.5625H9.3125ZM14.875 14.8H13.6625V16.25H12.8125V12.5H14.9875V13.1875H13.6625V14.1125H14.875V14.8Z"
              fill="#A5008A"
            />
          </svg>
        </div>
      )}
      <span className="text-[#CF0000]">
        {owner_attachment == null && "কোন সংযুক্তি নেই ।"}
      </span>

      {modalVisible && (
        <div className="shadow-lg px-3 py-3 h-[80%] w-[80%] bg-[#fff] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
          <div className="modal-content bg-[#ffff] w-full h-full">
            <div id="modalContent" className="bg-[#fff]  w-full h-full">
              {modalContent}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="bg-[#CF0000] text-white hover:bg-white hover:text-[#CF0000] px-3 py-2 rounded-md border border-[#CF0000]"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplainModal;
