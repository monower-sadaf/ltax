'use client'
import dynamic from "next/dynamic";
const Profile = dynamic(() => import("../_content/Profile"), { ssr: false, loading: () => <p>Loading...</p> });
const Home = () => {
    return (
        <>
            <Profile />
        </>
    )
};

export default Home;