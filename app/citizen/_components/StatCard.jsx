import { en2bn, public_image_path } from "@/halpers/helper";


const StatCard = (props) => {
    let citizen_data = props?.data[0];
    let sData = props?.data[1]?.data;

    const style = {
        position: 'absolute',
        bottom: 0,
        marginLeft: 43+'px',
        fontSize: 1.5+'rem',
        marginBottom: 1+'rem'
    }

    return (
        <>  
            <div className="flex flex-wrap w-full h-full justify-center">
                <div className="rounded-md overflow-hidden border border-[#7ECBCB]  w-[40%] lg:w-[24%] m-2 lg:m-0 lg:ml-1 flex items-center justify-center ">
                    <div className={`py-5 lg:py-0 lg:p-5 flex flex-col space-y-2`}>
                        <div className="flex items-center justify-between space-x-4 lg:space-x-2 ">
                            <div className="w-[1.25em] lg:w-[2em]">
                                <img src={public_image_path('citizen_stats_card1.webp')} alt=" Image" />
                            </div>
                            <p className="text-[12px] leading-[12.14px] lg:text-16 lg:leading-[16.18px] text-right">সর্বমোট হোল্ডিং</p>
                        </div>
                        <div>
                            <h3 className="text-center text-16 lg:text-32" style={{color:'#1B9A9A'}}>{en2bn(parseInt(sData?.total_holding))}</h3>
                        </div>
                    </div>
                </div>
                <div className="rounded-md overflow-hidden border border-[#7ECBA1]  w-[40%] lg:w-[24%] m-2 lg:m-0 lg:ml-1 flex items-center justify-center ">
                    <div className={`py-5 lg:py-0 lg:p-5 flex flex-col space-y-2`}>
                        <div className="flex items-center justify-between space-x-4 lg:space-x-2 ">
                            <div className="w-[1.25em] lg:w-[2em]">
                                <img src={public_image_path('citizen_stats_card2.webp')} alt=" Image" />
                            </div>
                            <p className="text-[12px] leading-[12.14px] lg:text-16 lg:leading-[16.18px] text-right">অপেক্ষমাণ খতিয়ান</p>
                        </div>
                        <div>
                            <h3 className="text-center text-16 lg:text-32 text-[#198754]">{en2bn(parseInt(sData?.total_khotian))}</h3>
                        </div>
                    </div>
                </div>
                <div className="rounded-md overflow-hidden border border-[#FFCBF1]  w-[40%] lg:w-[24%] m-2 lg:m-0 lg:ml-1 flex items-center justify-center ">
                    <div className={`py-5 lg:py-0 lg:p-5 flex flex-col space-y-2`}>
                        <div className="flex items-center justify-between space-x-4 lg:space-x-2 ">
                            <div className="w-[1.25em] lg:w-[2em]">
                                <img src={public_image_path('citizen_stats_card3.webp')} alt=" Image" />
                            </div>
                            <p className="text-[12px] leading-[12.14px] lg:text-16 lg:leading-[16.18px] text-right">সর্বমোট দাখিলা</p>
                        </div>
                        <div>
                            <h3 className="text-center text-16 lg:text-32 text-[#AD0087]">{en2bn(parseInt(sData?.total_dhakhila))}</h3>
                        </div>
                    </div>
                </div>
                <div className="rounded-md overflow-hidden border border-[#EC8E00]  w-[40%] lg:w-[24%] m-2 lg:m-0 lg:ml-1 flex items-center justify-center ">
                    <div className={`py-5 lg:py-0 lg:p-5 flex flex-col space-y-2`}>
                        <div className="flex items-center justify-between space-x-4 lg:space-x-2 ">
                            <div className="w-[1.25em] lg:w-[2em]">
                                <img src={public_image_path('citizen_stats_card4.webp')} alt=" Image" />
                            </div>
                            <p className="text-[12px] leading-[12.14px] lg:text-16 lg:leading-[16.18px] text-right">সর্বমোট দাবি</p>
                        </div>
                        <div>
                            <h3 className="text-center text-16 lg:text-32 text-[#EC8E00]">{en2bn(parseInt(sData?.total_dabi))}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatCard;