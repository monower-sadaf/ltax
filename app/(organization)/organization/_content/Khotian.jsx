'use client'

import { en2bn, formatdate, relative_image_path } from "@/halpers/helper";
import Link from "next/link";
import { useState, useEffect } from "react";
import { lazy } from "react";
import { parseCookies } from "nookies";
import { CitizenKhotianList, DeleteKhotian } from "@/app/_api/api";
// import Modal from "@/app/_components/Modal";
import Modal from "@/app/_components/Radix/Modal";
import ConfirmBox from "@/app/_components/ConfirmBox";
import Details from "@/app/citizen/_components/Khotian/Details";
import { toast } from "react-toastify";
const SearchModal = lazy(() => import("../_components/_modals/SearchModal"));

const Khotian = () => {
  const [status, setStatus] = useState(true);

  /* pagination start */
  const [allData, setAllData] = useState([]);
  const [startWith, setStartWith] = useState(0);
  const [showItemLength, setShowItemLength] = useState(10);

  let tp = (allData == ' ') ? 0 : parseFloat(allData?.length) / parseInt(showItemLength);
  const [paginateOptionShow, setPaginateOptionShow] = useState(false);
  /* pagination end */

  const organizationData = parseCookies();

  const [odata, setOdata] = useState({});


  useEffect(() => {
    const organization_info = JSON.parse(organizationData?.organization);
    const org = organization_info?.id;
    setOdata(organization_info)
    let owner_type = 1;
    if (org == undefined) router.push('/organization/khotian');
    CitizenKhotianList(org, owner_type).then(dataArray => {
      setAllData(dataArray);
    });
  }, []);

  const handleDelete = (id) => {
    DeleteKhotian(id).then(dataArray => {
      toast.success('খতিয়ান সফলভাবে মুছে ফেলা হয়েছে ।');
      // router.replace('/citizen/khotian');
      if (window != undefined) window.location.reload();
    });
  }


  const HandleClick = () => {
    setStatus(false);
  };

  return (
    <>
      <SearchModal heading={"খতিয়ান অনুসন্ধান"} status={status} />

      <section className="bg-white p-4 rounded-lg w-full h-screen">
        <div className="flex flex-col lg:flex-row items-center justify-between pb-[16px] lg:pb-[23px]">
          <h3>খতিয়ান তথ্যাবলি </h3>
          <div className="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-4">
            {/* <button
              onClick={HandleClick}
              className="inline-flex items-center border border-[#A5008A] rounded-md px-3 py-2 space-x-2 text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.53125 6.40838e-07C8.53779 -0.00049456 7.56534 0.286016 6.73085 0.825076C5.89636 1.36414 5.23536 2.13279 4.82735 3.0386C4.41934 3.94441 4.2817 4.9488 4.43096 5.93098C4.58023 6.91316 5.01006 7.83131 5.66875 8.575L0.625 14.3L1.325 14.925L6.35625 9.225C7.00342 9.73121 7.76217 10.0755 8.56932 10.2291C9.37646 10.3827 10.2086 10.3412 10.9965 10.1081C11.7844 9.875 12.5051 9.45701 13.0988 8.88896C13.6924 8.32091 14.1417 7.61923 14.4092 6.84238C14.6768 6.06554 14.7548 5.236 14.6369 4.42288C14.519 3.60976 14.2084 2.83659 13.7312 2.16777C13.254 1.49895 12.6238 0.953849 11.8933 0.577865C11.1627 0.201882 10.3529 0.00590194 9.53125 0.00625064V6.40838e-07ZM9.53125 9.375C8.41237 9.375 7.33931 8.93053 6.54814 8.13936C5.75697 7.34819 5.3125 6.27513 5.3125 5.15625C5.3125 4.03737 5.75697 2.96431 6.54814 2.17314C7.33931 1.38197 8.41237 0.937501 9.53125 0.937501C10.6501 0.937501 11.7232 1.38197 12.5144 2.17314C13.3055 2.96431 13.75 4.03737 13.75 5.15625C13.75 6.27513 13.3055 7.34819 12.5144 8.13936C11.7232 8.93053 10.6501 9.375 9.53125 9.375Z"
                  fill="#A5008A"
                />
              </svg>
              <span>খতিয়ান অনুসন্ধান করুন</span>
            </button> */}
            <Link
              href={{ pathname: "/organization/khotian/create" }}
              shallow
              className="flex items-center bg-[#12633D] text-white text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px] rounded-md px-3 py-2 space-x-2"
            >
              <svg
                width="13"
                height="15"
                viewBox="0 0 13 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2898 4.34204C12.2217 4.17589 12.1109 4.03063 11.9688 3.9209L8.11011 0.161134C8.06963 0.110722 8.01834 0.0700641 7.96001 0.0421712C7.90169 0.0142782 7.83784 -0.00013448 7.77319 9.52274e-07H1.03491C0.931792 -0.000159798 0.829653 0.0200328 0.73435 0.0594214C0.639048 0.09881 0.552456 0.15662 0.479538 0.229538C0.40662 0.302456 0.34881 0.389048 0.309421 0.48435C0.270033 0.579653 0.24984 0.681792 0.250001 0.784913V14.2126C0.24984 14.3158 0.270033 14.4179 0.309421 14.5132C0.34881 14.6085 0.40662 14.6951 0.479538 14.768C0.552456 14.8409 0.639048 14.8988 0.73435 14.9381C0.829653 14.9775 0.931792 14.9977 1.03491 14.9976H11.5061C11.7137 14.9969 11.9126 14.9139 12.0591 14.7667C12.2056 14.6196 12.2877 14.4203 12.2874 14.2126V7.7356V4.34204H12.2898ZM8.20898 1.53442L10.8311 3.99048H8.20898V1.53442ZM6.323 14.1235H1.12647V0.872804H7.33008V4.42627C7.33008 4.54314 7.37651 4.65523 7.45915 4.73787C7.54179 4.82052 7.65388 4.86694 7.77075 4.86694H11.4133V7.7356V14.1235H6.323ZM2.74878 6.46973C2.77737 6.43706 2.81241 6.41065 2.85169 6.39216C2.89097 6.37367 2.93365 6.36351 2.97705 6.36231H8.1272C8.17137 6.36245 8.21501 6.372 8.25521 6.39031C8.29541 6.40862 8.33125 6.43528 8.36035 6.46851C8.42023 6.53572 8.45326 6.62263 8.45313 6.71265C8.45203 6.80266 8.41868 6.88928 8.35913 6.95679C8.33018 6.98997 8.29456 7.01668 8.2546 7.03519C8.21464 7.0537 8.17123 7.06359 8.1272 7.06421H2.98071C2.93655 7.06399 2.89294 7.05441 2.85275 7.0361C2.81256 7.0178 2.77671 6.99118 2.74756 6.95801C2.68729 6.88905 2.65408 6.80057 2.65408 6.70899C2.65408 6.6174 2.68729 6.52892 2.74756 6.45996L2.74878 6.46973ZM2.74878 11.4465C2.77753 11.4131 2.81311 11.3862 2.85311 11.3677C2.89312 11.3492 2.93663 11.3394 2.98071 11.3391H9.55786C9.60213 11.3394 9.64582 11.3491 9.68603 11.3677C9.72623 11.3862 9.76203 11.4131 9.79102 11.4465C9.85129 11.5155 9.8845 11.604 9.8845 11.6956C9.8845 11.7871 9.85129 11.8756 9.79102 11.9446C9.76147 11.9775 9.72534 12.0039 9.68497 12.0219C9.6446 12.04 9.60088 12.0494 9.55664 12.0496H2.98071C2.93668 12.0493 2.8932 12.0398 2.85305 12.0217C2.8129 12.0036 2.77697 11.9774 2.74756 11.9446C2.68729 11.8756 2.65408 11.7871 2.65408 11.6956C2.65408 11.604 2.68729 11.5155 2.74756 11.4465H2.74878ZM9.55786 8.85254C9.60208 8.85314 9.64567 8.86302 9.68583 8.88152C9.72599 8.90003 9.76183 8.92675 9.79102 8.95996C9.85129 9.02892 9.8845 9.1174 9.8845 9.20899C9.8845 9.30057 9.85129 9.38905 9.79102 9.45801C9.76168 9.49127 9.72562 9.51794 9.68522 9.53624C9.64482 9.55455 9.601 9.56408 9.55664 9.56421H2.98071C2.93655 9.56399 2.89294 9.55441 2.85275 9.5361C2.81256 9.5178 2.77671 9.49118 2.74756 9.45801C2.68729 9.38905 2.65408 9.30057 2.65408 9.20899C2.65408 9.1174 2.68729 9.02892 2.74756 8.95996C2.77651 8.92678 2.81213 8.90007 2.85209 8.88156C2.89205 8.86305 2.93546 8.85316 2.97949 8.85254H9.55786ZM2.74878 3.98316C2.77773 3.94997 2.81335 3.92326 2.85331 3.90475C2.89327 3.88624 2.93668 3.87636 2.98071 3.87573H5.35986C5.40403 3.87596 5.44764 3.88554 5.48783 3.90384C5.52801 3.92215 5.56387 3.94876 5.59302 3.98193C5.6529 4.04915 5.68592 4.13606 5.68579 4.22608C5.68548 4.31579 5.653 4.40242 5.59424 4.47022C5.56524 4.50334 5.52961 4.53001 5.48966 4.54851C5.44971 4.56702 5.40633 4.57694 5.36231 4.57764H2.98071C2.93655 4.57741 2.89294 4.56783 2.85275 4.54953C2.81256 4.53122 2.77671 4.50461 2.74756 4.47144C2.68729 4.40248 2.65408 4.314 2.65408 4.22241C2.65408 4.13083 2.68729 4.04235 2.74756 3.97339L2.74878 3.98316Z"
                  fill="white"
                />
              </svg>
              <span>নতুন খতিয়ান যুক্ত করুন</span>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-lg">
            <thead className="h-[30px] text-[#12633D] bg-green-700 border-b">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                  ক্রম
                </th>
                {/* <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                            বিভাগ
                                        </th> */}
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                  জেলা
                </th>
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                  উপজেলা/সার্কেল
                </th>
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                  মৌজা
                </th>
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                  খতিয়ান
                </th>
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                  হোল্ডিং নং
                </th>
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                  তারিখ
                </th>
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                  স্ট্যাটাস
                </th>
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                  পদক্ষেপ
                </th>
              </tr>
            </thead>
            <tbody>
              {allData
                ?.slice(startWith, startWith + showItemLength)
                ?.map((item, index) => (
                  <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                      {en2bn(index + startWith + 1)}
                    </td>
                    {/* <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                {item?.division}
                                            </td> */}
                    <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                      {item?.districts?.name_bn}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                      {item?.upazilas?.name_bd}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                      {item?.moujas == null ? ' ' : item?.moujas?.name_bd} -
                      {
                        item?.moujas == null ? ' ' :
                          item?.moujas?.jl_no != '' ? en2bn(item?.moujas?.jl_no) : ''
                      }
                    </td>
                    <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                      {
                        item?.khotian_no != '' ?
                          en2bn(item?.khotian_no) : ''
                      }
                    </td>
                    <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                      {
                        item?.holding_no != '' ?
                          en2bn(item?.holding_no) : ''
                      }
                    </td>
                    <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                      {
                        en2bn(formatdate(item?.created_at))
                      }
                    </td>
                    <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                      {
                        item?.status == 0 ? (
                          <span className="text-[#EDB900]">অপেক্ষমাণ</span>
                        ) : (
                          <span className="text-[#A5008A]">নিস্পত্তি</span>
                        )
                      }
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-center items-center space-x-2">

                      {/* {
                                                    item?.status == 3 ? <Modal btn="বাতিলের কারন" data={[item?.khotian_id,item?.reason_for_reject]}/>
                                                    : <><button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 w-full text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px]">অপেক্ষমাণ</button></>
                                                } */}

                      {/* <Modal
                        cancelBtn={'বাতিল করুন'}
                        icon={
                          <svg className="fill-green-400" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                      }
                      >
                        <Details
                          data={item}
                          id={item?.khotian_no}
                          owner={odata?.name}
                          owner_father={odata?.father_name ?? ''}
                          owner_attachment={item?.attachment}
                          warish={item?.warish ?? ''}
                        />
                      </Modal> */}

                      <Modal
                        cancelBtn={'বাতিল করুন'}
                        icon={
                          <svg className="fill-green-400" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                        }
                      >
                        <Details
                          data={item}
                          id={item?.khotian_no}
                          owner={odata?.name}
                          owner_father={odata?.father_name ?? ''}
                          owner_attachment={item?.attachment}
                          warish={item?.warish ?? ''}
                        />
                      </Modal>

                      <ConfirmBox message="আপনি কি খতিয়ানটি মুছে ফেলতে চান ?" onConfirm={(e) => handleDelete(item?.id)} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {allData?.length === 0 ? (
          <p className="text-center text-14 text-gray-500 pt-5">
            কোন তথ্য পাওয়া যায়নি
          </p>
        ) : (
          allData?.length > showItemLength && (
            <div>
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
                          সর্বমোট পৃষ্ঠা - {en2bn(Math.ceil(tp))}
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
                            src={relative_image_path(
                              "FaCaretUpDuboleRight.svg"
                            )}
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
                                : allData?.length - showItemLength
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
                              allData?.length - showItemLength < 1
                                ? 0
                                : allData?.length - showItemLength
                            )
                          }
                        >
                          <img
                            src={relative_image_path(
                              "FaCaretUpDuboleRight.svg"
                            )}
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
          )
        )}
      </section>
    </>
  );
};

export default Khotian;
