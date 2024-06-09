'use client'

import { ApproveIncludedHolding, GetRequestedOrg } from "@/app/_api/api";
import Modal from "@/app/_components/Radix/Modal";
import { en2bn } from "@/halpers/helper";
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
const TablePlaceHolder = dynamic(() => import("@/app/_components/_skeleton/TablePlaceHolder"));
import { FaCheckCircle, FaRegTrashAlt, FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import OrganizationProfile from "./OrganizationProfile";
import Holding from "./Holding";


const OrganizationDetails = () => {

  const [data, setData] = useState([]);

  const organization = parseCookies();

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const org = JSON.parse(organization?.organizationinfo);
    let id = org?.id;
    GetRequestedOrg(id).then((res) => {
      setLoader(false);
      setData(res?.data);
    });
  }, []);

  const HandleAprrove = (parent_id, child_id) => {
    const req = {
      parent_org_id: parent_id,
      child_org_id: child_id
    };

    ApproveIncludedHolding(req).then((res) => {
      if (res?.status == 200) toast.success(res?.message);
      else if (res?.status == 201) toast.warning(res?.message);
      else toast.error(res?.message);
    });
  }

  const [flag,setFlag] = useState(1);
  const [child_org_id,setChild_org_id] = useState(null);

  const HandleHolding = (checkflag,org_id) => {
    setFlag(!checkflag);
    setChild_org_id(org_id);
  };

  const HandleRemove = () => {
    console.log('view profile.');
  }

  console.log('flag : ',flag);

  return (
    <>
      <section className="bg-white p-4 rounded-lg w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between pb-[16px] lg:pb-[23px]">
          <h3 className="divide-y divide-dashed text-center font-semibold m-0 m-auto my-4 text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px]">
            অন্তর্ভুক্ত সংস্থা বিবরণ তথ্যবলি
          </h3>
          
          {/* <div className="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-4">
            <button className="flex items-center space-x-1 bg-primary text-white px-4 py-1 rounded-md">
              <span>
                <svg
                  width="13"
                  height="15"
                  viewBox="0 0 13 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1302 5.13884C12.1322 4.70528 12.0136 4.27971 11.7875 3.90974C11.5615 3.53977 11.2369 3.24 10.8502 3.04398C10.4635 2.84796 10.0298 2.76342 9.59779 2.79982C9.16576 2.83622 8.75238 2.99213 8.40391 3.25009C8.05555 3.50829 7.78595 3.85836 7.6253 4.26111C7.46464 4.66386 7.41927 5.10338 7.49426 5.53045C7.56926 5.95752 7.76166 6.35529 8.04992 6.6792C8.33819 7.00312 8.71093 7.2404 9.12641 7.36446C8.97311 7.67637 8.73582 7.93931 8.44123 8.1237C8.14664 8.3081 7.80644 8.40663 7.45891 8.40821H5.59016C4.89865 8.41058 4.23275 8.67012 3.72203 9.13634V4.62509C4.28918 4.50939 4.79315 4.18721 5.13625 3.72103C5.47934 3.25485 5.63711 2.67788 5.57897 2.10198C5.52082 1.52608 5.2509 0.992288 4.82155 0.604098C4.39219 0.215908 3.83398 0.000976563 3.25516 0.000976562C2.67633 0.000976563 2.11812 0.215908 1.68877 0.604098C1.25941 0.992288 0.989492 1.52608 0.931346 2.10198C0.8732 2.67788 1.03097 3.25485 1.37407 3.72103C1.71716 4.18721 2.22114 4.50939 2.78828 4.62509V10.3232C2.22219 10.4314 1.71523 10.7429 1.36303 11.1991C1.01083 11.6553 0.837746 12.2246 0.876415 12.7996C0.915084 13.3747 1.16284 13.9157 1.57294 14.3206C1.98305 14.7256 2.52715 14.9664 3.10263 14.9978C3.67811 15.0292 4.24518 14.8489 4.69687 14.4909C5.14856 14.133 5.45366 13.6221 5.55461 13.0547C5.65556 12.4873 5.54539 11.9025 5.24487 11.4107C4.94435 10.9189 4.47427 10.5541 3.92328 10.3851C4.07695 10.0736 4.31438 9.81115 4.60893 9.62711C4.90347 9.44308 5.24347 9.34477 5.59078 9.34321H7.45953C8.04235 9.34038 8.60979 9.1559 9.08286 8.81547C9.55593 8.47503 9.91109 7.99558 10.0989 7.44384C10.6589 7.37037 11.1733 7.0964 11.5468 6.6727C11.9203 6.24899 12.1275 5.70365 12.1302 5.13884ZM1.85391 2.33634C1.85391 2.15232 1.89015 1.97011 1.96057 1.8001C2.03099 1.6301 2.1342 1.47562 2.26432 1.3455C2.39444 1.21539 2.54891 1.11217 2.71892 1.04175C2.88893 0.971333 3.07114 0.935088 3.25516 0.935088C3.43917 0.935088 3.62138 0.971333 3.79139 1.04175C3.9614 1.11217 4.11587 1.21539 4.24599 1.3455C4.37611 1.47562 4.47932 1.6301 4.54974 1.8001C4.62016 1.97011 4.65641 2.15232 4.65641 2.33634C4.65641 2.70797 4.50878 3.06439 4.24599 3.32717C3.9832 3.58996 3.62679 3.73759 3.25516 3.73759C2.88352 3.73759 2.52711 3.58996 2.26432 3.32717C2.00154 3.06439 1.85391 2.70797 1.85391 2.33634ZM4.65641 12.612C4.65641 12.796 4.62016 12.9782 4.54974 13.1482C4.47932 13.3182 4.37611 13.4727 4.24599 13.6028C4.11587 13.7329 3.9614 13.8361 3.79139 13.9065C3.62138 13.977 3.43917 14.0132 3.25516 14.0132C3.07114 14.0132 2.88893 13.977 2.71892 13.9065C2.54891 13.8361 2.39444 13.7329 2.26432 13.6028C2.13421 13.4727 2.03099 13.3182 1.96057 13.1482C1.89015 12.9782 1.85391 12.796 1.85391 12.612C1.85391 12.2403 2.00154 11.8839 2.26432 11.6211C2.52711 11.3583 2.88352 11.2107 3.25516 11.2107C3.62679 11.2107 3.9832 11.3583 4.24599 11.6211C4.50878 11.8839 4.65641 12.2403 4.65641 12.612ZM9.79453 6.54009C9.42281 6.54009 9.06632 6.39242 8.80348 6.12958C8.54063 5.86674 8.39297 5.51024 8.39297 5.13853C8.39297 4.76681 8.54063 4.41032 8.80348 4.14747C9.06632 3.88463 9.42281 3.73696 9.79453 3.73696C10.1662 3.73696 10.5227 3.88463 10.7856 4.14747C11.0484 4.41032 11.1961 4.76681 11.1961 5.13853C11.1961 5.51024 11.0484 5.86674 10.7856 6.12958C10.5227 6.39242 10.1662 6.54009 9.79453 6.54009Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span>অনুরোধ প্রেরণ</span>
            </button>
          </div> */}
        </div>

        {
          flag == 1 ? 
            <div className="overflow-x-auto">

              {
                loader == true ?
                  <TablePlaceHolder />
                  : <table className="w-full">
                    <thead>
                      <tr className="bg-[#12633D] px-3 py-2 text-center">
                        <th className="text-sm font-medium text-gray-50 px-3 py-2">
                          ক্রম
                        </th>
                        <th className="text-sm font-medium text-gray-50 px-3 py-2">
                          ইউজারনেম
                        </th>
                        <th className="text-sm font-medium text-gray-50 px-3 py-2">
                          সংস্থা নাম
                        </th>
                        <th className="text-sm font-medium text-gray-50 px-3 py-2">
                          মোবাইল নম্বর
                        </th>
                        <th className="text-sm font-medium text-gray-50 px-3 py-2">
                          স্ট্যাটাস
                        </th>
                        <th className="text-sm font-medium text-gray-50 px-3 py-2">
                          পদক্ষেপ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {
                        data?.length > 0 ? data?.map((item, index) => (
                          <tr
                            key={index}
                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 p-4"
                          >
                            <td className="p-4">{en2bn(index + 1)}</td>
                            <td>{item?.child_org_username}</td>
                            <td>{item?.child_name}</td>
                            <td>{en2bn(item?.child_phone)}</td>
                            <td>
                              {
                                item?.is_approve == 1 ?
                                  <span className="text-[#12633D] font-semibold">অনুমোদিত</span>
                                  : <span className="text-[#CF0000] font-semibold">অপেক্ষমান</span>
                              }
                            </td>
                            <td>
                              <div className="flex justify-center space-x-2">
                                {
                                  <Modal icon={
                                    <div className='flex items-center space-x-1 px-4 py-1 rounded-md bg-primary text-white'>
                                      <span><FaRegUserCircle /></span>
                                      <span>প্রোফাইল</span>
                                    </div>
                                  } cancelBtn={"বন্ধ করুন"}
                                    title={`অন্তর্ভুক্ত সংস্থার তথ্য`}
                                  >
                                    <OrganizationProfile info={item?.organization_id} />
                                  </Modal>
                                }

                                {
                                  item?.is_approve == 0 &&
                                  <button className="text-[#12633D] hover:text-white hover:bg-[#12633D] border border-[#12633D] flex items-center space-x-1 px-4 py-1 rounded-md" onClick={() => HandleAprrove(item?.parent_id, item?.organization_id)}>
                                    <span><FaCheckCircle /></span>
                                    <span>অনুমোদন</span>
                                  </button>
                                }

                                {
                                  item?.is_approve == 1 &&

                                  // <Link href={{ pathname: `/organization/holding` }} shallow className="text-[#12633D] hover:text-white hover:bg-[#12633D] border border-[#12633D] flex items-center space-x-1 px-4 py-1 rounded-md" >
                                  //   <span><FaCheckCircle /></span>
                                  //   <span>হোল্ডিং</span>
                                  // </Link>

                                  <button className="text-[#12633D] hover:text-white hover:bg-[#12633D] border border-[#12633D] flex items-center space-x-1 px-4 py-1 rounded-md" onClick={() => HandleHolding(flag,item?.organization_id)}>
                                    <span><FaCheckCircle /></span>
                                    <span>হোল্ডিং</span>
                                  </button>
                                }
                                <button className="text-[#CF0000] hover:text-white hover:bg-[#CF0000]  border border-[#CF0000] flex items-center space-x-1 px-4 py-1 rounded-md" onClick={HandleRemove(item?.id)}>
                                  <span><FaRegTrashAlt /></span>
                                  <span> মুছুন</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        )) : <tr>
                          <td colSpan={6}>কোন তথ্য পাওয়া যায় নি</td>
                        </tr>
                      }
                    </tbody>
                  </table>
              }
            </div>
          : <Holding data={child_org_id} flag={flag}/>
        }

      </section>
    </>
  );
};

export default OrganizationDetails;
