'use client'
import { useEffect, useState } from "react";
import { GetPaymentDetailsByDakhila } from "../_api/api";
import { en2bn } from "@/halpers/helper";

const PaymentDetailsByDakhila = (props) => {

    const [data, setData] = useState([]);

    let dakhila_no = props.dakhila;

    useEffect(() => {
        GetPaymentDetailsByDakhila(dakhila_no).then(response => {
            console.log(response?.data);
            setData(response?.data?.data);
        });
    }, []);

    console.log(data);

    return (
        <div className="w-full h-auto dark:bg-slate-800 gap-6">
            <div
                className="bg-gray-100 dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
                <div className="flex items-center gap-4">
                    <div className="w-fit transition-all transform duration-500 w-full">
                        <div className="flex items-center gap-4 w-full">
                            <table className="w-full border m-4">
                                <thead className="m-4 h-[30px] text-white font-semibold bg-green-700 border-b">
                                    <tr className="text-[.8em]">
                                        <th className="my-2 p-2">হোল্ডিং নং	</th>
                                        <th className="my-2 p-2">ব্যাচ পেমেন্ট রেফারেন্স</th>
                                        <th className="my-2 p-2">রিকোয়েস্ট আইডি	</th>
                                        <th className="my-2 p-2">ট্রানজেকসন আইডি	</th>
                                        <th className="my-2 p-2">দাখিলা	</th>
                                        <th className="my-2 p-2">চালান	</th>
                                        <th className="my-2 p-2">পেমেন্ট মেথড	</th>
                                        <th className="my-2 p-2">কর পরিশোদের সাল</th>
                                        <th className="my-2 p-2">দাবি</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                        <td className="my-2 p-2">{en2bn(data[0]?.holding_no)}</td>
                                        <td className="my-2 p-2">{en2bn(data[0]?.batch_ref_id)}</td>
                                        <td className="my-2 p-2">{en2bn(data[0]?.request_id)}</td>
                                        <td className="my-2 p-2">{en2bn(data[0]?.request_id)}</td>
                                        <td className="my-2 p-2">{en2bn(data[0]?.transaction_id)}</td>
                                        <td className="my-2 p-2">{en2bn(data[0]?.challan_no)}</td>
                                        <td className="my-2 p-2">{data[0]?.web?.toUpperCase()} {data[0]?.app?.toUpperCase()}</td>
                                        <td className="my-2 p-2">সর্বশেষ কর পরিশোদের সাল	</td>
                                        <td className="my-2 p-2">দাবি</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentDetailsByDakhila;

