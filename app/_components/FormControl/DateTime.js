import React from "react";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'


function DateTime(props) {


    return <>
        <div className="mb-5">
            <fieldset className="pl-3 border border-primary rounded">
                <legend className="px-2 text-primary text-[1.1em]">{props.label}
                    <span>
                        {props.required == true ? ' ** ' : ''}
                    </span>
                </legend>


                <div className="flex items-center dateFickerDesign">
                    <Flatpickr
                        disabled={props?.disabled}
                        onChange={(selectedDates, datestr, instance) => props.eventHandel({ selectedDates, datestr, instance, name })}
                        value={props?.value}
                        name={props?.name}
                        placeholder={props?.placeholder ?? 'dd/mm/yyyy'}


                        options={
                            props?.mode ?
                                {
                                    enableTime: props?.enableTime,
                                    altFormat: props?.altFormat,
                                    dateFormat: props?.dateFormat,
                                    altInput: props?.altInput,
                                    minDate: props?.minDate,
                                    maxDate: props?.maxDate,
                                    mode: props?.mode,
                                }
                                :
                                {
                                    enableTime: props?.enableTime,
                                    altFormat: props?.altFormat,
                                    dateFormat: props?.dateFormat,
                                    altInput: props?.altInput,
                                    minDate: props?.minDate,
                                    maxDate: props?.maxDate,
                                    format: "d-m-Y",
                                }
                        }
                    />
                    <legend>
                    <FontAwesomeIcon icon={faCalendar} size="xl" style={{ color: "#12633d" }} />
                    {/* className="w-[15%]" */}

                    </legend>
                </div>


            </fieldset >
            <p
                className="
            text-10
            text-primary 
            pl-3 
            pt-1">
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

export default DateTime;