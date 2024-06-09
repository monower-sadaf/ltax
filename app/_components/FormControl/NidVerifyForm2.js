'use client';

import { getTokenFromCookie } from '@/app/_utils/cookieUtils';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import stringify from 'core-js/es/json/stringify';
import { Button, Modal } from 'flowbite-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertArrayToObj } from '@/halpers/helper';

export default function NidVerifyform(citizenData) {

  const [openModal, setOpenModal] = useState(0);
  const [hidden,setHidden] = useState(true);
  const props = { openModal, setOpenModal };

  const dd = Array.from({ length: 31 }, (_, index) => index + 1);
  const mm = [
    {
      key: '',
      value: 'মাস'
    },
    {
      key: '01',
      value: 'জানুয়ারী'
    },
    {
      key: '02',
      value: 'ফেব্রুয়ারী'
    },
    {
      key: '03',
      value: 'মার্চ'
    },
    {
      key: '04',
      value: 'এপ্রিল'
    },
    {
      key: '05',
      value: 'মে'
    },{
      key: '06',
      value: 'জুলাই'
    },
    {
      key: '08',
      value: 'আগস্ট'
    },
    {
      key: '09',
      value: 'সেপ্টেম্বর'
    },
    {
      key: '10',
      value: 'অক্টোবর'
    },
    {
      key: '11',
      value: 'নভেম্বর'
    },
    {
      key: '12',
      value: 'ডিসেম্বর'
    }
  ];

  const router = useRouter();

  const startYear = 1900;
  const endYear = 2010;
  const yyyy = Array.from({ length: endYear - startYear + 1 }, (_, index) => endYear - index);

  const [nid, setNid] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dob, setDob] = useState('');
  const [submittedData, setSubmittedData] = useState([]);
  const [errormsg,setErrormsg] = useState('');

  const [verify,setVerify] = useState(0);
  const [nidVerify,setNidVerify] = useState(null);

  const token = getTokenFromCookie();

  const sess_citizen = localStorage.getItem('citizen');
  
    const parsedData = JSON.parse(sess_citizen);
    const userName = parsedData?.username;
    const is_approved = parsedData?.is_approved;
  
    const handleSubmit = async (e) => {

    e.preventDefault();
    const d = `${year}-${month}-${day}`; 
    setDob(d);
    const formData = {
      mobile: userName,
      nid: nid,
      dob: d
    };

    const headersOption = {
      Authorization: token,
      "content-type": "application/json",
    };

    const res = await axios.post(
      process.env.BASE_URL+'/api/nidCheck',
      formData,
      {headers:headersOption}
    );

    if(res?.data?.status == 'true' && res?.data?.data != ''){
      const response = res?.data?.data;
      // localStorage.removeItem('citizen');
      const dt = stringify(response);
      const parsedNewSessData = JSON.parse(dt);

      const parsedDataObj = parsedNewSessData?.reduce((acc, item) => {
          acc['data'] = item;
          return acc;
      }, {});

      parsedDataObj.data.username = userName;
      parsedDataObj.data.is_approved = is_approved;
      const citizenInfo = parsedDataObj.data;
      const c = stringify(citizenInfo);

      console.log('c-> ',c);

      Object.assign(sess_citizen,{
        "name": c?.name,
        "email": c?.email,
        "gender": c?.gender,
        "nid": c?.nid,
        "address": c?.address,
        "father_name": c?.father_name,
        "mother_name": c?.mother_name,
        "dob": c?.dob
      });

      localStorage.setItem('citizen', sess_citizen);

      if(openModal == 'default'){
        setOpenModal(0);

        if(parsedDataObj?.data?.is_approved == 1 || citizenInfo?.data?.is_approved == 1)
          setVerify(parsedDataObj?.data?.nid);
        if(citizenInfo?.data?.nid != null)
          setNidVerify(parsedDataObj?.data?.nid);
          setNid(' ');
          setYear(' ');
          setMonth(' ');
          setDay(' ');
        toast.success('আপনার জাতীয় পরিচয়পত্রটি যাচাই করা হয়েছে ।');
        router.push('/citizen');
      }


      router.push('/citizen');
    }else{
      toast.error(res?.data?.msg);
      const errormsg = res?.data?.msg;
      setErrormsg(errormsg);
    }
    
    setSubmittedData([...submittedData, formData]);  
  }

  const HandleModal = ()=>{
    setHidden(false);
  }

 

  return (

    <>

      <button onClick={HandleModal} className="text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] text-primary border border-primary px-3 py-2 rounded-lg">যাচাই করুন</button>

      {
        !hidden && 
          <div id="defaultModal" tabindex="-1" aria-hidden="true" className="flex justify-center items-center drop-shadow-2xl fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b  rounded-t">
                        <h3 className="text-18 lg:text-24 lg:leading-[24.27px] text-primary">
                          সংশোধিত এন.আই.ডি তথ্য হালনাগাদ
                        </h3>
                        <button onClick={()=>setHidden(true)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    
{/*                     <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div> */}

                    <form onSubmit={handleSubmit} className='p-4'>
                      <span className='text-center text-dark'>{errormsg}</span>

                      <div>
                          <div className="mb-2 block">
                              <Label
                                className='lg:text-[20px]'
                                htmlFor="nid"
                                value="জাতীয় পরিচয়পত্র নম্বর"
                                />
                              
                          </div>
                          <TextInput
                              className='focus:ring-0 focus:outline-none'
                              id="nid"
                              sizing="sm"
                              type="text"
                              value={nid}
                              onChange={(e) =>
                          setNid(e.target.value)}
                          />
                        </div>
                        <div className="mt-3 mb-2 block">
                            <Label
                              htmlFor=""
                              value="জন্ম তারিখ *"
                              />
                        </div>
                        <div className='flex'>
                          <div
                            className="max-w-md w-1/3"
                            id="select"
                            >
                            <div className="mb-2 block">
                                <Label
                                  htmlFor="day"
                                  value=""
                                  />
                            </div>
                            <Select id="day" required value={day}
                                  onChange={(e) =>
                                  setDay(e.target.value)}>
                                  {dd.map((element) => (
                                  <option key={element}>{element}</option>
                                ))}
                            </Select>
                        </div>
                        <div
                          className="max-w-md w-1/3"
                          id="select"
                          >
                          <div className="mb-2 block">
                              <Label
                                htmlFor="month"
                                value=""
                                />
                          </div>
                          <Select id="month" required value={month}
                              onChange={(e) =>
                              setMonth(e.target.value)}>
                              {mm.map((item,index) => (
                              <option value={item.key}>{item.value}</option>
                              ))}
                          </Select>
                        </div>
                        <div
                          className="max-w-md w-1/3"
                          id="select"
                          >
                          <div className="mb-2 block">
                              <Label
                                htmlFor="year"
                                value=""
                                />
                          </div>
                          <Select id="year" required value={year}
                              onChange={(e) =>
                              setYear(e.target.value)}>
                              {yyyy.map((element) => (
                              <option key={element}>{element}</option>
                              ))}
                          </Select>
                        </div>
                      </div>
                    </form>
                    
{/*                     <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                        <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                    </div> */}
                </div>
            </div>
        </div>
      }

{/*       <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>জাতীয় পরিচয়পত্রের তথ্য ভেরিফাই</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">  
            <div className="flex max-w-md flex-col gap-4">
              <form onSubmit={handleSubmit} className='m-0 m-auto'>

                  <span className='text-center text-dark'>{errormsg}</span>

                  <div>
                    <div className="mb-2 block">
                        <Label
                          htmlFor="nid"
                          value="জাতীয় পরিচয়পত্র নম্বর"
                          />
                    </div>
                    <TextInput
                        id="nid"
                        sizing="sm"
                        type="text"
                        value={nid}
                        onChange={(e) =>
                    setNid(e.target.value)}
                    />
                  </div>
                  <div className="mt-3 mb-2 block">
                      <Label
                        htmlFor=""
                        value="জন্ম তারিখ *"
                        />
                  </div>
                  <div className='flex'>
                    <div
                      className="max-w-md w-1/3"
                      id="select"
                      >
                      <div className="mb-2 block">
                          <Label
                            htmlFor="day"
                            value=""
                            />
                      </div>
                      <Select id="day" required value={day}
                            onChange={(e) =>
                            setDay(e.target.value)}>
                            {dd.map((element) => (
                            <option key={element}>{element}</option>
                          ))}
                      </Select>
                  </div>
                  <div
                    className="max-w-md w-1/3"
                    id="select"
                    >
                    <div className="mb-2 block">
                        <Label
                          htmlFor="month"
                          value=""
                          />
                    </div>
                    <Select id="month" required value={month}
                        onChange={(e) =>
                        setMonth(e.target.value)}>
                        {mm.map((item,index) => (
                        <option value={item.key}>{item.value}</option>
                        ))}
                    </Select>
                  </div>
                  <div
                    className="max-w-md w-1/3"
                    id="select"
                    >
                    <div className="mb-2 block">
                        <Label
                          htmlFor="year"
                          value=""
                          />
                    </div>
                    <Select id="year" required value={year}
                        onChange={(e) =>
                        setYear(e.target.value)}>
                        {yyyy.map((element) => (
                        <option key={element}>{element}</option>
                        ))}
                    </Select>
                  </div>
                </div>
                  <button type="submit" className='mt-5 mb-5 text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] text-primary border border-primary px-5 py-2 rounded-lg'>যাচাই ও হালনাগাদ করুন</button>
              </form>
            </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)} className="text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] text-primary border border-danger px-5 py-2 rounded-lg">Close</Button>
        </Modal.Footer>
      </Modal> */}

    </>
  )
}