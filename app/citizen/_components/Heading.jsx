import React from 'react'

const Heading = (props) => {
  return (
    <div className="mx-4 flex flex-col justify-center items-center lg:items-start pb-[10px] lg:pb-[15px]">
        <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] pb-[10px] lg:pb-[6px]">{props?.data?.title} </h3>
        <p className="text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px] text-[#777777]">{props?.data?.subtitle}</p>
    </div>
  )
}

export default Heading