import { en2bn, relative_image_path, formatStringForDate } from "@/halpers/helper";
import { parseCookies } from "nookies";

export default function Profile() {

    let citizenInfo = parseCookies();
    let citizen = JSON.parse(citizenInfo?.citizen);

    return (
        <>
            <section className={`container mx-auto px-[24px] lg:px-8 py-[20px] lg:py-[14px] bg-[#fff] rounded-md h-full`}>
                <div className="flex flex-col justify-center items-center lg:items-start pb-[23px] lg:pb-[33px]">
                    <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] pb-[10px] lg:pb-[6px]">প্রোফাইল </h3>
                    <p className="text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px] text-[#777777]">নাগরিক প্রোফাইল তথ্যাবলী</p>
                </div>
                <div className="inline-flex items-center justify-start w-full lg:w-[50%] lg:hidden">
                    <hr className="w-full h-px my-[14px] bg-[#BABABA] border-0" />
                    <span className="absolute pr-[10px] text-[#0E1F1C] bg-white text-12 font-bold">নাগরিক তথ্যাবলী</span>
                </div>
                <div className="flex space-x-[10px] lg:space-x-[23px]">
                    <div className="w-[6.1875em] lg:w-[11.1875em] pt-[12px]">
                        <img className="" src={relative_image_path('citizenprofile.webp')} height={1000} width={1000} alt="image error" />
                    </div>
                    <div className="lg:w-full">
                        <div className="items-center justify-start w-full hidden lg:inline-flex">
                            <hr className="w-full h-px bg-[#BABABA] border-0" />
                            <span className="absolute pr-[10px] text-[#0E1F1C] bg-white text-16 font-bold">নাগরিক তথ্যাবলী</span>
                        </div>
                        <div className="mt-[10px] lg:mt-[16px] flex flex-col lg:flex-row lg:justify-between">
                            <div className="flex flex-col space-y-[10px] lg:space-y-[15px] pb-[13px] lg:pb-0 lg:w-[60%]">
                                <div className="flex justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                                    <p className=" lg:w-[50%] text-primary">নাগরিক নাম</p>
                                    <p className="lg:w-[50%] text-[#0E1F1C]">{citizen?.name}</p>
                                </div>
                                <div className="flex justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                                    <p className=" lg:w-[50%] text-primary">পিতার নাম</p>
                                    <p className="lg:w-[50%] text-[#0E1F1C]">{citizen?.father_name}</p>
                                </div>
                                <div className="flex justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                                    <p className=" lg:w-[50%] text-primary">মাতার নাম</p>
                                    <p className="lg:w-[50%] text-[#0E1F1C]">{citizen?.mother_name}</p>
                                </div>
                                <div className="flex justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                                    <p className=" lg:w-[50%] text-primary">জন্ম তারিখ</p>
                                    <p className="lg:w-[50%] text-[#0E1F1C]">
                                        {
                                           citizen?.dob && en2bn(formatStringForDate(citizen?.dob,10))
                                        }
                                    </p>
                                </div>
                                <div className="flex justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                                    <p className=" lg:w-[50%] text-primary">জাতীয় পরিচয় পত্র</p>
                                    <p className="lg:w-[50%] text-[#0E1F1C]">{en2bn(parseInt(citizen?.nid))}</p>
                                </div>
                                <div className="flex justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                                    <p className=" lg:w-[50%] text-primary">লিঙ্গ</p>
                                    <p className="lg:w-[50%] text-[#0E1F1C]">
                                        {citizen?.gender}
                                    </p>
                                </div>
                                <div className="flex justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                                    <p className=" lg:w-[50%] text-primary">স্থায়ী ঠিকানা</p>
                                    <p className="lg:w-[50%] text-[#0E1F1C]">{citizen?.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:pt-7">
                        <div className="items-center justify-start w-full inline-flex">
                            <hr className="w-full h-px bg-[#BABABA] border-0" />
                            <span className="absolute pr-[10px] text-[#0E1F1C] bg-white font-bold text-12 leading-[13.79px] lg:text-16 lg:leading-[18.38px]">সাধারণ তথ্যাবলী</span>
                        </div>
                        
                                <div className="mt-[10px] lg:mt-[24px] flex flex-col lg:flex-row lg:justify-between">
                                    <div className="flex flex-col space-y-[10px] lg:space-y-[15px] pb-[13px] lg:pb-0 lg:w-[60%]">
                                        <div className="flex space-x-4 text-12 leading-[12px] lg:text-16 lg:leading-[16px]">
                                            <p className=" text-primary w-[30%]">মোবাইল নং</p>
                                            <p className=" text-[#0E1F1C] w-[70%]">{citizen?.username && en2bn(citizen?.username)}</p>
                                        </div>
                                        <div className="flex space-x-4 text-12 leading-[12px] lg:text-16 lg:leading-[16px]">
                                            <p className=" text-primary w-[30%]">ই-মেইল</p>
                                            <p className=" text-[#0E1F1C] w-[70%]">{citizen?.email}</p>
                                        </div>
                                        <div className="flex space-x-4 text-12 leading-[12px] lg:text-16 lg:leading-[16px]">
                                            <p className=" text-primary w-[30%]">বর্তমান ঠিকানা</p>
                                            <p className=" text-[#0E1F1C] w-[70%]">{citizen?.present_address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-end lg:w-[40%]">
                                        <div className="flex items-center space-x-[5px]">
                                            {/*
                                            <p className="text-[10px] leading-[10.11px] lg:text-[14px] lg:leading-[14.16px]">প্রোফাইল আপডেট বা তথ্য  সংশোধন</p>
                                            <button onClick={HandleClick} className="text-10 leading-[10px] lg:text-14 lg:leading-[14.159px] border border-[#A5008A] flex items-center space-x-1 px-[6px] py-[8px] rounded-md">
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.4844 3L12.8333 5.34896C12.9323 5.44792 12.9323 5.60937 12.8333 5.70833L7.14583 11.3958L4.72917 11.6641C4.40625 11.7005 4.13281 11.4271 4.16927 11.1042L4.4375 8.6875L10.125 3C10.224 2.90104 10.3854 2.90104 10.4844 3ZM14.7031 2.40365L13.4323 1.13281C13.0365 0.736979 12.3932 0.736979 11.9948 1.13281L11.0729 2.05469C10.974 2.15365 10.974 2.3151 11.0729 2.41406L13.4219 4.76302C13.5208 4.86198 13.6823 4.86198 13.7812 4.76302L14.7031 3.84115C15.099 3.44271 15.099 2.79948 14.7031 2.40365ZM10 9.84896V12.5H1.66667V4.16667H7.65104C7.73437 4.16667 7.8125 4.13281 7.8724 4.07552L8.91406 3.03385C9.11198 2.83594 8.97135 2.5 8.69271 2.5H1.25C0.559896 2.5 0 3.0599 0 3.75V12.9167C0 13.6068 0.559896 14.1667 1.25 14.1667H10.4167C11.1068 14.1667 11.6667 13.6068 11.6667 12.9167V8.80729C11.6667 8.52865 11.3307 8.39062 11.1328 8.58594L10.0911 9.6276C10.0339 9.6875 10 9.76562 10 9.84896Z" fill="#A5008A"/>
                                                </svg>
                                                <span>সংশোধন</span>
                                            </button>
                                            */}
                                        </div>
                                    </div>
                                </div>
                            
                        
                    </div>
            </section>
        </>


    )
}
