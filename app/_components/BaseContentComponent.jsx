'use client'
export default function BaseContentComponent({ children }) {
    return (
        <div className="flex flex-col py-4 min-h-[578px]">
            <div className="sm:mx-0.5 lg:mx-0.5 min-h-full">
                <div className="inline-block min-w-full bg-white my-1 py-5 min-h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}