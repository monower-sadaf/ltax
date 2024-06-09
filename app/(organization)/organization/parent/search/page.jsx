"use client";

import { useState } from "react";
import { SearchParentOrganizationByUsername, SendRequestToParentOrg } from "@/app/_api/api";
import { toast } from "react-toastify";

const Home = () => {

  const [data,setData] = useState({});

  const [searchParams,setSearchParams] = useState({
    parentOrg : null
  });

  const input = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      parentOrg: e.target.value
    }));
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    SearchParentOrganizationByUsername(searchParams?.parentOrg).then(res => {
      if(res?.data?.length < 1){
        toast.danger(res.message);
      } else {
        toast.success(res.message);
        setData(res?.data);
      }
    });
  }

  const sendRequest = (params) => {
    SendRequestToParentOrg(params).then(res => {
      if(res?.data?.length < 1){
        toast.danger(res?.message);
      } else {
        setData(res?.message);
      }
    });
  };

  return (
    <>
      <section className="bg-white min-h-screen w-full rounded-md">
        <div className="w-full p-4">
          <div className="pb-4">
            <h3 className="pb-[14px] text-14 leading-[14.16px] lg:text-20 lg:leading-[20.23px]">প্যারেন্ট সংস্থা</h3>
          </div>
          <div className="pb-4">
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <div className="flex justify-center items-center">
                    <div className="relative w-1/2">
                        <input
                            autoFocus
                            type="search"
                            id="search-dropdown"
                            name="parentOrg"
                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-lg border border-gray-300 focus:outline-none focus:ring-0"
                            placeholder="প্যারেন্ট সংস্থার ইউজারনেম"
                            required
                            onChange={(e) => input(e)}
                        />
                        <button
                            type="submit"
                            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-e-lg border border-primary hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">খুঁজুন</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
          {searchParams == null ? (
            ''
          ) : (
            <>
              {data?.length > 0 ? (
                <div className="w-full overflow-x-auto my-4">
                  <table className="w-full text-center">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th>নাম</th>
                        <th>মোবাইল</th>
                        <th>ইমেইল</th>
                        <th>ঠিকানা</th>
                        <th>পদক্ষেপ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index) => (
                        <tr key={index} className="h-10">
                          <td>{item?.name}</td>
                          <td
                            className={
                              searchParams === item?.mobile && "bg-yellow-200"
                            }
                          >
                            {item?.mobile}
                          </td>
                          <td>{item?.email}</td>
                          <td>{item?.address}</td>
                          <td className="flex flex-col items-center">
                            <button onClick={() => sendRequest(item?.id)} 
                              className="items-center flex items-center bg-[#12633D] text-white text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px] rounded-md px-3 py-2 space-x-2"
                            >
                              <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.2898 4.34204C12.2217 4.17589 12.1109 4.03063 11.9688 3.9209L8.11011 0.161134C8.06963 0.110722 8.01834 0.0700641 7.96001 0.0421712C7.90169 0.0142782 7.83784 -0.00013448 7.77319 9.52274e-07H1.03491C0.931792 -0.000159798 0.829653 0.0200328 0.73435 0.0594214C0.639048 0.09881 0.552456 0.15662 0.479538 0.229538C0.40662 0.302456 0.34881 0.389048 0.309421 0.48435C0.270033 0.579653 0.24984 0.681792 0.250001 0.784913V14.2126C0.24984 14.3158 0.270033 14.4179 0.309421 14.5132C0.34881 14.6085 0.40662 14.6951 0.479538 14.768C0.552456 14.8409 0.639048 14.8988 0.73435 14.9381C0.829653 14.9775 0.931792 14.9977 1.03491 14.9976H11.5061C11.7137 14.9969 11.9126 14.9139 12.0591 14.7667C12.2056 14.6196 12.2877 14.4203 12.2874 14.2126V7.7356V4.34204H12.2898ZM8.20898 1.53442L10.8311 3.99048H8.20898V1.53442ZM6.323 14.1235H1.12647V0.872804H7.33008V4.42627C7.33008 4.54314 7.37651 4.65523 7.45915 4.73787C7.54179 4.82052 7.65388 4.86694 7.77075 4.86694H11.4133V7.7356V14.1235H6.323ZM2.74878 6.46973C2.77737 6.43706 2.81241 6.41065 2.85169 6.39216C2.89097 6.37367 2.93365 6.36351 2.97705 6.36231H8.1272C8.17137 6.36245 8.21501 6.372 8.25521 6.39031C8.29541 6.40862 8.33125 6.43528 8.36035 6.46851C8.42023 6.53572 8.45326 6.62263 8.45313 6.71265C8.45203 6.80266 8.41868 6.88928 8.35913 6.95679C8.33018 6.98997 8.29456 7.01668 8.2546 7.03519C8.21464 7.0537 8.17123 7.06359 8.1272 7.06421H2.98071C2.93655 7.06399 2.89294 7.05441 2.85275 7.0361C2.81256 7.0178 2.77671 6.99118 2.74756 6.95801C2.68729 6.88905 2.65408 6.80057 2.65408 6.70899C2.65408 6.6174 2.68729 6.52892 2.74756 6.45996L2.74878 6.46973ZM2.74878 11.4465C2.77753 11.4131 2.81311 11.3862 2.85311 11.3677C2.89312 11.3492 2.93663 11.3394 2.98071 11.3391H9.55786C9.60213 11.3394 9.64582 11.3491 9.68603 11.3677C9.72623 11.3862 9.76203 11.4131 9.79102 11.4465C9.85129 11.5155 9.8845 11.604 9.8845 11.6956C9.8845 11.7871 9.85129 11.8756 9.79102 11.9446C9.76147 11.9775 9.72534 12.0039 9.68497 12.0219C9.6446 12.04 9.60088 12.0494 9.55664 12.0496H2.98071C2.93668 12.0493 2.8932 12.0398 2.85305 12.0217C2.8129 12.0036 2.77697 11.9774 2.74756 11.9446C2.68729 11.8756 2.65408 11.7871 2.65408 11.6956C2.65408 11.604 2.68729 11.5155 2.74756 11.4465H2.74878ZM9.55786 8.85254C9.60208 8.85314 9.64567 8.86302 9.68583 8.88152C9.72599 8.90003 9.76183 8.92675 9.79102 8.95996C9.85129 9.02892 9.8845 9.1174 9.8845 9.20899C9.8845 9.30057 9.85129 9.38905 9.79102 9.45801C9.76168 9.49127 9.72562 9.51794 9.68522 9.53624C9.64482 9.55455 9.601 9.56408 9.55664 9.56421H2.98071C2.93655 9.56399 2.89294 9.55441 2.85275 9.5361C2.81256 9.5178 2.77671 9.49118 2.74756 9.45801C2.68729 9.38905 2.65408 9.30057 2.65408 9.20899C2.65408 9.1174 2.68729 9.02892 2.74756 8.95996C2.77651 8.92678 2.81213 8.90007 2.85209 8.88156C2.89205 8.86305 2.93546 8.85316 2.97949 8.85254H9.55786ZM2.74878 3.98316C2.77773 3.94997 2.81335 3.92326 2.85331 3.90475C2.89327 3.88624 2.93668 3.87636 2.98071 3.87573H5.35986C5.40403 3.87596 5.44764 3.88554 5.48783 3.90384C5.52801 3.92215 5.56387 3.94876 5.59302 3.98193C5.6529 4.04915 5.68592 4.13606 5.68579 4.22608C5.68548 4.31579 5.653 4.40242 5.59424 4.47022C5.56524 4.50334 5.52961 4.53001 5.48966 4.54851C5.44971 4.56702 5.40633 4.57694 5.36231 4.57764H2.98071C2.93655 4.57741 2.89294 4.56783 2.85275 4.54953C2.81256 4.53122 2.77671 4.50461 2.74756 4.47144C2.68729 4.40248 2.65408 4.314 2.65408 4.22241C2.65408 4.13083 2.68729 4.04235 2.74756 3.97339L2.74878 3.98316Z" fill="white"></path></svg>
                              <span>অনুরোধ প্রেরণ</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-14 text-center">কোন তথ্য পাওয়া যায় নি</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
