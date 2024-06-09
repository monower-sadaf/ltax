import { en2bn } from "@/halpers/helper";
const HomeStats = ({stats}) => {
  return (
    <section className="px-4 lg:px-16 my-5">
      <div className="lg:px-48">
        <h3 className="text-20 leading-[26.13px] lg:text-28 lg:leading-[41.8px] text-primary text-center">
          তথ্যচিত্র (ভূমি উন্নয়ন কর নাগরিক নিবন্ধনকৃত খতিয়ান থেকে হোল্ডিং
          এন্ট্রি ও সমন্বয়)
        </h3>
      </div>

      <div className="lg:flex space-y-5 lg:space-y-0 lg:space-x-7 mt-7">
        <div className="lg:w-[60%] bg-[#F2FAF4] rounded-md px-3 lg:px-8 py-1 lg:py-4 text-center">
          <div>
            <p className="text-center text-15 lg:text-24 text-black">
              সমগ্র বাংলাদেশের বিগত ৩০ দিনের
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center mt-6">
            <div className="bg-white m-2 w-[65%] lg:w-[30%] h-[210px]">
              <p className="bg-[#3C1987] p-4"></p>
              {stats ? (
                <p className="p-5 text-24 lg:text-30 text-primary text-center">
                  {en2bn(
                    parseFloat(stats?.khotian_from_citizen ?? 0).toFixed(2)
                  )}
                </p>
              ) : (
                <div className="p-5 text-20">
                  <div className="bg-gray-200 h-5 w-[80%] rounded-full"></div>
                </div>
              )}

              <p className="pb-2 lg:pb-6 px-2 lg:px-5 text-15 text-center">
                সর্বমোট নাগরিক নিবন্ধন থেকে খতিয়ান এন্ট্রি
              </p>
            </div>
            <div className="bg-white m-2 w-[65%] lg:w-[30%] h-[210px]">
              <p className="bg-[#9F0F91] p-4"></p>
              {stats ? (
                <p className="p-5 text-24 lg:text-30 text-primary text-center">
                  {en2bn(
                    parseFloat(stats?.total_holding_from_khotian ?? 0).toFixed(
                      2
                    )
                  )}
                </p>
              ) : (
                <div className="p-5 text-20">
                  <div className="bg-gray-200 h-5 w-[80%] rounded-full"></div>
                </div>
              )}
              <p className="pb-2 lg:pb-6 px-2 lg:px-5 text-15 text-center">
                নাগরিক নিবন্ধনকৃত খতিয়ান থেকে হোল্ডিং এন্ট্রি ও সমন্বয়
              </p>
            </div>
            <div className="bg-white m-2 w-[65%] lg:w-[30%] h-[210px]">
              <p className="bg-[#871919] p-4"></p>
              {stats ? (
                <p className="p-5 text-24 lg:text-30 text-primary text-center">
                  {en2bn(
                    (
                      stats?.total_holding_from_khotian *
                      (100 /
                        (stats?.total_holding == 0 ? 1 : stats?.total_holding))
                    ).toFixed(2)
                  )}
                  %
                </p>
              ) : (
                <div className="p-5 text-20">
                  <div className="bg-gray-200 h-5 w-[80%] rounded-full"></div>
                </div>
              )}
              <p className="pb-2 lg:pb-6 px-2 lg:px-5 text-15 text-center">
                নাগরিক নিবন্ধনকৃত খতিয়ান থেকে হোল্ডিং এন্ট্রি ও সমন্বয়ের হার
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-[40%] bg-[#F2FAF4] rounded-md px-7 py-4">
          <div>
            <p className="text-center text-22 text-black">
              গতকাল পর্যন্ত অপেক্ষমান ও বাতিলের হার
            </p>
          </div>
          <div className="lg:flex flex-wrap items-center mt-6">
            <div className="lg:w-[50%]">
              <div className="bg-white m-2 h-[210px]">
                <p className="bg-[#C80000] p-4"></p>
                <p className="p-5 text-24 lg:text-30 text-primary text-center">
                  {en2bn(parseFloat(stats?.rejected_khotian ?? 0).toFixed(2))}
                </p>
                <p className="pb-2 lg:pb-6 px-2 lg:px-5 text-15 text-center">
                  নাগরিক নিবন্ধনকৃত খতিয়ান বাতিল
                </p>
              </div>
              <div className="mx-2 mt-1">
                <p className="text-14 text-black text-center">
                  খতিয়ান বাতিলের হার
                </p>
                <div className="px-12 py-2 bg-[#C80000] rounded-md">
                  {stats ? (
                    <p className="text-white text-15 text-center">
                      {en2bn(
                        (
                          parseInt(stats?.rejected_khotian) *
                          (100 / parseInt(stats?.total_khotian))
                        ).toFixed(2)
                      )}
                      %
                    </p>
                  ) : (
                    <div className="p-3 text-20">
                      <div className="bg-gray-200 h-3 w-[80%] rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:w-[50%]">
              <div className="bg-white m-2 h-[210px]">
                <p className="bg-[#FFC700] p-4"></p>
                {stats ? (
                  <p className="p-5 text-24 lg:text-30 text-primary text-center">
                    {en2bn(parseFloat(stats?.waiting_khotian ?? 0).toFixed(2))}
                  </p>
                ) : (
                  <div className="p-5 text-20">
                    <div className="bg-gray-200 h-5 w-[80%] rounded-full"></div>
                  </div>
                )}
                <p className="pb-2 lg:pb-6 px-2 lg:px-5 text-15 text-center">
                  নাগরিক নিবন্ধনকৃত অপেক্ষমান খতিয়ান
                </p>
              </div>
              <div className="mx-2 mt-1">
                <p className="text-14 text-black text-center">
                  অপেক্ষমান খতিয়ানের হার
                </p>
                <div className="px-12 py-2 bg-[#FFC700] rounded-md">
                  {stats ? (
                    <p className="text-white text-15 text-center">
                      {en2bn(
                        (
                          parseInt(stats?.waiting_khotian) *
                          (100 / parseInt(stats?.total_khotian))
                        ).toFixed(2)
                      )}
                      %
                    </p>
                  ) : (
                    <div className="p-3 text-20">
                      <div className="bg-gray-200 h-3 w-[80%] rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
