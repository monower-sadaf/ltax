"use client"

import { en2bn, formatdate, relative_image_path } from "@/halpers/helper";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { PaymentHistory } from "@/app/_api/api";

const PaymentHistoryList = (id) => {

    const router = useRouter();

    const [paginateOptionShow, setPaginateOptionShow] = useState(false);

    /* pagination start */
    const [allData, setAllData] = useState([]);
    const [startWith, setStartWith] = useState(0);
    const [showItemLength, setShowItemLength] = useState(5);
    let tp = (parseFloat(allData?.length)) / (parseInt(showItemLength));
    /* pagination end */

    useEffect(() => {
        PaymentHistory(id).then(dataArray => {
            setAllData(dataArray?.data);
        });
    }, []);

    return (
        <>
            <div className="bg-white px-2  w-full rounded-lg">
                <div className="py-[14px] w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
                    <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">পেমেন্টের তথ্যাবলী</h3>
                </div>
                <div className="w-full">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border">
                            <thead className="h-[30px] text-[#12633D] bg-green-700 border-b">

                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                        ক্রম
                                    </th>

                                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                        হোল্ডিং নং
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                        ব্যাচ পেমেন্ট রেফারেন্স
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                        রিকোয়েস্ট আইডি
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                        ট্রানজেকসন আইডি
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                        দাখিলা
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                        চালান
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                        পেমেন্ট মেথড
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                        সর্বশেষ কর পরিশোদের সাল
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                        দাবি
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allData?.data?.length > 0 && allData?.data?.slice(startWith, startWith + showItemLength)?.map((item, index) => {
                                        return (
                                            <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {en2bn(index + startWith + 1)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {en2bn(item?.holding_no)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {en2bn(item?.batch_ref_id)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {en2bn(item?.transaction_id)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {en2bn(item?.request_id)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {en2bn(item?.dhakhila_no)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {
                                                        en2bn(item?.challan_no)
                                                    }
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {
                                                        item?.web?.toUpperCase()
                                                    }
                                                    {
                                                        item?.app?.toUpperCase()
                                                    }
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {
                                                        en2bn(item?.tax_clear_year)
                                                    }
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {
                                                        en2bn(item?.amount)
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
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
                                    <div className="flex justify-end lg:justify-end space-x-3 lg:space-x-8 items-center">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex flex-col items-end relative">
                                                {
                                                    paginateOptionShow &&
                                                    (
                                                        <div
                                                            className="z-50 absolute -top-[100px] bg-white rounded-md border drop-shadow-xl"
                                                            onMouseEnter={() => setPaginateOptionShow(true)}
                                                            onMouseLeave={() => setPaginateOptionShow(false)}
                                                            role="menu" aria-orientation="vertical"
                                                            aria-labelledby="menu-button"
                                                            tabIndex={-1}>
                                                            <div className="py-1" role="none">

                                                                <ul className="py-2 text-semiblack text-sm pb-3 flex flex-col space-y-2" aria-labelledby="dropdownHoverButtonPagenationList">
                                                                    <li>
                                                                        <a href onClick={(e) => {
                                                                            e.preventDefault()
                                                                            setShowItemLength(5)
                                                                        }
                                                                        } className="block hover:text-magenta mx-3 cursor-pointer">{en2bn(5)}</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href onClick={(e) => {
                                                                            e.preventDefault()
                                                                            setShowItemLength(20)
                                                                        }
                                                                        } className="block hover:text-magenta mx-3 cursor-pointer">{en2bn(20)}</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href onClick={(e) => {
                                                                            e.preventDefault()
                                                                            setShowItemLength(30)
                                                                        }
                                                                        } className="block hover:text-magenta mx-3 cursor-pointer">{en2bn(30)}</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )


                                                }
                                                <div>
                                                    <button type="button"
                                                        onMouseEnter={() => setPaginateOptionShow(true)}
                                                        onMouseLeave={() => setPaginateOptionShow(false)}
                                                        onClick={() => setPaginateOptionShow(!paginateOptionShow)}

                                                        className="text-12 text-deepgreen flex justify-between" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                                        সর্বমোট পৃষ্ঠা - {en2bn(Math.ceil(tp))}


                                                        <svg className="ml-2" width={20} height={20}
                                                            viewBox="0 0 15 15" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">

                                                            <path d="M1.875 5.2125L2.26219 4.6875L12.7566 4.6875L13.125 5.19375L7.84969 10.3125H7.07437L1.875 5.2125Z" fill="#1E433D" /></svg>

                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-12 text-deepgreen">ক্রম নং- {en2bn(startWith + 1)}-{en2bn(startWith + showItemLength)}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div onClick={() => setStartWith(0)}>
                                                <img src={relative_image_path("FaCaretUpDuboleLeft.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                            </div>
                                            <div onClick={() => setStartWith(startWith - showItemLength < 1 ? 0 : startWith - showItemLength)}>
                                                <img src={relative_image_path("FaCaretUpLeft.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                            </div>
                                            {startWith + showItemLength >= allData?.length ?
                                                <>
                                                    <div>
                                                        <img src={relative_image_path("FaCaretUpRight.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                                    </div>
                                                    <div >
                                                        <img src={relative_image_path("FaCaretUpDuboleRight.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div onClick={() => setStartWith(startWith + showItemLength <= allData?.length ? startWith + showItemLength : allData?.users?.length - showItemLength)}>
                                                        <img src={relative_image_path("FaCaretUpRight.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                                    </div>
                                                    <div onClick={() => setStartWith(allData?.users?.length - showItemLength < 1 ? 0 : allData?.length - showItemLength)}>
                                                        <img src={relative_image_path("FaCaretUpDuboleRight.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>

    )
}

export default PaymentHistoryList;
