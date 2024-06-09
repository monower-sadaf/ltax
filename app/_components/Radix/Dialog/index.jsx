import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./styles.css";

const DialogDemo = ({ children, ...prop }) => {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] text-primary border hover:bg-primary hover:text-white border-primary px-3 py-2 rounded-lg">
            {prop?.trigger}
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent bg-white">
            <Dialog.Title className="text-16 lg:text-24 lg:leading-[24.27px] text-primary border-b border-primary mb-4">
              {prop?.title}
            </Dialog.Title>
            <form action="#">
              {children}
              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                }}
              >
                <Dialog.Close asChild>
                  <div className="flex space-x-2">
                    <button className="text-12 leading-[12px] lg:text-16 lg:leading-[16px]  border border-gray-400 px-5 py-2 rounded-md hover:bg-[#777777] text-[#777777] hover:text-white">
                      {prop?.cancelBtn}
                    </button>
                    <button className="text-12 leading-[12px] lg:text-16 lg:leading-[16px] bg-secondary text-50 px-5 py-2 border border-secondary rounded-md text-white hover:text-secondary hover:bg-[#FFF]">
                      {prop?.submitBtn}
                    </button>
                  </div>
                </Dialog.Close>
              </div>
            </form>
            <Dialog.Close asChild>
              <button className="IconButton cursor-pointer" aria-label="Close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default DialogDemo;
