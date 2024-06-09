function Footer() {

    return (

        <>
            <div className="footersec mt-3">
                <div className="h-3 bg-secondary" />
                <div className="lg:flex items-center ">
                    <div className="lg:w-[67%]">
                        <div className="flex flex-col lg:flex-row justify-center items-center lg:mt-[10px]">
                            <div className=" lg:w-[50%] lg:pl-14 relative -top-[13px] lg:-top-[23px]">
                                <div className="flex relative justify-center">
                                    <div className="pb-4 pt-4 lg:pb-9 lg:pt-5 pl-6 lg:pl-12 pr-8 lg:pr-28 bg-[#E5F2EC] drop-shadow-md rounded-b-md">
                                        <div>
                                            <h3 className="text-14 lg:text-18 font-medium text-secondary pb-2">গুরুত্বপূর্ণ লিঙ্ক</h3>
                                            <ul className="lg:flex lg:flex-col lg:space-y-1">
                                                <li className="flex items-center space-x-3"><img  loading="lazy"  src="/assets/images/Ellipse_Footer.svg" alt={"no image"} /><a href="nitemala.php" className="text-12 lg:text-15 font-medium">শর্তাবলী </a></li>
                                                <li className="flex items-center space-x-3"><img  loading="lazy"  src="/assets/images/Ellipse_Footer.svg" alt={"no image"} /><a href="nid1.php" className="text-12 lg:text-15 font-medium">bangladesh.gov.bd</a></li>
                                                <li className="flex items-center space-x-3"><img  loading="lazy"  src="/assets/images/Ellipse_Footer.svg" alt={"no image"} /><a href="poripotro.php" className="text-12 lg:text-15 font-medium">Land.gov.bd</a>
                                                </li>
                                                <li className="flex items-center space-x-3"><img  loading="lazy"  src="/assets/images/Ellipse_Footer.svg" alt={"no image"} /><a href="https://www.grs.gov.bd/" className="text-12 lg:text-15 font-medium">অভিযোগ প্রতিকার ব্যবস্থা</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="-ml-[2px] -mt-1">
                                        <img  loading="lazy"  src="/assets/images/footer_red_right.svg" alt={"no image"} />
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-[50%] ">
                                <div className="lg:pb-4 relative lg:-top-4 sticky">
                                    <h3 className="text-14 lg:text-18 font-medium text-black pb-4 text-center">পরিকল্পনা ও বাস্তবায়নে
                                    </h3>
                                    <ul className="lg:flex lg:flex-col lg:space-y-1">
                                        <li className="flex  justify-center space-x-8">
                                            <a href="https://minland.gov.bd/">
                                                <img  loading="lazy"  src="/assets/images/ভূমি মন্ত্রণালয়.png" className="w-24" alt={"no image"} />
                                            </a>
                                            <a href="http://www.lrb.gov.bd/">
                                                <img  loading="lazy"  src="/assets/images/vumi_sonskar.webp" className="w-28" alt={"no image"} />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-10 lg:text-14 font-medium  text-start lg:text-start lg:pl-14">Copyrights ©
                                2023 All Rights Reserved
                                <a className="underline text-primary" target="_blank" href="https://land.gov.bd/">Ministry of Land</a>,
                                Government of the People's Republic of Bangladesh
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-[33%] lg:pt-14 flex justify-between lg:flex-col ">
                        <div className="flex items-end lg:items-center justify-center space-x-2 lg:space-x-5 pb-2 lg:pb-0 pl-5 lg:pl-0">
                            <a href="https://www.facebook.com/mysoftheavenltd/">
                                <img  loading="lazy"  src="/assets/images/footer_facebook.svg" alt={"no image"} className="w-[28px] lg:w-[50px]" />
                            </a>
                            <a href="https://www.youtube.com/@mysoftheaven">
                                <img  loading="lazy"  src="/assets/images/footer_youtube.svg" alt={"no image"} className="w-[28px] lg:w-[50px]" />
                            </a>
                            <a href="/">
                                <img  loading="lazy"  src="/assets/images/footer_headset.svg" alt={"no image"} className="w-[28px] lg:w-[50px]" />
                            </a>
                            <a href="/">
                                <img  loading="lazy"  src="/assets/images/footer_mailbook.svg" alt={"no image"} className="w-[28px] lg:w-[50px]" />
                            </a>
                        </div>
                        <div className="pt-7 lg:pl-14 w-[200px] lg:w-full">
                            <h3 className="text-14 lg:text-18 font-medium text-center text-black lg:pl-16">কারিগরি সহায়তায়</h3>
                            <div style={{background: 'url("/assets/images/footer_mysoft_heaven_logo.svg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} 
                            className="mt-3 flex justify-center items-center">
                                <a href="https://mysoftheaven.com/" className="lg:pl-7">
                                    <img  loading="lazy"  src="/assets/images/My-Soft-Heaven-LOGO-03.png" alt={"no image"} className="w-[110px] lg:w-[192px]" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative block lg:hidden">
                    <p className="text-10 lg:text-14 font-medium text-start lg:text-start  lg:pl-14">Copyrights © 2023 All Rights Reserved
                        <a className="underline text-primary" target="_blank" href="https://land.gov.bd/">Ministry of Land</a>,
                        Government of the People's Republic of Bangladesh
                    </p>
                    <hr className="bg-[#DFF8EC] " />
                </div>
                <hr className="bg-[#DFF8EC] hidden lg:block" />
            </div>
        </>

    );

}

export default Footer;
