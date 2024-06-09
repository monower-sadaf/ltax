import { Notices } from "@/app/_api/api";


const HomeNotice = async () => {
  const notices = await Notices().catch((error) => {
    console.log(error);
  });
  
  return (
    <>
      <div className="flex items-center">
        <p className="text-16 lg:text-20 font-medium border-r text-green2 px-2 lg:px-10">
          নোটিশ
        </p>
        {(notices != undefined && notices?.length > 0) && (
          <marquee
            className="text-15 lg:text-20"
            behavior="scroll"
            direction="left"
            scrolldelay="150"
          >
            {notices[0].notice}
          </marquee>
        )}
      </div>
    </>
  );
};

export default HomeNotice;
