'use client'

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { en2bn,relative_image_path } from "@/halpers/helper";
import { useState } from "react";

const Home = () => {
    
    // const val = useSelector((state) => state.includeOrg.value);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();
    console.log('included organization id: ', id);


    const data = [
        {
            id: 1,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 2,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 3,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 4,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 5,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 6,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 7,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 8,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 9,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 10,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 11,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 12,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 13,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 14,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
        {
            id: 15,
            oraganizationName: 'ব্রাক আইটি',
            mouza: 'গোবিন্দপুর',
            holdingNo: 213,
            dakhilaNo: 213,
            dabi: 213,
            porisodherTarik: '14/01/2022'
        },
    ];

    /* pagination start */
    const [allData, setAllData] = useState(data);
    const [startWith, setStartWith] = useState(0);
    const [showItemLength, setShowItemLength] = useState(10);
    let tp = (parseFloat(allData.length)) / (parseInt(showItemLength));
    const [paginateOptionShow, setPaginateOptionShow] = useState(false);
    /* pagination end */

    if(id == 0){
        router.push('/organization/included-organization/');
    }else{
        return (<>
            {/* this is included organization dakhila { id } */}
            <section className="bg-white p-4 rounded-lg w-full">
            <div className="pb-4">
                <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px]">দাখিলা তথ্যবলি company { id }</h3>
                <p className="text-[#777777]">ভূমি উন্নয়ন কর পরিশোধ রসিদসমূহ</p>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-lg">
                        <thead className="h-[30px] text-[#12633D] bg-green-700 border-b">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                    ক্রম
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                    সংস্থার নাম
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                    মৌজা
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                    হোল্ডিং নং
                                </th>
                                <th scope="col" className=" text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                    দাখিলা নং
                                </th>
                                <th scope="col" className=" text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                    দাবি
                                </th>
                                <th scope="col" className=" text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                    পরিশোধ তারিখ
                                </th>
                                <th scope="col" className=" text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                    পদক্ষেপ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.slice(startWith, startWith + showItemLength)?.map((item, index) => (
                                    <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                            <span className="leading-10 text-[15px] text-[#0E1F1C]">{en2bn(item?.id)} </span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                            <span className="leading-10 text-[15px] text-[#0E1F1C]">{item?.oraganizationName}</span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                            <span className="leading-10 text-[15px] text-[#0E1F1C]">{item?.mouza}</span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                            <span className="leading-10 text-[15px] text-[#0E1F1C]">{en2bn(item?.holdingNo)} </span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                            <span className="leading-10 text-[15px] text-[#0E1F1C]">{ en2bn(item?.dakhilaNo) }</span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                            <span className="leading-10 text-[15px] text-[#0E1F1C]">{ en2bn(item?.dabi) }</span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                            <span className="leading-10 text-[15px] text-[#0E1F1C]">{ en2bn(item?.porisodherTarik) } </span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                            <span className="leading-10 text-[15px] text-[#0E1F1C]">
                                                <Link href={{pathname: '#'}} shallow className="inline-flex items-center space-x-1 text-secondary  hover:scale-125 transition-all duration-700">
                                                    <span>বিস্তারিত</span>
                                                    <span>
                                                        <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.96 0.5L10.71 4.25V5.3L6.96 9.05L5.895 8L8.355 5.525H0V4.025H8.355L5.88 1.55L6.96 0.5Z" fill="#198754"/>
                                                        </svg>
                                                    </span>
                                                </Link>
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                <div>
                    {/* pagination */}
                    <div className="mt-4 pt-3">
                        <div className="flex justify-end lg:justify-end space-x-3 lg:space-x-8 items-center">
                            <div className="flex items-center space-x-2">
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button type="button"
                                            onMouseEnter={() => setPaginateOptionShow(true)}
                                            onMouseLeave={() => setPaginateOptionShow(false)}

                                            className="text-12 text-deepgreen flex justify-between" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            সর্বমোট পৃষ্ঠা - {en2bn(Math.ceil(tp))}


                                            <svg className="ml-2" width={20} height={20}
                                                viewBox="0 0 15 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">

                                                <path d="M1.875 5.2125L2.26219 4.6875L12.7566 4.6875L13.125 5.19375L7.84969 10.3125H7.07437L1.875 5.2125Z" fill="#1E433D" /></svg>

                                        </button>
                                    </div>
                                    {paginateOptionShow &&
                                        <div
                                            onMouseEnter={() => setPaginateOptionShow(true)}
                                            onMouseLeave={() => setPaginateOptionShow(false)}
                                            className="absolute top-3 right-0 z-10 mt-2 origin-top-right 
                        rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
                        focus:outline-none" role="menu" aria-orientation="vertical"
                                            aria-labelledby="menu-button"
                                            tabIndex={-1}>
                                            <div className="py-1" role="none">

                                                <ul className="py-2 text-semiblack text-sm pb-3 flex flex-col space-y-2" aria-labelledby="dropdownHoverButtonPagenationList">
                                                    <li>
                                                        <a href onClick={(e) => {e.preventDefault()
                                                            setShowItemLength(5)
                                                        }
                                                        } className="block hover:text-magenta mx-3 cursor-pointer">{en2bn(5)}</a>
                                                    </li>
                                                    <li>
                                                        <a href onClick={(e) => {e.preventDefault()
                                                            setShowItemLength(20)
                                                        }
                                                        } className="block hover:text-magenta mx-3 cursor-pointer">{en2bn(20)}</a>
                                                    </li>
                                                    <li>
                                                        <a href onClick={(e) => {e.preventDefault()
                                                            setShowItemLength(30)
                                                        }
                                                        } className="block hover:text-magenta mx-3 cursor-pointer">{en2bn(30)}</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>}

                                </div>
                            </div>
                            <div>
                                <p className="text-12 text-deepgreen">ক্রম নং- {en2bn(startWith+1)}-{en2bn(startWith + showItemLength)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div onClick={() => setStartWith(0)}>
                                    <img  src={relative_image_path("FaCaretUpDuboleLeft.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                </div>
                                <div onClick={() => setStartWith(startWith - showItemLength < 1 ? 0 : startWith - showItemLength)}>
                                    <img  src={relative_image_path("FaCaretUpLeft.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                </div>
                                {startWith + showItemLength >= allData?.length ?
                                    <>
                                        <div>
                                            <img  src={relative_image_path("FaCaretUpRight.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                        </div>
                                        <div >
                                            <img  src={relative_image_path("FaCaretUpDuboleRight.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div onClick={() => setStartWith(startWith + showItemLength <= allData?.length ? startWith + showItemLength : allData?.length - showItemLength)}>
                                            <img  src={relative_image_path("FaCaretUpRight.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                        </div>
                                        <div onClick={() => setStartWith(allData?.length - showItemLength < 1 ? 0 : allData?.length - showItemLength)}>
                                            <img  src={relative_image_path("FaCaretUpDuboleRight.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>)
    }
};

export default Home;