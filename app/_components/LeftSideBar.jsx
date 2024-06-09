'use client'
import { relative_image_path } from '@/halpers/helper';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LeftSideBar = () => {

    const route = usePathname();
    
    return(
        <div className="flex flex-col-reverse lg:flex-row lg:space-x-6 h-full">
            <div className="lg:w-[100%] flex flex-wrap lg:flex-col lg:space-y-2 lg:justify-between">
                <Link prefetch={false} href={(route == '/signup' ? '/login' : '/signup')} shallow 
                        className="flex items-center space-x-[8px] lg:space-x-10 w-[45%] lg:m-0 lg:w-full m-2  px-2 lg:px-7 py-4  bg-green4 drop-shadow-lg hover:drop-shadow-none border border-green4 hover:bg-white hover:border hover:border-primary rounded-md transition-all duration-500">
                        <img  loading="lazy"  src={relative_image_path("nibondhon_login.webp")} className="w-[2.0625em] lg:w-[3.125em]"  alt="ভূমি উন্নয়ন কর"
                        width="1000"
                        height="1000" />
                        <p className="text-15 leading-[19.6px] lg:text-20 lg:leading-[26.13px]">{ route == '/signup' ? 'লগইন করুন' : 'নিবন্ধন করুন' }</p>
                </Link>
                <Link prefetch={false} href={{ pathname: '/faq' }} shallow
                        className="flex space-x-3 lg:space-x-10 w-[45%] lg:w-full m-2 lg:m-0  items-center px-2 lg:px-7 py-4  bg-green4 drop-shadow-lg hover:drop-shadow-none border border-green4 hover:bg-white hover:border hover:border-primary rounded-md transition-all duration-500">
                        <img  loading="lazy"  src={relative_image_path("payment.png")} className="w-[2.15875em] lg:w-[3.186875em]"  alt="ভূমি উন্নয়ন কর" 
                        width="50"
                        height="37"/>
                        <div>
                            <p className="text-15 leading-[19.6px] lg:text-20 lg:leading-[26.13px]">জিজ্ঞাসিত প্রশ্নাবলী</p>
                        </div>
                </Link>
                <Link prefetch={false} href={'https://www.youtube.com/watch?v=HduqJNSUINw'}
                        className="flex space-x-3 lg:space-x-10 w-[45%] lg:w-full m-2 lg:m-0  items-center px-2 lg:px-7 py-4  bg-green4 drop-shadow-lg hover:drop-shadow-none border border-green4 hover:bg-white hover:border hover:border-primary rounded-md transition-all duration-500">
                    <img  loading="lazy"  src={relative_image_path("tutorial.png")} className="w-[2.5475em] lg:w-[3.625em]"  alt="ভূমি উন্নয়ন কর"
                    width="50"
                    height="37" />
                    <p className="text-15 leading-[19.6px] lg:text-20 lg:leading-[26.13px]">টিউটিরিয়াল </p>
                </Link>
                <Link prefetch={false} href={{ pathname: '/manual' }} shallow
                        className="flex space-x-3 lg:space-x-10 w-[45%] lg:w-full m-2 lg:m-0  items-center px-2 lg:px-7 py-4  bg-green4 drop-shadow-lg hover:drop-shadow-none border border-green4 hover:bg-white hover:border hover:border-primary rounded-md transition-all duration-500">
                    <img  loading="lazy"  src={relative_image_path("nirdeshika.png")} className="w-[2.05625em] lg:w-[3.513125em]"  alt="ভূমি উন্নয়ন কর"
                    width="50"
                    height="37" />
                    <p className="text-15 leading-[19.6px] lg:text-20 lg:leading-[26.13px]">নির্দেশিকা </p>
                </Link>
                <Link prefetch={false} onClick={(e)=>e.preventDefault()} href={'#'}
                        className="flex space-x-3 lg:space-x-10 w-[45%] lg:w-full m-2 lg:m-0  items-center px-2 lg:px-7 py-4  bg-green4 drop-shadow-lg hover:drop-shadow-none border border-green4 hover:bg-white hover:border hover:border-primary rounded-md transition-all duration-500">
                    <img  loading="lazy"  src={relative_image_path("hotline.png")} className="w-[2.21375em] lg:w-[3.125em]"  alt="ভূমি উন্নয়ন কর"
                    width="50"
                    height="37" />
                    <div>
                        <p className="text-15 leading-[19.6px] lg:text-20 lg:leading-[26.13px]">হটলাইন নাম্বার</p>
                        <p className="text-12 leading-[19.6px] lg:text-15 lg:leading-[26.13px]">১৬১২২</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default LeftSideBar;