import React, { useEffect, useState } from "react";
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function PasswordField(props) {

    const onChangeEvent = (e) => {
        if (props.eventHandel) {
            props.eventHandel(e)
        }
    }
    const [passwordShowHide, setPasswordShowHide] = useState(false);

    return <>
        <div className="mb-5">
            <fieldset className="pl-3 border border-primary rounded">
                <legend className="px-2 text-primary text-12 leading-[14.06px]">{props.label}
                    <span>
                        {props.required == true ? ' *' : ''}
                    </span>
                </legend>
                <div className="flex items-center">
                    <input
                        style={{ border: 'none' }}
                        onChange={(e) => (onChangeEvent(e))}
                        required={props.required == true ? 'required' : false}
                        type={passwordShowHide ? 'text' : 'password'}
                        name={props.name}
                        className={`
                            w-[90%]
                            border-none
                            focus:border-none
                            focus:ring-0
                            placeholder:text-[14px]
                            placeholder:leading-[16.41px]
                            lg:placeholder:text-[16px]
                            lg:placeholder:leading-[18.75px]
                            placeholder:text-[#969696]
                            ${props?.class}`
                        }
                        id={props.name}
                        // placeholder={capitalizeFirst(props.placeholder)}
                        placeholder={props.placeholder}
                        maxLength={props.maxL ?? ''}
                        minLength={props.minL ?? ''}
                        disabled={props.disabled ?? ''}
                        value={props.value || ''}
                    />
                    {passwordShowHide ?
                        <><div onClick={() => setPasswordShowHide(!passwordShowHide)}>
                            <FontAwesomeIcon icon={faEye} className="w-[100%] cursor-pointer" style={{ color: "#7ECBA1" }} />


                        </div></> :
                        <>
                            <div onClick={() => setPasswordShowHide(!passwordShowHide)}>
                                <FontAwesomeIcon icon={faEyeSlash} className="w-[100%] cursor-pointer" style={{ color: "#7ECBA1" }} />
                            </div></>
                    }
                </div>

            </fieldset >
            <p
                className={`
            pl-3 
            pt-1 text-[#12633D] text-[10px] leading-[11.72px] lg:text-[12px] lg:leading-[14.06px] ${props?.helpClass}`}>
                {props?.help}
            </p>

            {
                props.anyMessage ? <>
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

        </div >
    </>
}

export default PasswordField;