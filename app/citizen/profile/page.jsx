'use client'

import { lazy,Suspense } from 'react';

const Profile = lazy(() => import("@/app/citizen/_content/Profile"));


const Home = (citizen_data) => {
    return (<>
        <Suspense fallback={<div>Loading...</div>}>
            <Profile />
        </Suspense>
    </>)
};

export default Home;
