const CitizenFaqForm = () => {
    return (
        <div className="flex justify-center">
            <div className="border border-primary bg-white  rounded-md w-full">
                <div className="bg-[#890000] rounded-t py-4">
                    <p className="text-white text-center text-18">আপনার কোন জিজ্ঞাসা রয়েছে?</p>
                </div>
                <div className="px-4 py-3">
                    <form action>
                        <div className="mb-3">
                            <fieldset className="pl-3 border border-primary rounded">
                                <legend className="px-2 text-primary text-12">আপনার নাম *
                                </legend>
                                <div className="flex items-center">
                                    <input type="text" className="w-[90%] border-none focus:border-none focus:ring-0 placeholder:text-15" placeholder="আপনার নাম" />
                                </div>
                            </fieldset>
                        </div>
                        <div className="mb-3">
                            <fieldset className="pl-3 border border-primary rounded">
                                <legend className="px-2 text-primary text-12">মোবাইল নম্বর **
                                </legend>
                                <div className="flex items-center">
                                    <input type="text" className="w-[90%] border-none focus:border-none focus:ring-0 placeholder:text-15" placeholder="মোবাইল নম্বর " />
                                    <i className="fa-solid fa-phone text-18 text-primary float-right" />
                                </div>
                            </fieldset>
                        </div>
                        <div className>
                            <fieldset className="pl-3 border border-primary rounded">
                                <legend className="px-2 text-primary text-12">আপনার জিজ্ঞাসা *
                                </legend>
                                <div className="flex items-center">
                                    <textarea name className="w-[90%] border-none focus:border-none focus:ring-0 placeholder:text-15" id cols={34} rows={4} defaultValue={""} />
                                </div>
                            </fieldset>
                        </div>
                        <div className="flex justify-center my-3">
                            <button className="flex space-x-3 items-center bg-secondary px-5 py-2 rounded-md">
                                <i className="fa-solid fa-circle-question text-white text-20" />
                                <p className="text-15 text-white">প্রদান করুন</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CitizenFaqForm;