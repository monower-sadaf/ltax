import { lazy, Suspense } from "react";
const Khotianreg = lazy(() => import('../../_content/Khotianreg'))

const Page = () => {
    
    return (<>
        <Suspense fallback={<p>Loading...</p>}>
            <Khotianreg />
        </Suspense>
    </>);
};

export default Page;