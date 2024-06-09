'use client';

import { getTokenFromCookie } from '@/app/_utils/cookieUtils';
import { useState } from 'react';
import axios from 'axios';
import stringify from 'core-js/es/json/stringify';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import { en2bn,bn2en } from '@/halpers/helper';

export default function Modal(data) {

  const [openModal, setOpenModal] = useState(0);
  const [hidden,setHidden] = useState(true);
  const props = { openModal, setOpenModal };
  const router = useRouter();

//   if(window != undefined) window.location.href='/citizen';

  const HandleModal = ()=>{
    setHidden(false);
  }

  return (

    <>
      
      <button onClick={HandleModal} className="w-full my-2 mx-2 text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] text-primary border border-primary px-3 py-2 ">{data.btn}</button>
      {
        !hidden && 
        <div id="defaultModal" tabindex="-1" aria-hidden="true" className="flex justify-center drop-shadow-2xl fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b  rounded-t">
                        <h3 className="text-16 lg:text-24 lg:leading-[24.27px] text-primary m-0 m-auto">
                        {data.btn}
                        </h3>
                        <button onClick={()=>setHidden(true)} type="button" className="m-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal" style={{margin:0}}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 h-[300px]">
                        <span className='mx-4 my-4 p-4 text-[1em]'>
                            {data?.data?.length > 0 ? data?.data[1] : ''}
                        </span>
                    </div>
                </div>
            </div>
        </div>
      }
    </>
  )
}