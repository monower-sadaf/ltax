"use client"

import { CitizenKhotianList, DeleteComplain, DeleteKhotian } from "@/app/_api/api";
import { en2bn, formatdate, relative_image_path } from "../../../halpers/helper";
import Link from "next/link";
import { useState, useEffect } from 'react';
import KhotianModal from "../_components/KhotianModal"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ConfirmBox from '../../_components/ConfirmBox'
import { parseCookies } from 'nookies';
// import Modal from '../../_components/Modal';
import Details from "../_components/Khotian/Details";
import Modal from "@/app/_components/Radix/Modal";

export default function Khotian() {

    const router = useRouter();

    let citizen = parseCookies();
    let c = JSON.parse(citizen?.citizen);


    const cn_data = c;
    const id = c?.id;
    const [paginateOptionShow, setPaginateOptionShow] = useState(false);

    /* pagination start */
    const [allData, setAllData] = useState([]);
    const [startWith, setStartWith] = useState(0);
    const [showItemLength, setShowItemLength] = useState(5);
    let tp = (parseFloat(allData?.length)) / (parseInt(showItemLength));
    /* pagination end */

    useEffect(() => {
        if (c?.id == undefined) router.push('/citizen/khotian');
        CitizenKhotianList(c?.id).then(dataArray => {
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

    return (
        <>
            <div className="bg-white px-2  w-full rounded-lg">
                <div className="py-[14px] w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
                    <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">খতিয়ান তথ্যাবলী (
                        {
                            allData?.length > 0 ? en2bn(allData?.length) : en2bn(0)
                        }
                        )</h3>
                    <div>
                        <Link href={{ pathname: '/citizen/khotian/create' }} shallow className="text-[12px] leading-[12.14px] lg:text-[14px] lg:leading-[14.16px] border border-primary flex items-center justify-center space-x-1 px-[8px] py-[6px] rounded-md">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.4844 3L12.8333 5.34896C12.9323 5.44792 12.9323 5.60937 12.8333 5.70833L7.14583 11.3958L4.72917 11.6641C4.40625 11.7005 4.13281 11.4271 4.16927 11.1042L4.4375 8.6875L10.125 3C10.224 2.90104 10.3854 2.90104 10.4844 3ZM14.7031 2.40365L13.4323 1.13281C13.0365 0.736979 12.3932 0.736979 11.9948 1.13281L11.0729 2.05469C10.974 2.15365 10.974 2.3151 11.0729 2.41406L13.4219 4.76302C13.5208 4.86198 13.6823 4.86198 13.7812 4.76302L14.7031 3.84115C15.099 3.44271 15.099 2.79948 14.7031 2.40365ZM10 9.84896V12.5H1.66667V4.16667H7.65104C7.73437 4.16667 7.8125 4.13281 7.8724 4.07552L8.91406 3.03385C9.11198 2.83594 8.97135 2.5 8.69271 2.5H1.25C0.559896 2.5 0 3.0599 0 3.75V12.9167C0 13.6068 0.559896 14.1667 1.25 14.1667H10.4167C11.1068 14.1667 11.6667 13.6068 11.6667 12.9167V8.80729C11.6667 8.52865 11.3307 8.39062 11.1328 8.58594L10.0911 9.6276C10.0339 9.6875 10 9.76562 10 9.84896Z" fill="#CF0000" />
                            </svg>
                            <span>নতুন খতিয়ান তথ্য প্রদান করতে ক্লিক করুন</span>
                        </Link>
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border">
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
                                {allData?.length > 0 && allData?.slice(startWith, startWith + showItemLength)?.map((item, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                {en2bn(index + startWith + 1)}
                                            </td>
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

                                                <Modal
                                                    cancelBtn={'বাতিল করুন'}
                                                    icon={
                                                        <svg className="fill-green-400" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                                                    }
                                                    className="w-full h-full"
                                                >
                                                    <Details
                                                        data={item}
                                                        id={item?.khotian_no}
                                                        owner={cn_data?.name}
                                                        owner_father={cn_data?.father_name}
                                                        owner_attachment={item?.attachment}
                                                        warish={item?.warish_khotian}
                                                    />
                                                </Modal>

                                                <ConfirmBox message="আপনি কি খতিয়ানটি মুছে ফেলতে চান ?" onConfirm={(e) => handleDelete(item?.id)} />
                                            </td>
                                        </tr>
                                    )
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
        /*         <div className="flex flex-col w-full">
                    <div className="px-[13px] lg:px-[16px] pb-[13px] lg:pb-[18px] bg-[#fff]">
                        <div className="flex flex-col lg:flex-row items-center pt-4 lg:pt-0 justify-center">
                            <div className="items-center justify-start w-full inline-flex pb-[6px]">
                                <hr className="w-full h-px bg-[#BABABA] border-0" />
                                <span className="absolute pr-[5px] text-[#0E1F1C] bg-white text-[14px] leading-[16.09px] lg:text-[16px] lg:leading-[18.38px] font-bold">খতিয়ান তথ্যবলি ({
                                    allData?.length > 0 ? en2bn(allData?.length) : en2bn(0)
                                })</span>
                            </div>
                            <div className="lg:w-[45%] flex items-center justify-end space-x-[5px] pb-[12px] lg:pb-[19px] mt-5">
                                <Link prefetch={false} href={{ pathname: '/citizen/khotian/create' }} shallow className="text-[12px] leading-[12.14px] lg:text-[14px] lg:leading-[14.16px] border border-primary flex items-center justify-center space-x-1 px-[8px] py-[6px] rounded-md">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.4844 3L12.8333 5.34896C12.9323 5.44792 12.9323 5.60937 12.8333 5.70833L7.14583 11.3958L4.72917 11.6641C4.40625 11.7005 4.13281 11.4271 4.16927 11.1042L4.4375 8.6875L10.125 3C10.224 2.90104 10.3854 2.90104 10.4844 3ZM14.7031 2.40365L13.4323 1.13281C13.0365 0.736979 12.3932 0.736979 11.9948 1.13281L11.0729 2.05469C10.974 2.15365 10.974 2.3151 11.0729 2.41406L13.4219 4.76302C13.5208 4.86198 13.6823 4.86198 13.7812 4.76302L14.7031 3.84115C15.099 3.44271 15.099 2.79948 14.7031 2.40365ZM10 9.84896V12.5H1.66667V4.16667H7.65104C7.73437 4.16667 7.8125 4.13281 7.8724 4.07552L8.91406 3.03385C9.11198 2.83594 8.97135 2.5 8.69271 2.5H1.25C0.559896 2.5 0 3.0599 0 3.75V12.9167C0 13.6068 0.559896 14.1667 1.25 14.1667H10.4167C11.1068 14.1667 11.6667 13.6068 11.6667 12.9167V8.80729C11.6667 8.52865 11.3307 8.39062 11.1328 8.58594L10.0911 9.6276C10.0339 9.6875 10 9.76562 10 9.84896Z" fill="#CF0000"/>
                                    </svg>
                                    <span>নতুন খতিয়ান তথ্য প্রদান করতে ক্লিক করুন</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="sm:mx-0.5 lg:mx-0.5">
                        <div className="">
                            <div className="bg-[#FFFF] pb-4">
                                <table className="min-w-full">
                                    <thead className="h-[30px] text-[#12633D] bg-green-700 border-b">
        
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                                ক্রম
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                                                বিভাগ
                                            </th>
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
                                                পদক্ষেপ
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allData?.length > 0 && allData?.slice(startWith, startWith + showItemLength)?.map((item, index) => {
                                            
                                            return <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {en2bn(index+startWith+1)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {item?.division}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {item?.district}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {item?.upazila}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {item?.mouja_name} - {en2bn(item?.jl_no)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {en2bn(item?.khotian_no)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {en2bn(item?.holding_no)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                                                    {
                                                        en2bn(formatdate(item?.created_at))
                                                    }
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    
                                                    <KhotianModal
                                                        data={[
                                                            cn_data?.name,cn_data?.father_name,item?.khotian_id,item?.attachment,item?.warish
                                                        ]}
                                                    />
        
                                                    {
                                                        item?.status == 3 && <><Modal btn="বাতিলের কারন" data={[item?.khotian_id,item?.reason_for_reject]}/>
                                                        <ConfirmBox message="আপনি কি খতিয়ানটি মুছে ফেলতে চান ?" onConfirm={(e) => handleDelete(item?.khotian_id)} /></>
                                                    }
                                                    {
                                                        item?.status == 0 && <><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  my-2 mx-2 py-2 px-4 mb-2 w-full">অপেক্ষমাণ</button>  
                                                        <ConfirmBox message="আপনি কি খতিয়ানটি মুছে ফেলতে চান ?" onConfirm={(e) => handleDelete(item?.khotian_id)} /></>
                                                    }
        
                                                    
                                                </td>
                                            </tr>
                                        })}
        
        
        
                                    </tbody>
                                </table>
                                
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
                                                    <div onClick={() => setStartWith(startWith + showItemLength <= allData?.length ? startWith + showItemLength : allData?.users?.length - showItemLength)}>
                                                        <img  src={relative_image_path("FaCaretUpRight.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                                    </div>
                                                    <div onClick={() => setStartWith(allData?.users?.length - showItemLength < 1 ? 0 : allData?.length - showItemLength)}>
                                                        <img  src={relative_image_path("FaCaretUpDuboleRight.svg")} alt="ভূমি উন্নয়ন কর" className="cursor-pointer" />
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
        
                            </div>
                        </div>
                    </div>
                </div> */
    )
}
