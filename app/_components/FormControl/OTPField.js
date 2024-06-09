import React, { useEffect, useState, useRef } from "react";
import { number_check } from "../../../halpers/helper.js";


function OTPField({ valueLength, onChange }) {
    const refArray = useRef([]);
    const [currentIndex, setCurrentIndex] = useState('')

    const thisOnChange = (e, idx) => {
        const value = e.target.value;
        onChange(value, idx)
        if(!value){
            idx > 0 ? refArray.current[idx - 1].focus() : ''
        }

        if (Number.isInteger(parseInt(value))) {
            if (number_check(value)) {

                if (value) {
                    idx < 5 ? refArray.current[idx + 1].focus() : ''

                } else {
                    idx > 0 ? refArray.current[idx - 1].focus() : ''
                }
            }
        }

    }

    useEffect(() => {
        refArray.current[0]?.focus();
    }, [])

    const laala = (e) => {

        if (e.key === "ArrowRight" && currentIndex < 5) {
            refArray.current[currentIndex + 1]?.focus();
        }

        if (e.key === "ArrowLeft" && currentIndex > 0) {
            refArray.current[currentIndex - 1]?.focus();
        }
    }

    
    return <>
        <div onKeyDown={(e) => laala(e)} className="mt-10 mb-10 flex justify-center">
            <div className="otp-group">
                {valueLength?.map((digit, idx) => (
                    <input
                        key={idx}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="\d{1}"
                        maxLength={1}
                        className="otp-input"
                        onFocus={() => setCurrentIndex(idx)}
                        ref={ref => {
                            refArray.current[idx] = ref; // took this from your guide's example.
                          }}
                        onChange={(e) => thisOnChange(e, idx)}
                        value={digit}
                    />
                ))}
            </div>
        </div>
    </>
}

export default OTPField;