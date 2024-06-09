import React, { useState } from "react";
import { en2bn } from "../../../halpers/helper";

function KhotianModal(item) {
  let itemId = item?.data[2];
  let owner_attachment = item?.data[3];
  let warish = item?.data[4];

  const [modalContent, setModalContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function openModal(itemId) {
    const dynamicContent = getDynamicContent(itemId);
    setModalContent(dynamicContent);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function getDynamicContent(itemId) {
    return (
      <div className="px-5 h-[80%]">
        <div className="flex w-full justify-between">
          <h2 className="text-center d-table text-slate-800 m-0 m-auto">
            খতিয়ান ({en2bn(itemId)}) এর সংযুক্তি
          </h2>
          <button
            className="float-right text-[20px]-800 cursor-pointer text-[12px] leading-[12.14px] lg:text-[14px] lg:leading-[14.16px] border bg-[#CF0000] text-[#FFFF] hover:bg-white hover:text-[#CF0000] rounded-md px-3 py-2"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
        <hr />
        <div className="space-y-6 border border-md">
          <div className="p-4">
            <h2>
              <span className="text-green-700">মালিকের নাম :</span>{" "}
              {item?.data[0]}
            </h2>
            <h2>
              <span className="text-green-700">পিতার নাম :</span>{" "}
              {item?.data[1]}
            </h2>
            <div className="mx-2 my-2 m-0 m-auto">
              <embed
                className="m-0 m-auto"
                src={`${process.env.BASE_URL}/img/attachment/${owner_attachment}`}
                title=""
                width="500"
                height="300"
              />
            </div>
          </div>
          <div className="my-5">
            {warish?.length > 0 &&
              warish.map((val, key) => {
                return (
                  <div className="p-4">
                    <h2>
                      <span className="text-green-700">
                        ওয়ারিশের মালিকের নাম :{" "}
                      </span>
                      {val.name}
                    </h2>
                    <h2>
                      <span className="text-green-700">
                        ওয়ারিশের পিতার নাম :{" "}
                      </span>
                      {val.father_or_husband}
                    </h2>

                    {val.attachment != "" && (
                      <div className="mx-2 my-2 m-0 m-auto">
                        <embed
                          className="m-0 m-auto"
                          src={`${process.env.BASE_URL}/img/attachment/${val.attachment}`}
                          title=""
                          width="500"
                          height="300"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div
        className="dynamic-item w-full p-2 text-[10px] ml-2 leading-[10.11px] bg-green-700 hover:bg-white-700 hover:text-gray-50 text-gray-50 lg:text-14 lg:leading-[14.16px] border border-primary rounded-sm text-center cursor-pointer"
        onClick={() => openModal(itemId)}
        data-item-id={`${itemId}`}
      >
        বিস্তারিত
      </div>

      {modalVisible && (
        <div className="shadow-lg px-3 py-3 w-[80%] bg-[#fff] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 my-5 mx-5">
          <div className="modal-content bg-[#ffff]">
            <div id="modalContent" className="bg-[#fff]">
              <div className="h-[500px] overflow-y-scroll">{modalContent}</div>
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

export default KhotianModal;
