import Link from "next/link";

const Nirdesika = () => {
    const nirdeshikaStyle = {
        padding: 20+'px'
    };

    const nirdeshikaStyleHeading = {
        color: 'green',
        fontSize: 20+'px'
    }

    const iconStyle = {
        color: '#12633D',
        margin: 0,
        margin: 'auto',
        fontSize: 3.2+'rem'
    }

    return (
        <div className="flex lg:flex-col items-center lg:items-start justify-between w-full p-5 h-full">
            <div className="w-full flex flex-col space-y-4">
                <p className="text-16 leading-[16.18px] lg:text-20 lg:leading-[20.23px] text-[#0E1F1C]">ভূমি উন্নয়ন কর প্রোফাইল</p>
                <h3 className="text-20 leading-[20.23px] lg:text-32 lg:leading-[32.36px] text-[#12633D]">নির্দেশিকা</h3>
            </div>
            <div className="w-full flex justify-center items-center lg:pt-[5rem]">
                <div className="bg-[#C2E3D94A] p-5 rounded-full">
                    <Link  href={{ pathname: '/citizen/manual' }}  >
                        <svg className="fill-[#12633D]" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Nirdesika;