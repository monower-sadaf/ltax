import { useState, useEffect } from "react";
import Image from "next/image";
import { relative_image_path } from "@/halpers/helper";
import Modal2 from "@/app/_components/Modal/Modal2";
import Link from "next/link";

const Profile = () => {
  
  const [edit, setEdit] = useState(false);
  const [orgInfo,setOrgInfo] = useState([]);

  const [formInputs, setFormInputs] = useState({
    orgName: "",
    email: "",
    type: "",
    category: "",
    address: "",
  });

  const organization = JSON.parse(sessionStorage.getItem('organization'));

  const org = organization[0] ;

  /*
  useEffect(() => {
    user(org?.id).then(res => {
      setOrgInfo(res[0]);
      if(res[0] != '') {
        
        
        categoryById(orgInfo?.org_category_id).then(category_res => {
          console.log('category_res : ',category_res);
        })
        
        
      }
    });
  },[]);
  */

  const formSubmit = (e) => {
    e.preventDefault();
    profileUpdate(formInputs).then(data => {
      console.log(data);
      toast.success(data?.msg);
    });
  };

  console.log(orgInfo);

  return (
    <>
      <section
        className={`container mx-auto px-[24px] lg:px-8 py-[20px] lg:py-[14px] bg-[#fff] rounded-md min-h-screen`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault(), profileUpdate();
          }}
          className="pb-10"
        >
          <div className="flex flex-col justify-center items-center lg:items-start pb-[23px] lg:pb-[33px]">
            <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] pb-[10px] lg:pb-[6px]">
              প্রোফাইল{" "}
            </h3>
            <p className="text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px] text-[#777777]">
              সংস্থার প্রোফাইল তথ্যাবলী
            </p>
          </div>
          <div className="inline-flex items-center justify-start w-full lg:w-[50%] lg:hidden">
            <hr className="w-full h-px my-[14px] bg-[#BABABA] border-0" />
            <span className="absolute pr-[10px] text-[#0E1F1C] bg-white text-12 font-bold">
              সংস্থার তথ্যাবলী
            </span>
          </div>
          <div className="flex space-x-[10px] lg:space-x-[23px]">
            <div className="w-[6.1875em] lg:w-[11.1875em] pt-[12px]">
              <Image
                className="border border-[#198754]"
                src={relative_image_path("company1.jpg")}
                height={1000}
                width={1000}
                alt="image error"
              />
            </div>
            <div className="w-full">
              <div className="items-center justify-start w-full hidden lg:inline-flex">
                <hr className="w-full h-px bg-[#BABABA] border-0" />
                <span className="absolute pr-[10px] text-[#0E1F1C] bg-white text-16 font-bold">
                  সংস্থার তথ্যাবলী
                </span>
              </div>
              <div className="mt-[10px] lg:mt-[16px] flex flex-col lg:flex-row lg:justify-between">
                <div className="flex flex-col space-y-[10px] lg:space-y-[15px] pb-[13px] lg:pb-0 lg:w-[70%]">
                  <div className="flex lg:justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                    <p className=" lg:w-[30%] text-primary">সংস্থার নাম</p>
                    <div className="lg:w-[70%]">
                      {edit ? (
                        <input
                          className="h-10 border border-[#BABABA] rounded-md w-full"
                          type="text" name="orgName"
                          value={orgInfo?.org_name}
                          onChange={(e) => { 
                            setOrgData((prev)=>{
                              return {
                                ...prev,
                                name: e.target.value
                              }
                            })
                           }}
                        />
                      ) : (
                        <p className=" text-[#0E1F1C]">{ orgInfo?.org_name }</p>
                      )}
                    </div>
                  </div>
                  <div className="flex lg:justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                    <p className=" lg:w-[30%] text-primary">
                      সংস্থার ক্যাটাগরি
                    </p>
                    <div className="lg:w-[70%]">
                      {edit ? (
                        <select
                          className="h-10 border border-[#BABABA] rounded-md w-full cursor-pointer"
                          name="category"
                          id=""
                        >
                          <option  value="">{ orgInfo?.category }</option>
                          <option selected value="">{ orgInfo?.category } 2</option>
                        </select>
                      ) : (
                        <p className=" text-[#0E1F1C]">{ orgInfo?.org_category_name
                          ?.name }</p>
                      )}
                    </div>
                  </div>
                  <div className="flex lg:justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                    <p className=" lg:w-[30%] text-primary">সংস্থার ধরন</p>
                    <div className="lg:w-[70%]">
                      {edit ? (
                        <select
                          className="h-10 border border-[#BABABA] rounded-md w-full cursor-pointer"
                          name="type"
                          id=""
                        >
                          <option value="">{ orgInfo?.type_name?.type }</option>
                        </select>
                      ) : (
                        <p className=" text-[#0E1F1C]">{ orgInfo?.type_name?.type }</p>
                      )}
                    </div>
                  </div>
                  <div className="flex lg:justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                    <p className=" lg:w-[30%] text-primary">
                      সংস্থার মোবাইল নম্বর
                    </p>
                    <div className="lg:w-[70%]">
                      {edit ? (
                        <input
                          className="h-10 border border-[#BABABA] rounded-md w-full"
                          type="text" name="mobile"
                          value={orgInfo?.org_mobile}
                        />
                      ) : (
                        <p className=" text-[#0E1F1C]">{ orgInfo?.org_mobile }</p>
                      )}
                    </div>
                  </div>
                  <div className="flex lg:justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                    <p className=" lg:w-[30%] text-primary">ই-মেইল</p>
                    <div className="lg:w-[70%]">
                      {edit ? (
                        <input
                          className="h-10 border border-[#BABABA] rounded-md w-full"
                          type="text" name="email"
                          value={orgInfo?.org_email}
                        />
                      ) : (
                        <p className=" text-[#0E1F1C]">
                          { orgInfo?.org_email }
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex lg:justify-between  text-12 leading-[12px] lg:text-16 lg:leading-[16px] space-x-2 lg:space-x-0">
                    <p className=" lg:w-[30%] text-primary">সংস্থার ঠিকানা</p>
                    <div className="lg:w-[70%]">
                      {edit ? (
                        <textarea
                          className="w-full border border-[#BABABA] rounded-md"
                          name="address"
                          id=""
                          cols="18"
                          rows="5"
                          value={
                            orgInfo?.org_address
                          }
                        ></textarea>
                      ) : (
                        <p className=" text-[#0E1F1C]">
                          { orgInfo?.org_address }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/*
                <div className="flex items-start justify-end lg:w-[30%]">
                  {!edit && (
                    <div className="flex flex-col items-end">
                      <p className="text-[10px] leading-[10.11px] lg:text-[14px] lg:leading-[14.16px] mr-[5px] pb-2">
                        প্রোফাইল আপডেট বা তথ্য সংশোধন
                      </p>
                      <button
                        onClick={(e) => {
                          e.preventDefault(), setEdit((prev) => !prev);
                        }}
                        className="flex items-center space-x-1 text-10 leading-[10.11px] lg:text-14 lg:leading-[14.16px] border border-[#A5008A] px-2 py-1 rounded-md"
                      >
                        <span>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.4844 3L12.8333 5.34896C12.9323 5.44792 12.9323 5.60937 12.8333 5.70833L7.14583 11.3958L4.72917 11.6641C4.40625 11.7005 4.13281 11.4271 4.16927 11.1042L4.4375 8.6875L10.125 3C10.224 2.90104 10.3854 2.90104 10.4844 3ZM14.7031 2.40365L13.4323 1.13281C13.0365 0.736979 12.3932 0.736979 11.9948 1.13281L11.0729 2.05469C10.974 2.15365 10.974 2.3151 11.0729 2.41406L13.4219 4.76302C13.5208 4.86198 13.6823 4.86198 13.7812 4.76302L14.7031 3.84115C15.099 3.44271 15.099 2.79948 14.7031 2.40365ZM10 9.84896V12.5H1.66667V4.16667H7.65104C7.73437 4.16667 7.8125 4.13281 7.8724 4.07552L8.91406 3.03385C9.11198 2.83594 8.97135 2.5 8.69271 2.5H1.25C0.559896 2.5 0 3.0599 0 3.75V12.9167C0 13.6068 0.559896 14.1667 1.25 14.1667H10.4167C11.1068 14.1667 11.6667 13.6068 11.6667 12.9167V8.80729C11.6667 8.52865 11.3307 8.39062 11.1328 8.58594L10.0911 9.6276C10.0339 9.6875 10 9.76562 10 9.84896Z"
                              fill="#A5008A"
                            />
                          </svg>
                        </span>
                        <span>প্রোফাইল আপডেট</span>
                      </button>
                    </div>
                  )}
                </div>
                */}
              </div>
            </div>
          </div>
          {/*
          <div className="lg:pt-7">
            <div className="items-center justify-start w-full inline-flex pb-[28px] lg:pb-[43px]">
              <hr className="w-full h-px bg-[#BABABA] border-0" />
              <span className="absolute pr-[10px] text-[#0E1F1C] bg-white font-bold text-12 leading-[13.79px] lg:text-16 lg:leading-[18.38px]">
                প্রতিনিধির তথ্যাবলী
              </span>
            </div>
            <div className="flex items-center  pb-2 lg:pb-[6px] text-12 leading-[12px] lg:text-16 lg:leading-[16px]">
              <p className="w-[7em]">প্রতিনিধির নাম</p>
              <div className="w-[10em] lg:w-[35em]">
                {edit ? (
                  <input
                    className="h-10 border border-[#BABABA] rounded-md w-full"
                    type="text"
                    value={ orgInfo?.contactPerson.name }
                  />
                ) : (
                  <p>{ orgInfo?.contactPerson.name }</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center  pb-2 lg:pb-[6px] text-12 leading-[12px] lg:text-16 lg:leading-[16px]">
              <p className="w-[7em]">প্রতিনিধির পদবী</p>
              <div className="w-[10em] lg:w-[35em]">
                {edit ? (
                  <input
                    className="h-10 border border-[#BABABA] rounded-md w-full"
                    type="text"
                    value={ orgInfo?.contactPerson.designation }
                  />
                ) : (
                  <p>{ orgInfo?.contactPerson.designation }</p>
                )}
              </div>
            </div>
            <div className="flex items-center  pb-2 lg:pb-[6px] text-12 leading-[12px] lg:text-16 lg:leading-[16px]">
              <p className="w-[7em]">মোবাইল নম্বর</p>
              <div className="w-[10em] lg:w-[35em]">
                {edit ? (
                  <input
                    className="h-10 border border-[#BABABA] rounded-md w-full"
                    type="text"
                    value={ org.contactPerson.phone }
                  />
                ) : (
                  <p>{ org.contactPerson.phone }</p>
                )}
              </div>
            </div>
          </div>
          */}
          {edit && (
            <div className="flex justify-end">
              <div className="flex space-x-3 text-12 leading-[12px] lg:text-16 lg:leading-[16px]">
                <button
                  onClick={(e) => {
                    e.preventDefault(), setEdit(false);
                  }}
                  className="text-12 leading-[12px] lg:text-16 lg:leading-[16px] text-[#777777] border border-[#BABABA] hover:bg-[#777777] hover:text-white active:bg-[#777777] active:text-white px-5 py-2 rounded-md"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="text-12 leading-[12px] lg:text-16 lg:leading-[16px] text-white bg-[#A5008A] border border-[#A5008A] hover:bg-white hover:text-[#A5008A] active:bg-white active:text-[#A5008A] px-5 py-2 rounded-md"
                >
                  আপডেট
                </button>
              </div>
            </div>
          )}
        </form>
        {!edit && (
          <div>
            <div className="items-center justify-start w-full inline-flex pb-[28px] lg:pb-[43px]">
              <hr className="w-full h-px bg-[#BABABA] border-0" />
              <span className="absolute pr-[10px] text-[#0E1F1C] bg-white font-bold text-12 leading-[13.79px] lg:text-16 lg:leading-[18.38px]">
                অন্তর্ভুক্ত সংস্থার তথ্যাবলী
              </span>
            </div>
            <div>
              <div className="flex justify-center">
                <Modal2 />
                <Link 
                  href={{
                    pathname: '/organization/related-organizations',
                  }}
                  shallow
                className="text-14 leading-[14.16px] text-white bg-[#A5008A] p-3 rounded-md ml-2">
                সকল অন্তর্ভুক্ত সংস্থা বিবরণ
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Profile;
