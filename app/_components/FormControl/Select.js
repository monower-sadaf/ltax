'use client'
import Select2 from 'react-select';
import { usePathname } from 'next/navigation';


const Select = (props) => {

    const route = usePathname();

    const onChangeEvent = (e, name) => {
        if (props.eventHandel) {
            props.eventHandel(e, name)
        }
    }
    const style = {
        control: base => ({
            ...base,
            border: 0,
            boxShadow: "none",
            fontSize: "14px",
            with: '200px'
        })
    };

    return <>
{/*         <div className='absolute z-50'>
            <Image src={relative_image_path('loading_thinking.gif')} height={100} width={100} alt='loader image error' />
        </div> */}
        <div className={`${route === '/citizen/khotian/create' ? 'mb-0' : 'mb-5'}`}>
            <fieldset className="pl-3 border border-primary rounded">
                <legend className="px-2 text-primary text-12 leading-[14.06px] ">{props.lavel}
                    <span className="text-red-600">
                        {props.required == true ? ' ** ' : ''}
                    </span>
                </legend>
                <div className="w-full">
                    <Select2
                        styles={style}
                        onChange={(e) => onChangeEvent(e, props.name)}
                        options={props.options}
                        placeholder={props.placeholder}
                        name={props.name}
                        required={props.required}
                        instanceId={props.id}
                        value={props?.options?.filter(function (option) {
                            return option?.value === props?.selectedOption;
                        })}
                    />

                    {/* <FontAwesomeIcon icon={props?.icon} className="w-[5%]" style={{ color: "#12633d" }} /> */}

                </div>
            </fieldset>
            <p
                className="
            text-10
            text-primary 
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

export default Select