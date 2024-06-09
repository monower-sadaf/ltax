"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { searchByMobile, requestForInclude } from "../_api/api";
// import Loader2 from "@/app/_components/_skeleton/Loader2/Loader2";

const Home = () => {
  
  const params = useSearchParams();
  const phone = params.get("phone");

  const [searchResult, setSearchResult] = useState([]);

  // useEffect(() => {
  //   searchByMobile(phone)
  //     .then((res) => {
  //       setSearchResult(res);
  //     })
  //     .catch((res) => {
  //       console.log("search by mobile error: ", res);
  //     });
  // }, []);

  const sendApplication = (parent_org_id, parent_username) => {
    const payload = {
      org_id: 34,
      org_parent_id: parent_org_id,
      username: parent_username,
    };

    // requestForInclude(payload).then((res) => {
    //   console.log("request for include: ", res);
    //   if(res.status != 200) alert(res.message)
    //   else alert('request sent successfully!')
    // }).catch((res) => {
    //   console.log("request for include error: ", res);
    // })

  };

  console.log("search by mobile result: ", searchResult);

  return (
    <section className="bg-white min-h-screen w-full rounded-md">
      <h3 className="text-20 text-center bg-primary text-white rounded-t-md py-3 mb-4">
        Search Parent Organization
      </h3>
      <div>
        {searchResult.length == 0 ? (
          <div>
           'লোডিং...'
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th>প্রতিষ্ঠানের নাম</th>
                <th>ইউজার নেম</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {searchResult.map((data, index) => (
                <tr key={index}>
                  <td>{data?.org_name}</td>
                  <td>{data?.username}</td>
                  <td>
                    <button
                      className="bg-sky-500 text-white px-2 py-1 rounded-md hover:shadow-lg"
                      onClick={() => {
                        const decision = confirm(
                          `আপনি কি ${data?.org_name} এর অন্তর্ভুক্ত হতে চান?`
                        );
                        if (decision) {
                          sendApplication(data.id, data.username);
                        }
                      }}
                    >
                      অনুরোধ প্রেরণ করুন
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Home;
