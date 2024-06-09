import { useEffect, useState } from "react";
import { MarkAsReadNotification, Notification } from "../_api/api";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const OwnerNotification = (id) => {

    const ownerId = id?.data;

    const [notification, setNotification] = useState([]);
    const [isBellOpen, setIsBellOpen] = useState(false);
    const [notificationCounter, setNotificationCounter] = useState(0)

    const notificationList = () => {
        Notification(ownerId).then(dataArray => {
            setNotification(dataArray);
            setNotificationCounter(dataArray?.count);
        });
    }

    useEffect(() => {
        if (ownerId) {
            notificationList();
        }
    }, [ownerId]);

    const handleToggleForBell = () => {
        setIsBellOpen(prevIsBellOpen => !prevIsBellOpen);
    }

    const [refresh, setRefresh] = useState(0);

    const handleMarkAsRead = (notification_id) => {
        let req = {
            'user_id': ownerId,
            'notification_id': notification_id
        }
        MarkAsReadNotification(req).then((response => {
            if (response?.success == true) {
                toast.success(response?.message);
                setRefresh(1);
                notificationList();
                setRefresh(0);
                let updateNotificationCounter = notificationCounter - 1;
                setNotificationCounter(updateNotificationCounter);
            }
        }));
    }

    return (
        <>
            <button className="relative w-[1.3em] lg:w-[1.5em]" onClick={handleToggleForBell}>
                <svg
                    fill="#198754"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                    <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                </svg>
                <span className="absolute top-[-18px] left-[8px] text-white bg-[#CF0000] rounded-md w-10">{notificationCounter} {isBellOpen}</span>
            </button>

            {
                isBellOpen && <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none px-4 py-4 h-48 overflow-y-scroll" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    {
                        refresh == 1 ? <span>Loading...</span> :
                            <ul className="divide-y divide-dashed">
                                {
                                    Array.isArray(notification.data) && notification.data.length > 0 > 0 ?
                                        notification?.data?.map((item, index) => {
                                            return (
                                                <li key={index} className="p-2 relative flex justify-between">
                                                    <span className="w-80">{item?.notification_data}</span>
                                                    <button onClick={() => handleMarkAsRead(item?.id)} className="mt-2 ml-5 text-[0.8em] text-[#CF0000] text-weight-800">
                                                        <FaCheckCircle />
                                                    </button>
                                                </li>
                                            )
                                        })
                                        : <span className="text-[#CF0000]">কোন নোটিফিকেশান পাওয়া যায় নি</span>
                                }
                            </ul>
                    }
                </div>
            }
        </>

    )
}

export default OwnerNotification;