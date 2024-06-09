'use client'

import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";
import Modal from "@/app/_components/Radix/Modal";
import { en2bn, relative_image_path } from "@/halpers/helper";
import { toast } from "react-toastify";
import { BatchPaymentReq } from "../_api/api";

const BatchPayment = (props) => {

  let sum = 0;
  const holdingData = props?.data;
  const userInfo = props?.user;

  // const [checkboxes, setCheckboxes] = useState(holdingData);
  const [checkboxes, setCheckboxes] = useState(
    holdingData.map((item) => ({ ...item, isChecked: false }))
  );

  const [dabi, setDabi] = useState(0);
  const [formInput, setFormInput] = useState([]);

  const [check,setCheck] = useState(false);
  const [allCheck,setAllCheck] = useState(false);

  const handleMultipleCheckboxChange = (event) => {
    const { checked } = event.target;
    setAllCheck(true);
    
    

      const updatedCheckboxesData = checkboxes.map((item) => ({
        ...item,
        isChecked: checked,
      }));
      setCheckboxes(updatedCheckboxesData);
      setAllCheck(checked);
      
      const updatedCheckboxesKey = checkboxes.map(checkbox => checkbox?.holding_owners[0]?.ldtax_holding_id.toString());
      const updatedCheckboxesVal = checkboxes.map(checkbox => checkbox?.totalDemand);

      const updatedCheckboxes = updatedCheckboxesKey.reduce((acc, key, index) => {
        acc[key] = updatedCheckboxesVal[index];
        return acc;
      }, {});


      setFormInput(updatedCheckboxes);

    if(checked === false) {
      setFormInput({});
    }

  }

  const handleCheckboxChange = (event, index) => {
    const { name, checked, value } = event.target;
    setAllCheck(false);

    const updatedCheckboxes = [...checkboxes];

    updatedCheckboxes[index].isChecked = event.target.checked;
    setCheckboxes(updatedCheckboxes);

    const areAllChecked = updatedCheckboxes.every((item) => item.isChecked);
    setAllCheck(areAllChecked);

    if (!event.target.checked) {
      delete formInput[name];
    }
    else {
      setFormInput((prev) => ({
        ...prev,
        [name]: value
      }));
    }

    console.log('formInput : ',formInput);

    setCheckboxes(updatedCheckboxes);

  };

  // Extract the first three elements
  const total_demand = Object.values(formInput);

  sum = total_demand.reduce((acc, val) => acc + parseFloat(val), 0);

  // payment section
  const [active, setActive] = useState(null);

  const [formInputs, setFormInputs] = useState({});

  const fromData = (e) => {

    const { name, value } = e.target;

    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    Object.assign(formInputs, {
      amount: sum
    });

  };

  const d = new Date();
  let year = d.getFullYear();

  const [loading, setLoading] = useState(false);
  const [checkOtc, setCheckOtc] = useState(0);
  const [otcRes, setOtcRes] = useState(null);

  const handlePaymentSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const holding_id = Object.keys(formInput);

    Object.assign(formInputs, {
      holding_ids: JSON.stringify(holding_id),
      amount: sum,
      advance_year: 0,
      depositor_cid: userInfo?.id,
      owner_id: 0,
      is_app: 0,
      dipositor_nid: '4209176249',
      dipositor_dob: '1999-11-23',
      phone: '01767056733'
    });

    console.log('formInputs', formInputs);

    // try {
    BatchPaymentReq(formInputs).then(function (data) {
      if (data == undefined || data == null) {
        toast.error('পুনরায় চেষ্টা করুন');
        // router.push(`/organization/holding/${holding_id}`);
      }
      // else if (data?.status == 'true') {
      //   toast.success(data?.msg);
      //   // window.open(`${data?.url}`, '_blank');
      //   window.location.assign(`${data?.url}`);
      // }
      else if (data?.status == 'true') {
        if (data?.pay_type == 'otc') {
          setCheckOtc(1);
          setLoading(0);
          setOtcRes(data?.msg);
        } else {
          toast.success(data?.msg);
          window.location.assign(`${data?.url}`);
        }
      }
      else {
        toast.error(data?.msg);
      }

      // setTimeout(() => {
      //   if (window != undefined) window.location.href = `/organization/holding`;
      // }, 10000);
    });
    // } catch (error) {
    //   toast.error('পেমেন্ট সার্ভার ডাউন');
    // }
  };

  return (
    <div className="bg-white px-2 lg:px-[32px] w-full rounded-lg my-2">
      <div className="py-[14px] w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
        <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">
          ব্যাচ পেমেন্ট
        </h3>
        <div className="float-right my-4">
          {
            <button onClick={props?.onButtonClick} className="text-14 leading-[14px] bg-red-800 text-white hover:text-red-800 hover:bg-white border border-red-800 px-2 py-2 lg:px-[61px] lg:py-[12px] rounded-md flex justify-between items-center font-semibold">
              <span className="mr-2"><BiArrowBack /> </span>
              <span >
              পিছনে
              </span>
            </button>
          }
        </div>
      </div>
      <div className="w-full">
        <div className="w-full">
          {/* <form onSubmit={handleSubmit} className="w-full overflow-x-auto"> */}
          <span className="text-14 my-4 text-[1em] mx-2 mb-2 font-bold">সর্বমোট কর : {en2bn(sum)} টাকা</span>

          <table className="min-w-full border border-lg">
            <thead className="h-[30px] text-[#12633D] bg-green-700 border-b">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">
                  <input checked={allCheck} name="checkAll" type="checkbox" onChange={(event) => { handleMultipleCheckboxChange(event) }} />
                </th>
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">হোল্ডিং নং</th>
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">কর পরিশোধের সাল</th>
                <th scope="col" className="text-sm font-medium text-gray-50 px-3 py-2  text-center">দাবি</th>
              </tr>
            </thead>
            <tbody>

              {checkboxes.map((item, index) => (
                <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    <input
                      type="checkbox"
                      name={item?.holding_owners[0]?.ldtax_holding_id.toString()}
                      value={`${item?.totalDemand}`}
                      onChange={(event) => handleCheckboxChange(event,index)}
                      className="form-control"
                      checked={item.isChecked}
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">
                      {en2bn(item?.holding_no)}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">
                      {en2bn(item?.paid_year)}
                    </span>
                  </td>
                  <td>
                    {en2bn(item?.totalDemand)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {
            checkboxes?.length > 0 &&
            <div className="my-4">

              <Modal
                icon={
                  <span className="text-14 leading-[14px] bg-[#12633D] text-white px-[37px] py-[10px] lg:px-[61px] lg:py-[12px] rounded-md mx-2">অনলাইন পেমেন্ট</span>
                }
                cancelBtn={"বন্ধ করুন"}
                title={''}
              >

                {
                  checkOtc == 1 ?
                    <div className="text-gray-500">
                      <div className="text-center">
                        <span className="text-center"> এ-চালান ( ওটিসি )</span>
                      </div>
                      <div>
                        {
                          loading == true ? <span className="text-center">লোড হচ্ছে...</span> : otcRes
                        }
                      </div>
                    </div>
                    : <>
                      <div className="space-y-6">
                        <form onSubmit={handlePaymentSubmit} >
                          <div className="text-gray-500">
                            <div className="text-center">
                              <span className="text-center">ভূমি উন্নয়ন কর পরিশোধ করতে নিচের তথ্য পূরণ করুন</span>
                            </div>


                          </div>

                          <div className="">
                            <span className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">
                              সর্বমোট দাবি : {en2bn(sum)}
                            </span>
                          </div>
                          <hr className="w-full h-px bg-[#BABABA] border-0 mb-2" />
                          <div className="text-center">
                            <div className="flex flex-wrap">
                              <div onClick={() => setActive(1)} className={`m-2 w-[30%] lg:w-[30%]`}>
                                <fieldset className="border border-gray-500 rounded-md">
                                  <div className="z-10 -mt-3">
                                    <input id="ekpay" type="radio" onChange={fromData} value={5} name="pg" required={true}
                                    />
                                  </div>
                                  <div className="flex items-center justify-center mx-2 my-2" htmlFor="ekpay">
                                    <div>
                                      <Image
                                        className="w-[200]"
                                        src={relative_image_path("pgicon/ekpay.png")}
                                        height={300}
                                        width={300}
                                        alt="Ekpay"
                                      />
                                    </div>
                                  </div>
                                  <p className="mb-2">একপে</p>
                                </fieldset>
                              </div>

                              <div onClick={() => setActive(2)} className={`m-2 w-[30%] lg:w-[30%]`}>
                                <fieldset className='border border-gray-500 rounded-md h-full'>
                                  <div className='z-10  -mt-3'>
                                    {/* <input type="radio" name="" id="" checked={active === 2} />   */}
                                    <input id="achalan" type="radio" onChange={fromData} value={99} name="pg" required={true} />
                                  </div>
                                  <div className='flex items-center justify-center mx-2 my-2' htmlFor="achalan">
                                    <div>
                                      <Image className='w-[200]' src={relative_image_path('pgicon/acsonline.jpeg')} height={300} width={300} alt='image error' />
                                    </div>
                                  </div>
                                  <p className="mb-2">এ-চালান ( অনলাইন )</p>
                                </fieldset>
                              </div>

                              <div onClick={() => setActive(3)} className={`m-2 w-[30%] lg:w-[30%]`}>
                                <fieldset className='border border-gray-500 rounded-md h-full'>
                                  <div className='z-10  -mt-3'>
                                    {/* <input type="radio" name="" id="" checked={active === 2} />   */}
                                    <input id="achalanOtc" type="radio" onChange={fromData} value={98} name="pg" required={true} />
                                  </div>
                                  <div className='flex items-center justify-center  mx-2 my-2 htmlFor="achalanOtc'>
                                    <div>
                                      <Image className='w-auto' src={relative_image_path('pgicon/acsotc.jpeg')} height={1000} width={1000} alt='image error' />
                                    </div>
                                  </div>
                                  <p className="mb-2">এ-চালান ( ওটিসি )</p>
                                </fieldset>
                              </div>

                              <div className="flex justify-end space-x-2">

                                <button
                                  type="button" onClick={handlePaymentSubmit}
                                  className="text-14 leading-[14px] bg-primary text-white px-[37px] py-[10px] lg:px-[61px] lg:py-[12px] rounded-md"
                                  style={{ backgroundColor: "green" }}
                                >
                                  ই-পেমেন্ট করুন
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </>
                }
              </Modal>

            </div>
          }


          {/* </form> */}
        </div>
      </div>
    </div>
  )
}

export default BatchPayment;