import React, { useState } from "react";

const ConfirmBox = ({ message, onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="w-full py-1 text-[10px] leading-[10.11px]  hover:bg-[#FFFF] text-gray-50 lg:text-14 lg:leading-[14.16px]"
      >
        <svg
          className="fill-[#CF0000]"
          xmlns="http://www.w3.org/2000/svg"
          height="1.5em"
          viewBox="0 0 448 512"
        >
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 opacity-[0.9] bg-[#9c9898]">
          <div className="bg-white rounded p-4 shadow-md w-80 z-100">
            <p className="mb-4">{message}</p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirm}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                হ্যাঁ
              </button>
              <button
                onClick={closeModal}
                className="border border-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
              >
                না
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmBox;
