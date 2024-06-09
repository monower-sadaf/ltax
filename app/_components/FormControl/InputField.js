'use client'
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname } from 'next/navigation';


function InputField(props) {

    const onChangeEvent = (e) => {
        
        console.log(props.eventHandel(e));
        if (props.eventHandel) {
            props.eventHandel(e)
        }
    }
    const route = usePathname();

    return <>
        <div className={`${route === '/citizen/khotian/create' ? 'mb-0' : 'mb-5'}`}>
            <fieldset className="pl-3 border border-primary rounded">
                <legend className="px-2 text-primary text-12 leading-[14.06px]">{props.label}
                    <span className="text-red-600">
                        {props.required == true ? '**' : ''}
                    </span>
                </legend>
                <div className="flex items-center">
                    <input
                        onChange={(e) => (onChangeEvent(e))}
                        required={props.required == true ? 'required' : false}
                        type={props.type}
                        name={props.name}
                        className={`
                            
                            border-none
                            focus:border-none
                            focus:ring-0
                            placeholder:text-[14px]
                            placeholder:leading-[16.41px]
                            lg:placeholder:text-[16px]
                            lg:placeholder:leading-[18.75px]
                            placeholder:text-[#969696]
                            pl-1.5
                            w-[90%]
                            ${props?.class}`
                        }

                        id={props.name}
                        placeholder={props.placeholder}
                        maxLength={props.maxL ?? ''}
                        minLength={props.minL ?? ''}
                        disabled={(props.disabled ?? '')}
                        autoFocus="true"
                        readOnly={(props.readOnly ?? '')}
                    />

                    {/* <FontAwesomeIcon icon={props?.icon} className="w-[5%]" style={{ color: "#7ECBA1" }} /> */}

                </div>
            </fieldset>
            <p
                className="
          text-[#12633D] text-[10px] leading-[11.72px] lg:text-[12px] lg:leading-[14.06px]
            pl-3 
            pt-1">
                {props?.help}
            </p>

            {props.anyMessage ? <>
                <p
                    className="
                    text-10
                    text-danger
                    pl-3
                    pt-1
                       ">
                    {props.anyMessage?.[props.name]?.[0]}
                </p>
            </>
                :
                ''
            }

        </div>
    </>
}

export default InputField;