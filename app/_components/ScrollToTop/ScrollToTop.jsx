'use client';

const HandleScroll = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const ScrollToTop = () => {
    return (
      <div
        id="scroll"
        style={{ display: "none" }}
        onClick={HandleScroll}
        className="bg-green-400 hover:bg-green-500 border border-green-400 hover:border-green-600 cursor-pointer fixed z-50 right-6 bottom-28 p-4 rounded-full transition-all duration-300"
      >
        <svg
          className="fill-white"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
        </svg>
      </div>
    );
}

export default ScrollToTop;