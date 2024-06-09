import Calculator from "@/app/_components/Calculator";

export default function Home() {

    return (
        <>
            <div className="bg-white px-2 lg:px-[32px] w-full rounded-lg my-2">
                <div className="py-[14px] w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
                   <embed
                        className="min-w-full min-h-[500px]"
                        src={`${process.env.OFFICE_URL}/holding/calculator`}
                        width="100%"
                        height="auto"
                    />
                </div>
            </div>
        </>
    )
}