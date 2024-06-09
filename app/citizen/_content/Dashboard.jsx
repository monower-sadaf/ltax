import dynamic from "next/dynamic";
import DefaultSkeleton from "@/app/_components/_skeleton/DefaultSkeleton";
import DonutChart from "../_components/_charts/DougnutChart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";
import axios from "axios";
import { lazy, Suspense } from "react";

const DashboardStat = lazy(() =>
  import("@/app/(organization)/organization/_components/Dashboardstat")
);
const BarChart = lazy(() =>
  import("@/app/citizen/_components/_charts/BarChart")
);
const Nirdeshika = lazy(() =>
  import("../_components/Nirdesika")
);

const ComplainStat = dynamic(() => import("../_components/ComplainStat"), {
  loading: () => <DefaultSkeleton />,
});

const Dashboard = (citizen_data) => {
  
  const [statData, setStatData] = useState({
    holding: 0,
    dakhila: 0,
    khotian: 0,
    dabi: 0
  });
  
  // const [complainData, setComplainData] = useState(0);


  let BarChartData = {
    labels: [
      2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
    ],
    values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110],
  };

  let chartData = {
    labels: ["পরিশোধ", "বকেয়া"],
    values: [100, 30], // Provide your own values
  };

  let sData = undefined;

  const router = useRouter();

  const [complainData, setComplainData] = useState([]);

  const citizenId = citizen_data?.data?.id;
  const mobile_no = citizen_data?.data?.username;

  const [statisticsData, setStatisticsData] = useState([
    {
      total_dhakhila: 0,
      total_khotian: 0,
      total_holding: 0,
      total_dabi: 0,
      total_collection: null,
      dakhila_details: [
        {
          id: "1",
          dakkila_no: "00000000000000",
          dYear: "2023",
          collection: "0.00",
        },
      ],
      email: null,
      present_address: null,
    },
  ]);

  const token = getTokenFromCookie();

  const headersOption = {
    Authorization: token,
    "content-type": "application/json",
  };

  const stats = async () => {
    const { data } = await axios.post(
      process.env.BASE_URL_V1 + "/dashboard",
      { id: citizenId },
      { headers: headersOption }
    );
    setStatisticsData(data);
  };

  useEffect(() => {
    stats();
    // complainStat();
  }, []);

  sData = statisticsData?.data?.reduce((acc, item) => {
    acc["data"] = item;
    return acc;
  }, {});

  let barChartData = sData?.data?.year_wase_collection;

  let paid = 0;
  let dabi = 0;
  let total = 1;



  
  let dakhila_details = [];

  
  
  if (sData != "" || sData != undefined) {
    

    if(barChartData != undefined) {
      const labels = Object.keys(barChartData);
      const values = Object.values(barChartData);
      BarChartData = {
        labels: labels,
        values: values,
      };
    }

    paid = sData?.data?.total_collection == null ? parseInt(0) : parseFloat(sData?.data?.total_collection);
    dabi = sData?.data?.total_dabi == null ? parseInt(0) : parseFloat(sData?.data?.total_dabi);

    total = paid+dabi;
    paid = (paid/total) * 100;
    dabi = (dabi/total) * 100;

    chartData = {
      labels: ["পরিশোধ", "বকেয়া"],
      values: [paid, dabi], // Provide your own values
    };

  }

  return (
    <>
      <div className="w-full flex flex-col space-y-[11px]">
        <div className="flex flex-col lg:flex-row space-y-[11px] lg:space-y-0 lg:space-x-[11px]">
          <div className="lg:w-[100%]">
            <Suspense fallback={<p>Loading...</p>}>
              <DashboardStat
                holding={sData?.data?.total_holding}
                khotian={sData?.data?.total_khotian}
                dakhila={sData?.data?.total_dhakhila}
                dabi={sData?.data?.total_dabi}
              />
              
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row space-y-[11px] lg:space-y-0 lg:space-x-[11px]">
          <div className="bg-white p-4 rounded-lg lg:w-[100%] flex flex-col justify-between">
            <p className="text-12 leading-[12.14px] lg:text-20 lg:leading-[20.23px]">
            ভূমি উন্নয়ন কর এর সংক্ষিপ্ত তথ্যাবলী
            </p>
            <div className="flex justify-center items-center">
              <div className="w-auto lg:w-[75%]">
                <Suspense fallback={<p>Loading...</p>}>
                  <BarChart data={BarChartData} />
                  {/* <BarChart data={arr} /> */}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row space-y-[11px] lg:space-y-0 lg:space-x-[11px]">
          <div className="bg-white rounded-lg lg:w-[50%]">
            <ComplainStat data={sData?.data?.complain}/>
          </div>
          <div className="bg-white p-4 rounded-lg lg:w-[50%] flex flex-col justify-between space-y-3 ">
            <p className="text-20 leading-[22.98px] text-[#0E1F1C]">
              ভূমি উন্নয়ন কর
            </p>
            <div className="flex justify-center items-center">
              <div className="w-[50%]">
                <Suspense fallback={<p>Loading...</p>}>
                  <DonutChart data={chartData} />
                </Suspense>
              </div>
            </div>
            {/* <p className="text-15 leading-[15.17px] text-primary">
              সর্বশেষ কর পরিশোধের সাল: ২০০৯
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
