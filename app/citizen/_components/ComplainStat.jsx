
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";
import { en2bn } from "@/halpers/helper";

const ComplainStat = (data) => {

  const p1 = { width: "50%" };
  const p3 = { width: "50%" };

  const token = getTokenFromCookie();

  const headersOption = {
    Authorization: token,
    "content-type": "application/json",
  };

  return (
    <>
      <div className="p-4 flex flex-col space-y-10">
        <h3 className="text-16 leading-[18.38px] lg:text-20 lg:leading-[22.98px]">
          আপত্তি/অভিযোগ - {en2bn(data?.data?.total_complain)}
        </h3>
        <div>
          <div className="w-full h-1 lg:h-1 rounded-md flex overflow-hidden">
              <div className={`bg-primary h-2 lg:h-4 w-[50%]`}></div>
              <div className={`bg-[#CF0000] h-2 lg:h-4 w-[50%]`}></div>
          </div>
        </div>
        <ul className="flex flex-col space-y-5">
          <li className="text-12 leading-[13.79.px] lg:text-16 lg:leading-[18.38px] w-full flex items-center justify-between">
            <div className="flex items-center"><svg className="fill-secondary mr-1" xmlns="http://www.w3.org/2000/svg" height=".5em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg><p>অভিযোগ তথ্যবলি</p></div> <div className="bg-gray-200 text-[#CF0000] p-2 rounded-md cursor-pointer hover:bg-[#CF0000] hover:text-gray-200">
              অপেক্ষমাণ - 
              ({en2bn(parseInt(data?.data?.waiting_complain))})
              </div></li>
          <li className="text-12 leading-[13.79.px] lg:text-16 lg:leading-[18.38px] w-full flex items-center justify-between"><div className="flex items-center"><svg className="fill-secondary mr-1" xmlns="http://www.w3.org/2000/svg" height=".5em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg><p>অভিযোগ তথ্যবলি</p></div> <div className="bg-gray-200 text-primary p-2 rounded-md cursor-pointer hover:bg-primary hover:text-gray-200">
            সম্পন্ন - 
            ({en2bn(parseInt(data?.data?.completed_complain))})
            </div></li>
        </ul>
      </div>
    </>
  );
};

export default ComplainStat;
