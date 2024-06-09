'use client'

import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const callback = (props) => {
    
    const router = useRouter();
    const cookies = parseCookies();
    let state = cookies.state;
    const [data,setData] = useState([]);

    // get the CancelToken object from axios
    const CancelToken = axios.CancelToken;
    const cancelTokenSource = CancelToken.source();

    const headersOption = {
        'content-type': 'application/json'
    };
      
    const searchParams = useSearchParams();
 
    const code = searchParams.get('code');
    
    // old link : http://idp.mysoftheaven.com
    // new link : http://idp-devsso.land.gov.bd

    useEffect( () =>{
        axios.post(`${process.env.SSO_URL}/oauth/token`, {
                "grant_type": "authorization_code",
                "client_id": `${process.env.SSO_CLIENT_ID}`,
                "client_secret": `${process.env.SSO_SECRET}`,
                "redirect_uri": `${process.env.LDTAX_PORTAL_BASE}/callback`,
                "code": code
            },{
                headers:headersOption
            }).then( (res) => {
                let accessdata = JSON.stringify(res?.data);
                setCookie('null', 'sso', accessdata) ;

                // test
                const ssocookies = parseCookies();
                const citizenToken = JSON.parse(ssocookies?.sso);
                const decoded = citizenToken?.access_token;
                let sso_access_token = "Bearer "+citizenToken?.access_token;

                axios.get(`${process.env.SSO_URL}/api/user`,{
                    headers:{
                        'Authorization': "Bearer " +decoded,
                        'content-type': 'application/json'
                    }
                }).then( (user) => {

                    if(user?.data?.user_type_id == 0){

                        const response = 
                            {
                                "id": user?.data?.id,
                                "username": user?.data?.username,
                                "name": user?.data?.name,
                                "name_en": user?.data?.name_en,
                                "photo": null, 
                                "phone": user?.data?.phone,
                                "email": user?.data?.email,
                                "father_name": user?.data?.father_name,
                                "father_name_en":  user?.data?.father_name_en,
                                "mother_name_en":  user?.data?.mother_name_en,
                                "spouse_name":  user?.data?.spouse_name,
                                "religion":  user?.data?.religion,
                                "occupation":  user?.data?.occupation,
                                "nationality":  user?.data?.nationality,
                                "mother_name":  user?.data?.mother_name,
                                "nid":  user?.data?.nid,
                                "dob":  user?.data?.dob,
                                "address":  user?.data?.address,
                                "present_address":  user?.data?.present_address,
                                "gender":  user?.data?.gender,
                                "progressPoint": user?.data?.progressPoint
                            };

                        const resp = JSON.stringify(response);
                        
                        destroyCookie(null, "organization");
                        destroyCookie(null, "organizationinfo");

                        setCookie('null', 'citizen', resp) ;
                        
                        try {
                            console.log(`${process.env.BASE_URL_V1}/sso_citizen`);
                            const { data } = axios.post(`${process.env.BASE_URL_V1}/sso_citizen`,
                                response ,
                                {
                                    headers:{
                                        'content-type': 'application/json'
                                    }
                                }
                            );
                            
                        } catch {
                            console.log('Error when insert data.')
                        }
                        
                        router.push('/citizen');
                    
                    } 
                                        
                    else if(user?.data?.user_type_id == 1){ 

                        const userOrg =  user?.data?.organization[0];

                        const userOrgCategory = userOrg?.category == null ? 0 : userOrg?.category;
                    
                        const userOrgType = userOrg?.type == null ? 0 : userOrg?.type;

                        const response = 
                            {
                                "id": user?.data?.id,
                                "username": user?.data?.username,
                                "name": user?.data?.name,
                                "name_en": user?.data?.name_en,
                                "phone": user?.data?.phone,
                                "email": user?.data?.email,
                                "photo": null,
                                "is_approved": 0,
                                "registered_by": 0,
                                "agent_id": "0",
                                "user_type_id": 1,
                                "old_nid": null,
                                "nid_info_update": null,
                                "organization": {
                                    "id": userOrg?.user_id,
                                    "user_id": userOrg?.user_id,
                                    "username": user?.data?.username,
                                    "photo": null,
                                    "org_name": userOrg?.name,
                                    "org_mobile": user?.data?.phone,
                                    "org_email": user?.data?.email,
                                    "org_category_id": userOrgCategory,
                                    "type_id": userOrgType,
                                    "division_id": userOrg?.division_id,
                                    "district_id": userOrg?.district_id,
                                    "upazila_id": userOrg?.upazila_id,
                                    "postCode": userOrg?.postCode,
                                    "org_address": userOrg?.address,
                                    "contact_person_name": userOrg?.representative_name,
                                    "contact_person_designation": userOrg?.representative_designation,
                                    "contact_person_mobile":userOrg?.representative_mobile,
                                    "contact_person_nid": userOrg?.representative_nid,
                                    "contact_person_dob":userOrg?.representative_dob,
                                    "created_at": userOrg?.created_at,
                                    "updated_at": userOrg?.updated_at
                                },
                                "progressPoint": user?.data?.progressPoint
                            }
                        ;

                        destroyCookie(null, "citizen");
                        
                        setCookie('null', 'organization', JSON.stringify(response)) ;
                        setCookie('null', 'organizationinfo', JSON.stringify(response?.organization)) ;

                        const cookieData = parseCookies();

                        if(document.cookie.indexOf('organization') == -1) {
                            document.cookie = `organization=${response}` ;
                        }

                        if(document.cookie.indexOf('organizationinfo') == -1) {
                            document.cookie = `organizationinfo=${JSON.stringify(response?.organization)}` ;
                        }

                        try {
                            const { data } = axios.post(`${process.env.BASE_URL_V1}/sso_organization`,
                                response?.organization ,
                                {
                                    headers:{
                                        'content-type': 'application/json'
                                    }
                                }
                            );
                            
                        } catch {
                            console.log('Error when insert org data.')
                        }

                        router.push('/organization');
                    }
                });

        }).catch((err) => {
            console.log('err : ',err);
        });
    },[]);

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-green-600 p-8 rounded-lg text-center text-600 text-white">
                {/* <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg> */}
                <h2 className="p-4">ভূমি উন্নয়ন কর ব্যবস্থাপনায় আপনাকে স্বাগতম</h2>
                <p className="animate-pulse opacity-1">লোড হচ্ছে ...</p>
                </div>
            </div>
        </>
    )


}

export default callback;