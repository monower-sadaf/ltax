import { useState, useEffect } from "react";


const SearchModal = ({heading,status = true}) => {
    const [hidden, setHidden] = useState(status);
    useEffect(() => {
        setHidden(status);
    },[status]);
    

    const closeModal = () => {
        setHidden(true);
        if(window != undefined) {
            window.location.reload();
        }
    };

    return (<>
        {
            !hidden &&
            <div className="bg-gray-800/50 w-full h-full fixed top-0 left-0 z-50 flex justify-center items-center">
                <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="flex justify-center drop-shadow-2xl w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 ">
                    <div className="relative w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-center p-4 border-b border-primary  rounded-t">
                                <h3 className="text-16 lg:text-24 lg:leading-[24.27px] text-primary">
                                { heading }
                                </h3>
                            </div>
                            <form className='p-4'>
                                <span className='text-center text-slate-950'>{/* {errormsg} */}</span>
                                <div className='w-full flex flex-wrap pb-[17px] lg:pb-[72px]'>
                                    <fieldset className='border rounded-md pl-4 m-2 lg:w-[30%]'>
                                        <legend className='text-secondary'>বিভাগ</legend>
                                        <select className='border-none focus:border-none w-full focus:ring-0 text-gray-500' id="day">
                                                <option value="0" defaultValue={0}>বিভাগ</option>
                                                <option value="1">ঢাকা</option>
                                                <option value="2">বরিশাল</option>
                                                <option value="3">রাজশাহী</option>
                                        </select>
                                    </fieldset>
                                    <fieldset className='border rounded-md pl-4 m-2 lg:w-[30%]'>
                                        <legend className='text-secondary'>জেলা</legend>
                                        <select className='border-none focus:border-none w-full focus:ring-0 text-gray-500' id="day">
                                                <option value="0" defaultValue={0}>জেলা</option>
                                                <option value="1">ঢাকা</option>
                                                <option value="2">বরিশাল</option>
                                                <option value="3">রাজশাহী</option>
                                        </select>
                                    </fieldset>
                                    <fieldset className='border rounded-md pl-4 m-2 lg:w-[30%]'>
                                        <legend className='text-secondary'>উপজেলা/সার্কেল</legend>
                                        <select className='border-none focus:border-none w-full focus:ring-0 text-gray-500' id="day">
                                                <option value="0" defaultValue={0}>উপজেলা/সার্কেল</option>
                                                <option value="1">ঢাকা</option>
                                                <option value="2">বরিশাল</option>
                                                <option value="3">রাজশাহী</option>
                                        </select>
                                    </fieldset>
                                    <fieldset className='border rounded-md pl-4 m-2 lg:w-[30%]'>
                                        <legend className='text-secondary'>মৌজা</legend>
                                        <select className='border-none focus:border-none w-full focus:ring-0 text-gray-500' id="day">
                                                <option value="0" defaultValue={0}>মৌজা</option>
                                                <option value="1">ঢাকা</option>
                                                <option value="2">বরিশাল</option>
                                                <option value="3">রাজশাহী</option>
                                        </select>
                                    </fieldset>
                                    <fieldset className='border rounded-md pl-4 m-2 lg:w-[30%]'>
                                        <legend className='text-secondary'>খতিয়ান  নং</legend>
                                        <input type="number" min={0} placeholder="খতিয়ান  নং" className='border-none focus:border-none w-full focus:ring-0 text-gray-500' />
                                    </fieldset>
                                    <fieldset className='border rounded-md pl-4 m-2 lg:w-[30%]'>
                                        <legend className='text-secondary'>হোল্ডিং নং</legend>
                                        <input type="number" min={0} placeholder="হোল্ডিং নং" className='border-none focus:border-none w-full focus:ring-0 text-gray-500' />
                                    </fieldset>
                                </div>
                                <div className='w-full flex justify-end space-x-4'>
                                    <button onClick={closeModal} className='text-12 leading-[12px] lg:text-16 lg:leading-[16px]  border border-gray-400 px-5 py-2 rounded-md hover:bg-[#777777] text-[#777777] hover:text-white'>বাতিল</button>
                                    <button type='submit' className='text-12 leading-[12px] lg:text-16 lg:leading-[16px] bg-secondary text-50 px-5 py-2 border border-secondary rounded-md text-white hover:text-secondary hover:bg-[#FFF]'>অনুসন্ধান</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>);
};

export default SearchModal;