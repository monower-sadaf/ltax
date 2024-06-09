import { en2bn } from "@/halpers/helper";

const ProgressBar = ({ color, percentage }) => {

    return (
        <>
            <div className="hidden lg:flex flex-col justify-center items-center w-[30%]">
                <div className="bg-gray-300 w-full h-2 lg:h-4 rounded-md">
                    <div className={`${color} w-[${percentage}%] h-2 lg:h-4 rounded-md`}></div>
                </div>
                <span className="mt-2">প্রোফাইলের অগ্রগতি {en2bn(percentage)}%</span>
            </div>
        </>
    )
};

export default ProgressBar;