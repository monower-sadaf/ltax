"use client";

import { Payment } from "@/app/_api/api";
import Select from "@/app/_components/FormControl/Select";
import { en2bn, relative_image_path } from "@/halpers/helper";
import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function OnlinePayment(allData) {

  const [active, setActive] = useState(null);
  const data = allData?.data[0];
  let org_id = allData?.data[1];
  
  const [openModal, setOpenModal] = useState(undefined);
  const props = { openModal, setOpenModal };
  const [formInputs, setFormInputs] = useState({});
  const router = useRouter();
  const [amount,setAmount] = useState(0);


  const fromData = (e) => {

    // alert(e.target.value);
    
    const { name, value } = e.target;
    
    setFormInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    
  };

  let owner_id = "";
  let deposite_by = "";
  let holding_id = "";

  if (data?.land_tax_of_owners?.length > 0) {
    owner_id = 0;
    deposite_by = "সকল মালিক";
    data?.land_tax_of_owners?.map((item) => {
      holding_id = item?.ldtax_holding_id;
    });
  } else if (data?.land_tax_of_owners?.length == 1) {
    data?.land_tax_of_owners?.map((item) => {
      owner_id = item?.id;
      deposite_by = item?.name;
      holding_id = item?.ldtax_holding_id;
    });
  }

  const selectEventForAdvancePayment = (e) => {
    const { name,value } = e;
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  

  let selectValForAdvancePayment = [
    {
      id: 1,
      val: `১ বছর  (${en2bn(parseFloat(data?.current_demand))} টাকা)`,
    },
    {
      id: 2,
      val: `২ বছর  (${en2bn(parseFloat(data?.current_demand) * 2)} টাকা)`,
    },
    {
      id: 3,
      val: `৩ বছর  (${en2bn(parseFloat(data?.current_demand) * 3)} টাকা)`,
    }
  ];

  const d = new Date();
  let year = d.getFullYear();

  const [loading,setLoading] = useState(false);
  const [checkOtc,setCheckOtc] = useState(0);
  const [otcRes,setOtcRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let holdingDabi = 0;
    let holdingTax_clear_year = 0;
    if (data?.tax_clear_year == year && data?.total_demand == 0) {
      holdingTax_clear_year = formInputs.advanced_year;
      holdingDabi = parseFloat(data?.current_demand) * holdingTax_clear_year;
    } else {
      holdingTax_clear_year = 0;
      holdingDabi = parseFloat(formInputs.amount);
    }

    Object.assign(formInputs, {
      holding_id: holding_id,
      amount: holdingDabi,
      advance_year: holdingTax_clear_year,
      depositor_cid: org_id,
      owner_id: owner_id,
      is_app: 0,
      dipositor_nid: '4209176249',
      dipositor_dob: '1999-11-23',
      phone: '01767056733'
    });

    try {
      const res = Payment(formInputs).then(function (data) {
        if(data == undefined || data == null) {
          toast.danger('পুনরায় চেষ্টা করুন');
          router.push(`/organization/holding/${holding_id}`);
        } else if (data?.status == 'true') {
          if(data?.pay_type == 'otc') {
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
        toast.success(data?.msg);
        router.push(data?.url);
      });
    } catch (error) {
      toast.danger('পেমেন্ট সার্ভার ডাউন');
    }

    
  };

  return (
    <>
      <button
        onClick={() => props.setOpenModal("default")}
        className="text-14 leading-[14px] bg-[#12633D] text-white px-[37px] py-[10px] lg:px-[61px] lg:py-[12px] rounded-md"
      >
          {data?.tax_clear_year == year && data?.total_demand == 0  ? 'অগ্রিম পেমেন্ট' : 'অনলাইন পেমেন্ট'}
      
      </button>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}

      >

        {
          checkOtc == 1 ? 
          <>
            <Modal.Header className="text-center">
              <span className="text-center"> এ-চালান ( ওটিসি )</span>
            </Modal.Header>
            <Modal.Body>
              {
                loading == true ? <span className="text-center">লোড হচ্ছে...</span> : otcRes
              }
            </Modal.Body>
          </>
          : <>
            <Modal.Header className="text-center">
          ভূমি উন্নয়ন কর পরিশোধ করতে নিচের তথ্য পূরণ করুন
        </Modal.Header>
        <Modal.Body>
          {
            loading == true ? 
              <span className="text-center">লোড হচ্ছে...</span> 
              :
              <div className="space-y-6">
            <form onSubmit={handleSubmit} target="_blank">
              <div className="text-gray-500">

                { data?.tax_clear_year == year && data?.total_demand == 0  ? 
                
                  <Select
                      name="advanced_year"
                      eventHandel={selectEventForAdvancePayment}
                      lavel="অগ্রিম বছর"
                      selectedOption={formInputs.advanced_year}
                      options={selectValForAdvancePayment.map((option) => ({
                        value: option.id,
                        label: option.val,
                      }))}
                      required={true}
                      id="advanced_year"
                      // anyMessage={serverMessage}
                    /> : 
                    
                    <>
                      {/* <InputField
                        class="border-none w-full"
                        label="টাকার পরিমাণ"
                        eventHandel={fromData}
                        id="amount"
                        name="amount"
                        value={formInputs.amount || ''}
                        required={false}
                        type="text"
                        placeholder="টাকার পরিমাণ"
                      /> */}

                      <input type="text" id="amount" name="amount" className="w-full my-4" onChange={fromData}/>
                      
                    </>
                }
              </div>
              
              <hr className="w-full h-px bg-[#BABABA] border-0 mb-2" />
              <div className="text-center">
                <div className="flex flex-wrap">
                  <div
                    onClick={() => setActive(1)}
                    className={`m-2 w-[42%] lg:w-[30%]`}
                  >
                    <fieldset className="border border-gray-500 rounded-md">
                      <div className="z-10 -mt-3">
                        {/* <input type="radio" name="" id="" checked={active === 1} /> */}
                        <input
                          id="ekpay"
                          type="radio"
                          onChange={fromData}
                          value={5}
                          name="pg"
                          required={true}
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <div>
                          <Image
                            className="w-auto"
                            src={relative_image_path("pgicon/ekpay.png")}
                            height={1000}
                            width={1000}
                            alt="Ekpay"
                          />
                        </div>
                        <div className="border-l border-gray-500 h-4 "></div>
                        <p>একপে</p>
                      </div>
                    </fieldset>
                  </div>

                  {/*
                        <div onClick={()=>setActive(2)} className={`m-2 w-[42%] lg:w-[30%]`}>
                           <fieldset className='border border-gray-500 rounded-md'>
                              <div className='z-10 -mt-3'>
                                 {/* <input type="radio" name="" id="" checked={active === 2} /> */}
                  {/*<input id="achalan" type="radio" onChange={fromData} value={99} name="pg" required={true}/>
                              </div>
                              <div className='flex items-center justify-center'>
                                 <div>
                                    <Image className='w-auto' src={relative_image_path('pgicon/acsonline.png')} height={1000} width={1000} alt='image error' />
                                 </div>
                                 <div className='border-l border-gray-500 h-4'></div>
                                 <p>এ-চালান</p>
                              </div>
                           </fieldset>
                        </div>
                        */}
                  {/*<div onClick={()=>setActive(3)} className={`m-2 w-[42%] lg:w-[30%]`}>
                           <fieldset className='border border-gray-500 rounded-md'>
                              <div className='z-10 -mt-3'>
                                 <input type="radio" name="" id="" checked={active === 3} />
                              </div>
                              <div className='flex items-center justify-center'>
                                 <div>
                                    <Image className='w-auto' src={relative_image_path('pgicon/ekpay.png')} height={1000} width={1000} alt='image error' />
                                 </div>
                                 <div className='border-l border-gray-500 h-4'></div>
                                 <p>একপে</p>
                              </div>
                           </fieldset>
                        </div>
                        <div onClick={()=>setActive(4)} className={`m-2 w-[42%] lg:w-[30%]`}>
                           <fieldset className='border border-gray-500 rounded-md'>
                              <div className='z-10 -mt-3'>
                                 <input type="radio" name="" id="" checked={active === 4} />
                              </div>
                              <div className='flex items-center justify-center'>
                                 <div>
                                    <Image className='w-auto' src={relative_image_path('pgicon/ekpay.png')} height={1000} width={1000} alt='image error' />
                                 </div>
                                 <div className='border-l border-gray-500 h-4'></div>
                                 <p>একপে</p>
                              </div>
                           </fieldset>
                        </div>
                        <div onClick={()=>setActive(5)} className={`m-2 w-[42%] lg:w-[30%]`}>
                           <fieldset className='border border-gray-500 rounded-md'>
                              <div className='z-10 -mt-3'>
                                 <input type="radio" name="" id="" checked={active === 5} />
                              </div>
                              <div className='flex items-center justify-center'>
                                 <div>
                                    <Image className='w-auto' src={relative_image_path('pgicon/ekpay.png')} height={1000} width={1000} alt='image error' />
                                 </div>
                                 <div className='border-l border-gray-500 h-4'></div>
                                 <p>একপে</p>
                              </div>
                           </fieldset>
                        </div>
                        */}
                </div>

                {/* <div className="grid grid-rows-4 grid-flow-col grid-col-4 gap-4"> */}
                {/*    <div className="col-span-2 border rounded-3 text-center relative " >
                           <label htmlFor="acs_online" className="w-full grid grid-flow-col">
                              <div className='items-center'><img className="w-[50px]" src={relative_image_path('pgicon/acs_online.png')}/> </div>
                              <div><span>| এ-চালান</span></div>
                           </label>
                           <input defaultChecked className="w-[5%] border-[0px] h-[2em] absolute   bottom-[56px]" id="acs_online" type="radio" value="99" name="pg"/>
                        </div>
                        
                        <div className="border rounded-3 text-center relative " >
                           <label htmlFor="bkash"  className="w-full grid grid-flow-col">
                              <img className="w-[50px]" src={relative_image_path('pgicon/bkash.png')}/><div><span> | বিকাশ</span></div>
                           </label>
                           <input className="w-[5%] border-[0px] h-[2em] absolute bottom-[50px] border-dark " id="bkash" type="radio" value="8" name="pg"/>
                        </div>
                     
                        <div className="  border rounded-3 text- center relative " >
                           <label htmlFor="upaym"  className="w-full grid grid-flow-col">
                              <img className="w-[50px]" src={relative_image_path('pgicon/upaym.png')}/><div><span> | উপায়</span></div>
                           </label>
                           <input className="w-[5%] border-[0px] h-[2em] absolute bottom-[50px] border-dark " id="upaym" type="radio" value="4" name="pg"/>
                        </div> */}

                {/*                         <div className="  border rounded-3 text- center relative " >
                           <label htmlFor="ekpay"  className="w-full grid grid-flow-col">
                              <img className="w-[50px]" src={relative_image_path('pgicon/ekpay.png')}/><div><span> | একপে</span></div>
                           <input className="w-[5%] border-[0px] h-[2em] absolute bottom-[50px] border-dark " id="ekpay" type="radio" onChange={fromData} value={5} name="pg" required={true}/>
                           </label>
                        </div> */}

                {/* <div className="  border rounded-3 text- center relative " >
                           <label htmlFor="nagad"  className="w-full grid grid-flow-col">
                              <img className="w-[50px]" src={relative_image_path('/pgicon/nagad.png')} /><div><span> | নগদ</span></div>
                           </label>
                           <input className="w-[5%] border-[0px] h-[2em] absolute bottom-[50px] border-dark " id="nagad" type="radio" value="6" name="pg"/>
                        </div>
                     
                        <div className="  border rounded-3 text- center relative " >
                           <label htmlFor="rocket"  className="w-full grid grid-flow-col">
                              <img className="w-[50px]" src={relative_image_path('pgicon/rocket.png')}/><div><span> | রকেট</span></div>
                           </label>
                           <input className="w-[5%] border-[0px] h-[2em] absolute bottom-[50px] border-dark " id="rocket" type="radio" value="15" name="pg"/>
                        </div>
                     
                        <div className="  border rounded-3 text- center relative " >
                           <label htmlFor="nexsus_pay"  className="w-full grid grid-flow-col">
                              <img className="w-[50px]" src={relative_image_path('pgicon/nexsus_pay_logo.png')}/><div><span> | নেক্সাস</span></div>
                           </label>
                           <input className="w-[5%] border-[0px] h-[2em] absolute bottom-[50px] border-dark " id="nexsus_pay" type="radio" value="10" name="pg"/>
                        </div> */}
                {/* </div> */}

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => props.setOpenModal(undefined)}
                    className="text-14 leading-[14px] bg-red-500 text-[#FFF] px-[37px] py-[10px] lg:px-[61px] lg:py-[12px] rounded-md"
                  >
                    বাতিল করুন
                  </button>
                  <button
                    type="submit"
                    className="text-14 leading-[14px] bg-primary text-white px-[37px] py-[10px] lg:px-[61px] lg:py-[12px] rounded-md"
                    style={{ backgroundColor: "green" }}
                  >
                    ই-পেমেন্ট করুন
                  </button>
                </div>
              </div>
            </form>
          </div> 

          }
          
        </Modal.Body>
          </>
        }

        
        {/*         <Modal.Footer>
          <button className='text-14 leading-[14px] bg-[#d91c1c] text-[#fff]-50 px-[37px] py-[10px] lg:px-[61px] lg:py-[12px] rounded-md text-[#fff]' onClick={() => props.setOpenModal(undefined)}>X</button >
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
