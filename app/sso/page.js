'use client'
import { setCookie } from "nookies";
import { useRouter, redirect } from "next/navigation";

const SSO = (props) => {

    const router = useRouter();

    let state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setCookie(null,'state',state);

    let paramObj = {
            'client_id': `${process.env.SSO_CLIENT_ID}`,
            'redirect_uri': `${process.env.LDTAX_PORTAL_BASE}/callback`,
            'response_type': 'code',
            'scope': 'view-user',
            'state': state
        };

    const objString = new URLSearchParams(paramObj).toString();

    redirect(`${process.env.SSO_URL}/oauth/authorize?${objString}`);

}

export default SSO;