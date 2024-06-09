"use client";

import { DeleteChallan, MakeChallanVerify, PendingOtc } from "@/app/_api/api";

import {
  bn2en,
  en2bn,
  formatdate,
  relative_image_path,
} from "@/halpers/helper";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import TablePlaceHolder from "@/app/_components/_skeleton/TablePlaceHolder";

const Chalan = () => {
  let organization = parseCookies();
  let org = JSON.parse(organization?.organizationinfo) ;

  const id = org?.username;

  const [allData, setAllData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [paginateOptionShow, setPaginateOptionShow] = useState(false);
  const [showItemLength, setShowItemLength] = useState(10);
  const [startWith, setStartWith] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  let tp = parseFloat(allData?.length) / parseInt(showItemLength);

  const [loading, setLoading] = useState(0);
  
  let nid = org?.nid;
  let dob = bn2en(org?.dob);
  dob = dob?.substring(0, 10);

  console.log(' nid : ',nid,' dob : ',dob);

  useEffect(() => {

    PendingOtc(nid, dob).then((dataArray) => {
      setLoading(1);
      setAllData(dataArray);
      setLoading(0);
    });

    if (allData?.data?.length > 0) {
      let tp = parseFloat(allData?.data?.length) / parseInt(showItemLength);
      setTotalPages(Math.ceil(tp));
    } else {
      let tp = 0;
    }
  }, []);

  const handleVerify = (request_id) => {
    MakeChallanVerify(request_id).then(() => {
      toast.success("চালান যাচাই করা হয়েছে ।");
      redirect('/citizen/challan');
    });
  };

  const deleteChallan = (request_id) => {
    DeleteChallan(request_id);
    redirect('/citizen/challan');
  };

  return (
    
    <>
      <div className="w-full bg-white p-4 flex flex-col space-y-4 min-h-[36.125em]">
        <h3 className="text-20 lg:text-24">চালান তথ্যবলি</h3>
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr className="border text-white bg-primary border-primary">
                  <th
                    scope="col"
                    className=" px-3 py-3 text-center border border-green-200 "
                  >
                    ক্রম নং
                  </th>
                  <th
                    scope="col"
                    className=" px-3 py-3 text-center border border-green-200 "
                  >
                    মৌজা
                  </th>
                  <th
                    scope="col"
                    className=" px-3 py-3 text-center border border-green-200"
                  >
                    হোল্ডিং নং
                  </th>
                  <th
                    scope="col"
                    className=" px-3 py-3 text-center border border-green-200"
                  >
                    চালান ট্র্যাকিং নম্বর
                  </th>
                  <th
                    scope="col"
                    className=" px-3 py-3 text-center border border-green-200"
                  >
                    টাকার পরিমান
                  </th>
                  <th
                    scope="col"
                    className=" px-3 py-3 text-center border border-green-200"
                  >
                    তারিখ
                  </th>
                  <th
                    scope="col"
                    className=" px-3 py-3 text-center border border-green-200"
                  >
                    পদক্ষেপ
                  </th>
                </tr>
              </thead>

              <tbody>

{
  loading == 1 ?
  <tr
    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" colspan={8}
  >
      <TablePlaceHolder />
    </tr>

    :
    allData?.length > 0 && allData 
      ?.slice(startWith, startWith + showItemLength)
      ?.map((item, index) => {
        return (
          <tr
            key={index}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
              {en2bn(index + startWith + 1)}
            </td>
            <td className="px-2 md:px-4 py-1 md:py-4 text-center border">
              {item?.mouja_name}
            </td>
            <td className="px-2 md:px-4 py-1 md:py-4 text-center border">
              {en2bn(item?.holding_no)}
            </td>
            <td className="px-2 md:px-4 py-1 md:py-4 text-center border">
              {item?.request_id
                ? en2bn(item?.request_id)
                : en2bn(0)}
            </td>
            <td className="px-2 md:px-4 py-1 md:py-4 text-center border">
              {item?.tracking_no
                ? en2bn(item?.tracking_no)
                : en2bn(0)}
            </td>
            <td className="px-2 md:px-4 py-1 md:py-4 text-center border">
              {en2bn(item?.amount)}
            </td>
            <td className="px-2 md:px-4 py-1 md:py-4 text-center border">
              {en2bn(formatdate(item?.crdate))}
            </td>

            <td className="px-2 md:px-4 py-1 md:py-4 text-center border ">
              {
                item?.tracking_no != '' ?
                  <button
                    className="p-1 text-[10px] ml-2 leading-[10.11px] bg-green-700 hover:bg-white-700 hover:text-gray-50 text-gray-50 lg:text-10 lg:leading-[14.16px] border border-primary rounded-sm"
                    onClick={(e) => handleVerify(item?.request_id)}
                  >
                    চালান যাচাই
                  </button> : ''
              }

              <button
                className="p-1 text-[9px] ml-2 leading-[10.11px] bg-[#ff0000] hover:bg-white-700 hover:text-gray-50 text-gray-50 lg:text-10 lg:leading-[14.16px] border border-[#ff0000] rounded-sm"
                onClick={(e) => deleteChallan(item?.request_id)}
              >
                মুছুন
              </button>
              {/* <button
              className="p-2 text-[10px] ml-2 leading-[10.11px] bg-white-700 hover:bg-white-700 hover:text-gray-50 text-gray-50 lg:text-14 lg:leading-[14.16px] border border-[#ff0000] rounded-sm"
              onClick={(e) => deleteChallan(item?.id)}
            >
              <BsFillTrash3Fill className="text-[0.9em] text-[#ff0000]" />
            </button> */}
            </td>

          </tr>
        );
      }) 
}
</tbody>              
            </table>
          </div>
          {/* pagination */}
          <div className="mt-4 pt-3">
            <div className="flex justify-end lg:justify-end space-x-3 lg:space-x-8 items-center">
              <div className="flex items-center space-x-2">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      onMouseEnter={() => setPaginateOptionShow(true)}
                      onMouseLeave={() => setPaginateOptionShow(false)}
                      className="text-12 text-deepgreen flex justify-between"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      সর্বমোট পৃষ্ঠা -{" "}
                      {tp != undefined ? en2bn(Math.ceil(tp)) : en2bn(0)}
                      <svg
                        className="ml-2"
                        width={20}
                        height={20}
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.875 5.2125L2.26219 4.6875L12.7566 4.6875L13.125 5.19375L7.84969 10.3125H7.07437L1.875 5.2125Z"
                          fill="#1E433D"
                        />
                      </svg>
                    </button>
                  </div>
                  {paginateOptionShow && (
                    <div
                      onMouseEnter={() => setPaginateOptionShow(true)}
                      onMouseLeave={() => setPaginateOptionShow(false)}
                      className="absolute top-3 right-0 z-10 mt-2 origin-top-right 
                                    rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
                                    focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex={-1}
                    >
                      <div className="py-1" role="none">
                        <ul
                          className="py-2 text-semiblack text-sm pb-3 flex flex-col space-y-2"
                          aria-labelledby="dropdownHoverButtonPagenationList"
                        >
                          <li>
                            <a
                              href
                              onClick={(e) => {
                                e.preventDefault();
                                setShowItemLength(5);
                              }}
                              className="block hover:text-magenta mx-3 cursor-pointer"
                            >
                              {en2bn(5)}
                            </a>
                          </li>
                          <li>
                            <a
                              href
                              onClick={(e) => {
                                e.preventDefault();
                                setShowItemLength(20);
                              }}
                              className="block hover:text-magenta mx-3 cursor-pointer"
                            >
                              {en2bn(20)}
                            </a>
                          </li>
                          <li>
                            <a
                              href
                              onClick={(e) => {
                                e.preventDefault();
                                setShowItemLength(30);
                              }}
                              className="block hover:text-magenta mx-3 cursor-pointer"
                            >
                              {en2bn(30)}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="text-12 text-deepgreen">
                  ক্রম নং- {en2bn(startWith + 1)}-
                  {en2bn(startWith + showItemLength)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div onClick={() => setStartWith(0)}>
                  <img
                    src={relative_image_path("FaCaretUpDuboleLeft.svg")}
                    alt="ভূমি উন্নয়ন কর"
                    className="cursor-pointer"
                  />
                </div>
                <div
                  onClick={() =>
                    setStartWith(
                      startWith - showItemLength < 1
                        ? 0
                        : startWith - showItemLength
                    )
                  }
                >
                  <img
                    src={relative_image_path("FaCaretUpLeft.svg")}
                    alt="ভূমি উন্নয়ন কর"
                    className="cursor-pointer"
                  />
                </div>
                {startWith + showItemLength >= allData?.length ? (
                  <>
                    <div>
                      <img
                        src={relative_image_path("FaCaretUpRight.svg")}
                        alt="ভূমি উন্নয়ন কর"
                        className="cursor-pointer"
                      />
                    </div>
                    <div>
                      <img
                        src={relative_image_path("FaCaretUpDuboleRight.svg")}
                        alt="ভূমি উন্নয়ন কর"
                        className="cursor-pointer"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onClick={() =>
                        setStartWith(
                          startWith + showItemLength <= allData?.length
                            ? startWith + showItemLength
                            : allData?.users?.length - showItemLength
                        )
                      }
                    >
                      <img
                        src={relative_image_path("FaCaretUpRight.svg")}
                        alt="ভূমি উন্নয়ন কর"
                        className="cursor-pointer"
                      />
                    </div>
                    <div
                      onClick={() =>
                        setStartWith(
                          allData?.users?.length - showItemLength < 1
                            ? 0
                            : allData?.length - showItemLength
                        )
                      }
                    >
                      <img
                        src={relative_image_path("FaCaretUpDuboleRight.svg")}
                        alt="ভূমি উন্নয়ন কর"
                        className="cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chalan;
