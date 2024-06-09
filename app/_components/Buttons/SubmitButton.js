
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

{/*

export default function SubmitButton(props) {
    return <>
        {props?.status === 'loading' ?


            <button type="button"
                className="sbmit text-white bg-blue-400 bg-secondary flex items-center
                    cursor-not-allowed font-medium rounded-lg text-sm
                    px-5 py-2.5 text-center" disabled>
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>

                {props?.title}
            </button>

            :
            ''
        }

        {
            props?.status === 'disabled' ?

                <button type="button"
                    className="sbmit text-white bg-blue-400 dark:bg-blue-500
                    cursor-not-allowed font-medium rounded-lg text-sm
                    px-5 py-2.5 text-center" disabled>
                    <img  src={props?. ImagePath} alt={props?. ImagePath} />

                    {props?.title}
                </button>

                : ''
        }

        {
            props.status === 'success' ?
                <button type="submit"
                    className="flex text-slate-700 space-x-3 items-center bg-secondary px-5 py-2 rounded-md
                ">
                    {props?. ImagePath && <img  className="mr-3" src={props?. ImagePath} alt={props?. ImagePath} />}
                    {props?.title}
                    {props?.icon && <FontAwesomeIcon
                        icon={props?.icon}
                        size={props?.iconSize ?? "xl"}
                        style={{ color: props?.iconColor ?? "#12633d", marginLeft: '5px' }}
                    />}

                </button>
                : ''
        }

    </>
}

*/}

export default function SubmitButton(props) {
    return <>
        {props?.status === 'loading' ?


            <button type="button"
                className="p-3 pt-4 text-[10px] ml-2 leading-[10.11px] w-[35%]  hover:bg-green-700 hover:text-gray-50 lg:text-14 lg:leading-[14.16px] text-primary rounded-md text-white flex" disabled>
                <div role="status">
                    <svg aria-hidden="true" className="bottom-[5px] w-4 h-4 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>

                {props?.title}
            </button>

            :
            ''
        }

        {
            props?.status === 'disabled' ?

                <button type="button"
                    className="p-3 pt-4 text-[10px] ml-2 leading-[10.11px] w-[35%]  hover:bg-green-700 hover:text-gray-50 lg:text-14 lg:leading-[14.16px] text-primary rounded-md text-white flex" disabled>
                    <img  src={props?. ImagePath} alt={props?. ImagePath} className='relative bottom-[5px] p-0 !w-[fit] mr-3'/>

                    {props?.title}
                </button>

                : ''
        }

        {
            props.status === 'success' ?
                <button type="submit"
                    className="p-3 pt-4 text-[10px] ml-2 leading-[10.11px] w-[35%]  hover:bg-green-700 hover:text-gray-50 lg:text-14 lg:leading-[14.16px] rounded-md text-white flex justify-around items-center
                ">
                    {props?. ImagePath && <img  className="relative bottom-[5px] p-0 !w-[fit] mr-3" src={props?. ImagePath} alt={props?. ImagePath} />}
                    {props?.title}
                    {props?.icon && <FontAwesomeIcon
                        icon={props?.icon}
                        size={props?.iconSize ?? "xl"}
                        style={{ color: props?.iconColor ?? "#12633d", marginLeft: '5px' }}
                    />}

                </button>
                : ''
        }

    </>
}