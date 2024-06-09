

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Button(props) {
    return <>
        <button type="button"
            className={`sbmit text-white bg-blue-400
                    cursor-not-allowed font-medium rounded-lg text-sm
                    px-5 py-2.5 text-center ${props?.class}`} disabled>

            {props?.title}

            <FontAwesomeIcon icon={props?.icon} size={props?.size ?? "xl"} style={{ color: props?.color ?? "#12633d" }} />

        </button>
    </>
}