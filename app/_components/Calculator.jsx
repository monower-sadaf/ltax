const Calculator = () => {
    <div className="bg-white px-2 lg:px-[32px] w-full rounded-lg my-2">
      <div className="py-[14px] w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
        <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">
          ভূমি উন্নয়ন কর
        </h3>
        <embed
            className="min-w-[600px] min-h-[500px]"
            src={`${process.env.OFFICE_URL}/holding/calculator`}
            width="100%"
            height="auto"
            onLoad={() => hideLoader()}
        />
        </div>
    </div>
}

export default Calculator;