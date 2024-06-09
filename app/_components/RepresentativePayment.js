const { default: HoldingSearch } = require("./HoldingSearch");

const RepresentativePayment = () => {

    return (
        <>
            <div className="bg-white px-2  w-full rounded-lg">
                <div className="p-[8px] w-full">
                    <div className="sm:mx-0.5 lg:mx-0.5">
                        <div className="flex items-center pt-4 mb-4">
                            <div className="font-semibold text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">
                                প্রতিনিধির কর্তৃক পেমেন্ট
                            </div>
                        </div>
                        <HoldingSearch />
                    </div>
                </div>
            </div>
        </>
    );
}

export default RepresentativePayment;