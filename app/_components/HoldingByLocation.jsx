'use client'
import { useParams } from "next/navigation";
import BatchPayment from "./BatchPayment";
import { useState } from "react";
import { en2bn } from "@/halpers/helper";
import Link from "next/link";

const HoldingByLocation = (props) => {

    const params = useParams();
    const allData = props?.holdingList;

    const user = '';

    const [isBatchPayment,setIsBatchPayment] = useState(false);

    const HandleBatchPayment = () => {
        setIsBatchPayment(true);
    }

    const HandleGoBack = () => {
        setIsBatchPayment(false);
    }

    return (
        <div className="">
            {isBatchPayment && <BatchPayment data={result} user={c} onButtonClick={HandleGoBack} />}
            {
                !isBatchPayment &&
                <div className="bg-white px-2 w-full rounded-lg">
                    <div className="py-[14px] w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
                        <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">
                            হোল্ডিং তথ্যবলি (
                            {
                                allData?.length > 0 ? en2bn(allData?.length) : en2bn(0)
                            }
                            )
                        </h3>
                        {/* <div className="float-right my-4">
                            {
                                allData != '' &&
                                <button className="btn-primary" onClick={HandleBatchPayment}>
                                    <span className="text-14 leading-[14px] bg-[#12633D] text-white px-[37px] py-[10px] lg:px-[61px] lg:py-[12px] rounded-md">
                                        ব্যাচ পেমেন্ট
                                    </span>
                                </button>
                            }
                        </div> */}
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
                                    {allData?.length > 0 && allData?.map((item, index) => {
                                        return <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                                <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">{en2bn(index + 1)}</span>
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
                                                    <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                        <span className="leading-10 text-[15px] text-weight-400 text-[#A5008A]">{item?.is_approve == 1 && 'অনুমোদিত'}</span>
                                                        <span className="leading-10 text-[15px] text-weight-400 text-[#EDB900]">{item?.is_approve == 0 && 'অপেক্ষমান'}</span>
                                                    </td> : <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                        <span className="leading-10 text-[15px] text-weight-400 text-[#CF0000]">স্থগিত</span>
                                                    </td>
                                            }
                                            <td className="text-sm text-gray-900 font-light px-3 py-2">

                                                <Link href={{ pathname: `/citizen/holding/${item?.id}` }} shallow
                                                    className="">
                                                    <span>
                                                        <svg className="fill-green-400" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                                                    </span>
                                                </Link>

                                                <h2>পেমেন্ট</h2>

                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {
                            allData?.length == 0 ? (
                                <div className="w-full h-[10vh] lg:h-[20vh] flex justify-center items-center">
                                    <span className="text-[#777777] text-16">কোনো তথ্য পাওয়া যায়নি।</span>
                                </div>
                            ) : (
                                <div className="w-full">
                                    <div className="py-4">
                                        
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            }
        </div>
    )
}

export default HoldingByLocation;