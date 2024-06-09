import ImagePlaceholder from "./ImagePlaceholder";



const Multicaroesel = () => {
    return (<>
        <div className="w-full flex space-x-2 justify-center lg:justify-between">
            <div className="">
                <ImagePlaceholder />
            </div>
            <div className="hidden lg:block">
                <ImagePlaceholder />
            </div>
            <div className="hidden lg:block">
                <ImagePlaceholder />
            </div>
            <div className="hidden lg:block">
                <ImagePlaceholder />
            </div>
        </div>
    </>)
};

export default Multicaroesel;