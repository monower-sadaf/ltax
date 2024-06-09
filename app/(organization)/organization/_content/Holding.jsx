'use client'
import { useState, useEffect } from "react";
import { en2bn, relative_image_path } from "@/halpers/helper";
import Link from "next/link";
import { parseCookies } from "nookies";
import { CitizenHolding } from "@/app/_api/api";
import BatchPayment from "@/app/_components/BatchPayment";
import HoldingDetails from "./HoldingDetails";

const Holding = (props) => {

  const [allData, setAllData] = useState([
    {
      Moujas: {
        name_bd: "",
        jl_no: "",
      },
      holding_no: "",
      LdtaxHoldingLandSchedules: {
        dag_no: "",
        khotian_no: "",
      },
      date: "",
      tax_clear_year: "",
      is_approve: "",
    },
  ]);

  /* pagination start */
  const [startWith, setStartWith] = useState(0);
  const [showItemLength, setShowItemLength] = useState(10);
  let tp = parseFloat(allData.length) / parseInt(showItemLength);
  const [paginateOptionShow, setPaginateOptionShow] = useState(false);
  /* pagination end */

  const organizationData = parseCookies();

  const [org, setOrg] = useState([{}]);


  useEffect(() => {
    const organization_info = JSON.parse(organizationData?.organization);
    setOrg(organization_info);
    let owner_type = 1;
    let organizationID = (props.flag == false ) ? props?.data : organization_info?.id ;
    console.log(organization_info?.id);
    console.log('props.flag : ',props,' organizationID : ',organizationID);
    CitizenHolding(organizationID, owner_type)
      .then((res) => {
        if (res.length > 0) {
          setAllData(res);
        }
        else {
          setAllData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [isBatchPayment, setIsBatchPayment] = useState(false);

  const d = new Date();
  let year = d.getFullYear();

  const result = allData.filter((item, index) => {
    if (item?.totalDemand != 0 && item?.is_hold != 1 && item?.paid_year < year && item?.is_approve != 0)
      return item;
  });

  const [holdingDetailFlag,setHoldingDetailFlag] = useState(0);

  const [holdingDataForDetailComponent,setHoldingDataForDetailComponent] = useState(null);

  const handleHoldingDetails = (id,fl) => {
    setHoldingDetailFlag(!holdingDetailFlag);
    setHoldingDataForDetailComponent({
      holding_id: id,
      flag: fl
    });
    console.log('ID  :',id,' flag : ',fl);
  }

  const HandleBatchPayment = () => {
    setIsBatchPayment(true);
  }

  const HandleGoBack = () => {
    setIsBatchPayment(false);
  }

  const goBack = () => {
    setHoldingDataForDetailComponent(null);
  }

  return (
    <>
      
      {holdingDataForDetailComponent != null && 
        <>
          <div className="relative">
            <button className="right m-4 bg-[#CF0000] text-white p-2 text-14 leading-[14px] text-white px-[37px] py-[10px] lg:px-[61px] lg:py-[12px] rounded-md" onClick={goBack}>পিছনে</button>
            <HoldingDetails data={holdingDataForDetailComponent} /> 
          </div>
        </>
      }

      {isBatchPayment && <BatchPayment data={result} user={org} onButtonClick={HandleGoBack} />}

      {
        !isBatchPayment && holdingDataForDetailComponent == null &&
        <div className="bg-white px-2 lg:px-[32px] w-full rounded-lg">
          <div className="py-[14px] w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
            <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">
              সংস্থার অন্তর্ভুক্ত হোল্ডিং তথ্যবলি
            </h3>
          </div>
          <div className="">
            {
              allData != '' &&
              <button className="btn-primary my-4 float-right" onClick={HandleBatchPayment}>
                <span className="text-14 leading-[14px] bg-[#12633D] text-white px-[37px] py-[10px] lg:px-[61px] lg:py-[12px] rounded-md">
                  ব্যাচ পেমেন্ট</span>
              </button>
            }
          </div>
          <div className="w-full">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full border border-lg">
                <thead className="h-[30px] text-[#12633D] bg-green-700 border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                      ক্রম
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                      মৌজা
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                      হোল্ডিং নং
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                      খতিয়ান
                    </th>
                    <th scope="col" className="w-[167px] text-sm font-medium text-gray-50 px-3 py-2  text-center">
                      সর্বশেষ কর পরিশোধের সাল
                    </th>
                    <th scope="col" className="w-[46px] text-sm font-medium text-gray-50 px-3 py-2  text-center">
                      স্ট্যাটাস
                    </th>
                    <th scope="col" className="w-[50px] text-sm font-medium text-gray-50 px-3 py-2  text-center">
                      পদক্ষেপ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allData != '' > 0 &&
                    allData
                      ?.slice(startWith, startWith + showItemLength)
                      ?.map((item, index) => {
                        return (
                          <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">{en2bn(index + startWith + 1)}</span>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]"> {item?.moujas?.name_bd} - {item?.moujas?.jl_no == null ? ' ' : en2bn(item?.moujas?.jl_no)}</span>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">{item?.holding_no == null ? ' ' : en2bn(item?.holding_no)}</span>
                            </td>
                            {/* <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">{item?.land_schedules?.dag_no == null ?  ' ' : en2bn(item?.land_schedules?.dag_no)}</span>
                                            </td> */}
                            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">{en2bn(item?.khotian_no)}</span>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">{item?.paid_year == null ? ' ' : en2bn(item?.paid_year)}</span>
                            </td>

                            {
                              item?.is_hold == 0 ?
                                <td className=" text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                  <span className="font-bold leading-10 text-[15px] text-weight-400 text-[#A5008A]">{item?.is_approve == 1 && 'অনুমোদিত'}</span>
                                  <span className="font-bold leading-10 text-[15px] text-weight-400 text-[#EDB900]">{item?.is_approve == 0 && 'অপেক্ষমান'}</span>
                                </td> : <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                  <span className="font-bold leading-10 text-[15px] text-weight-400 text-[#CF0000]">স্থগিত</span>
                                </td>
                            }


                            <td className="text-sm text-gray-900 font-light px-3 py-2">
                              {/* {
                                                props?.flag == 'false' && <HoldingDetails data={item?.id} flag={'false'} />
                                              } */}

                              {
                                props.flag == false ? 
                                  <button onClick={() => handleHoldingDetails(item?.id,props.flag)}>View</button> : 
                                  <Link href={{ pathname: `/organization/holding/${item?.id}` }} shallow
                                  className="">
                                  <span>
                                    <svg className="fill-green-400" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                                  </span>
                                </Link>
                              }

                            </td>

                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
            {allData?.length == 0 ? (
              <div className="w-full h-[10vh] lg:h-[20vh] flex justify-center items-center">
                <span className="text-[#777777] text-16">
                  কোনো তথ্য পাওয়া যায়নি।
                </span>
              </div>
            ) : (
              allData?.length > showItemLength && (
                <div className="w-full">
                  <div className="py-4">
                    <div className="flex justify-end lg:justify-end space-x-3 lg:space-x-8 items-center">
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-col items-end relative">
                          {paginateOptionShow && (
                            <div
                              className="z-50 absolute -top-[100px] bg-white rounded-md border drop-shadow-xl"
                              onMouseEnter={() => setPaginateOptionShow(true)}
                              onMouseLeave={() => setPaginateOptionShow(false)}
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
                          <div>
                            <button
                              type="button"
                              onMouseEnter={() => setPaginateOptionShow(true)}
                              onMouseLeave={() => setPaginateOptionShow(false)}
                              onClick={() =>
                                setPaginateOptionShow(!paginateOptionShow)
                              }
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
          </div>
        </div>
      }

    </>
  );
};

export default Holding;
