'use client'

import { GetProfile } from "@/app/_api/api";
import { useEffect, useState } from "react";

const OrganizationProfile = (props) => {

    const [detailProfileModal, setDetailProfileModal] = useState(0);
    const [orgProfile, setOrgProfile] = useState([]);

    useEffect(() => {
        if (props?.info) {
            try {
                GetProfile(props?.info).then(response => {
                    if (response?.data != null) {
                        setOrgProfile(response?.data);
                        setDetailProfileModal(1);
                    }
                })
            } catch (error) {
                toast.error('পুনরায় চেষ্টা করুন ।');
            }
        }
    }, [props?.info]);

    console.log('orgProfile : ', orgProfile);

    return (
        <>
            <div className="flex items-center w-full">
                {
                    detailProfileModal == 1 ?
                    <>
                        <div class="w-full h-auto dark:bg-slate-800 gap-6">
                            <div
                                class="bg-gray-100 dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
                                <div class="flex items-center gap-4">
                                    <img src="{orgProfile?.photo}"
                                        class="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                                    />
                                    <div class="w-fit transition-all transform duration-500 w-full">
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="grid grid-rows-5">
                                                    <p className="my-2">সংস্থার নাম</p>
                                                    <p className="my-2">সংস্থার টাইপ</p>
                                                    <p className="my-2">সংস্থার ধরন</p>
                                                    <p className="my-2">সংস্থার মোবাইল</p>
                                                    <p className="my-2">সংস্থার ঠিকানা</p>
                                            </div>
                                            <div className="grid grid-rows-5">
                                                <h1 class="my-2 text-gray-600 dark:text-gray-200 font-bold">{orgProfile?.org_name}</h1>
                                                <p class="my-2 text-gray-400">{orgProfile?.org_category_name}</p>
                                                <p class="my-2 text-gray-400">{orgProfile?.type_name}</p>
                                                <p class="my-2 text-gray-400">{orgProfile?.org_mobile}</p>
                                                <address>
                                                    {orgProfile?.org_address}
                                                </address>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : 
                        <span>লোড হচ্ছে</span>
                }
            </div>
        </>
    )
}

export default OrganizationProfile;