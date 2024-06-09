import dynamic from "next/dynamic";

const Khotian = dynamic(() => import("../_content/Khotian"), {
    loading: () => <p>Loading...</p>,
});

const Page = () => {

    return (<>
        <Khotian />
    </>);
};

export default Page;