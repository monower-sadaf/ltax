"use client";
import "../../../public/assets/css/print.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";
import {
  en2bn,
  convertEnglishDateToBangla,
  numberToBanglaWords,
  dDate,
  newDakhilaRowDatas,
} from "@/halpers/helper";
// import LandScheduleTable from "./LandScheduleTable";
// import OwnerTable from "./OwnerTable";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { Tiro_Bangla } from "next/font/google";

export const tiroBangla = Tiro_Bangla({
    subsets: ["bengali"],
    display: "swap",
    weight: ["400"],
});

const NewDakhilaDetails = (req) => {

    const route = useRouter();

    let InfoDataTable = '';

    const [allData, setAllData] = useState([]);
    const [btnStatus, setBtnStatus] = useState(0);
    const [dakhilaInfo, setDakhilaInfo] = useState({});

    const id = req?.data[0];

    const cookies = parseCookies();
    const citizenData = cookies.citizen;

    let citizen = "";
    
    let panelurl = cookies.citizen != '' || cookies.citizen != null ? 'citizen' : 'organization';

    console.log('Url : ',panelurl);

    const token = getTokenFromCookie();

    const headersOption = {
        Authorization: token,
        "content-type": "application/json",
    };

    let total_land = parseFloat(0);
    let dabi = 0;
    let due = 0;

    let kalpurush = "'kalpurush'" ;
    

    useEffect(() => {
       citizen = JSON.parse(sessionStorage.getItem('organization'));
       if(!citizen) citizen = JSON.parse(sessionStorage.getItem('citizen'));
        async function DakhilaDetails() {
            const { data } = await axios.post(
              process.env.PAYMENT_BASE_URL + "/dakhila/dakhilaPrint",
              { id: id },
              { headers: headersOption }
            );
            setAllData(data.url);
            let dakhila_data =
            window != undefined ? JSON.parse(data?.url?.dakhila_info) : {};
            setDakhilaInfo(dakhila_data);
        }
        DakhilaDetails();
    }, []);

    let khotian_no = "";
    let amount_of_land = 0.0;
  
    let sl = 0;
    let pageNo = 0;
    let landSum = 0;
    let land_schedulesTable = "";
  
    let className = "className";
    let pageWidth = "7.9in";
    const [tp, setTp] = useState(0);

    let rowDatas = 0;

    let tax_clear_year = "";

    if (dakhilaInfo?.land_schedules?.length > 0) {
      // let khotianitemArr = [];
      // dakhilaInfo?.land_schedules?.map((item, index) => {
      //   if (dakhilaInfo?.land_schedules?.length > 1) {
      //     khotian_no += ", " + en2bn(item?.khotian_no);
      //   } else {
      //     khotian_no += " " + en2bn(item?.khotian_no);
      //   }
      //   khotianitemArr.push(en2bn(item?.khotian_no));
      // });

      // khotianitemArr = [...new Set(khotianitemArr)];
      // let separator = ",";
      // // // need to be unique array
      // khotian_no = khotianitemArr.join(separator);

      let totalData = dakhilaInfo?.land_schedules?.length; 
      let totalOwners = dakhilaInfo?.ownerInfo?.length > 0 ? dakhilaInfo?.ownerInfo?.length : 0;
      let totalDags = dakhilaInfo?.land_schedules?.length > 0 ? dakhilaInfo?.land_schedules?.length : 0;

      let firstPageMaxData = 70;  //2Col's & 39Row's
      let firstPageBreakMinRow = 60;  //2Col's & 24Row's
      let middlePageMaxData = 94; //2Col's & 48Row's
      let lastPageMaxData = 60; //2Col's & 34Row's
      let maxColumn = 2;  //Max Table in per page

      rowDatas = newDakhilaRowDatas(totalOwners,totalDags,firstPageMaxData,firstPageBreakMinRow,middlePageMaxData,lastPageMaxData,maxColumn);

      let totalPages         = rowDatas?.totalPages;
      let firstPageOData     = rowDatas?.firstPageOData;
      let firstPageDData     = rowDatas?.firstPageDData;
      let middleOPage        = rowDatas?.middleOPage;
      let middlePageOData    = rowDatas?.middlePageOData;
      let middleDPage        = rowDatas?.middleDPage;
      let middlePageDData    = rowDatas?.middlePageDData;
      let joinPageOData      = rowDatas?.joinPageOData;
      let joinPageDData      = rowDatas?.joinPageDData;
      let lastPageOData      = rowDatas?.lastPageOData;
      let lastPageDData      = rowDatas?.lastPageDData;
      let joinPage           = rowDatas?.joinPage;
      let oColumn            = rowDatas?.oColumn;
      let dColumn            = rowDatas?.dColumn;

      if (allData?.tax_clear_year1 == allData?.tax_clear_year2) {
        tax_clear_year = en2bn(parseInt(allData?.tax_clear_year1) - 593);
      } else {
        tax_clear_year =
          en2bn(parseInt(allData?.tax_clear_year1) - 593) +
          " - " +
          en2bn(parseInt(allData?.tax_clear_year2) - 593);
      }

      let thisTableRow  = 0;
      let float = '';
      let oSirial = 0 ;
      let dSirial = 0 ;

      let dagsTitleSts = null;
      let dagsTitle = '</div><div class="flex flex-column mt-2 table" style="width:100%">'
      +'<p style="font-weight: bold; font-size: 12px; text-align: center; margin: 0px; padding: 0px;"><u>জমির বিবরণ</u></p></div><div class="flex flex-column mt-2" style="width:100%">';
      
      InfoDataTable += '<div class="from-controll">'
        +'<p style="font-weight: bold; font-size: 12px; text-align: center; margin: 0px; padding: 0px;"><u>মালিকের বিবরণ</u></p>';
    
      if(firstPageOData != 0 || firstPageDData != 0) {
        let width = 100;
        if(oColumn != 1){
            width = 49;
        }

        for(let fi = 1; fi <= oColumn; fi++) {
            float = (fi % 2 == 0) ? 'right' : 'left' ;
            thisTableRow = (fi == 1) ? Math.ceil(firstPageOData/oColumn) : (firstPageOData-thisTableRow);

            InfoDataTable += "<table class='my-4 my-2' style='border:1px dotted #000; border-collapse: collapse;  width:"+width+"%; float:"+float+"'>"
            +"<thead>"
            +"<tr>"
                +"<th class='b1' style='width:10%;text-align:center;'>ক্রমঃ</th>"
                +"<th class='b1' style='width:10%;text-align:center;'>মালিকের নাম</th>"
                +"<th class='b1' style='width:10%;text-align:center;'>মালিকের অংশ</th>"
            +"</tr>"
            +"</thead>"
            +"<tbody style='height:"+thisTableRow * 21+"px'>";

            for(let i = 0; i < thisTableRow; i++){
                
                if (
                    dakhilaInfo?.ownerInfo[oSirial]?.name == undefined ||
                    dakhilaInfo?.ownerInfo[oSirial]?.land_portion == undefined
                  ) {
                    continue;
                  }
                
                InfoDataTable += "<tr>"
                    +"<td class='b1'>"+en2bn(parseInt(oSirial)+1)+"</td>"
                    +"<td class='b1'>"+dakhilaInfo?.ownerInfo[oSirial]?.name+"</td>"
                    +"<td class='b1'>"+en2bn(parseFloat(dakhilaInfo?.ownerInfo[oSirial]?.land_portion))+"</td>"
                +"</tr>";
                oSirial++;
            }
            
            InfoDataTable += "</tbody>"
            +"</table>";
        }

        if(firstPageDData != 0) {
          width = 100;
          if(dColumn != 1) {
            width = 49;
          }

          for(let fi = 1; fi <= dColumn; fi++) {
            float = 'left';
            if(fi%2 == 0) {
              float = 'right';
            }
            if(fi == 1) {
              thisTableRow = Math.ceil(firstPageDData/dColumn);
              if(dagsTitleSts == '' || dagsTitleSts == null) {
                InfoDataTable += dagsTitle;
                dagsTitleSts = 1 ;
              }
            } else {
              thisTableRow = firstPageDData - thisTableRow;
            }
            InfoDataTable += '<table style="border: 1px dotted; border-collapse: collapse; margin:10px 2px ; width: '+width+'%; font-size: 11px; float: '+float+'">'
              +'<thead>'
                  +'<tr>'
                      +'<th class="b1">ক্রমঃ</th>'
                      +'<th class="b1">দাগ নং</th>'
                      +'<th class="b1">জমির শ্রেণী</th>'
                      +'<th class="b1">জমির পরিমাণ (শতক)</th>'
                  +'</tr>'
              +'</thead>'
              +'<tbody style="height: '+thisTableRow * 21+'px;">';
              for(let i = 0; i < thisTableRow ; i++) {
                let landSum = 0.00 ;
                landSum += parseFloat(dakhilaInfo?.land_schedules[dSirial]?.amount_of_land);
                InfoDataTable += '<tr>'
                    +'<td class="b1 input_bangla">'+en2bn(parseInt(dSirial)+1)+'</td>'
                    +'<td class="b1 input_bangla">'+ en2bn(dakhilaInfo?.land_schedules[dSirial]?.dag_no)+'</td>'
                    +'<td class="b1">'+ dakhilaInfo?.land_schedules[dSirial]?.land_type+'('; 
                    let double = 0; 
                    
                    for (let key in dakhilaInfo?.land_schedules[dSirial]?.useable_land_type) {
                          InfoDataTable += double == 0 ? '' : ', '
                          InfoDataTable += dakhilaInfo?.land_schedules[dSirial]?.useable_land_type[key];
                          double++
                        } 
                        InfoDataTable +=  ')'
                    +'</td>'
                    +'<td class="b1 input_bangla">'+en2bn(parseFloat(dakhilaInfo?.land_schedules[dSirial]["amount_of_land"]))+'</td>'
                +'</tr>';
                dSirial++;
              }
              InfoDataTable +=  '</tbody>'
              InfoDataTable +='</table>'
          }
        }
          
        if(totalPages != 1){ 
            InfoDataTable +=  '</div>';
                +'</div>'
                +'<div class="row">'
                    +'<div class="col-md-12 text-right" style="width: 100%; position: absolute; bottom: 0; right: 0;">'
                        +'<div style="width: 100%; border-top: 1px dotted gray; margin-top:15px; margin: 10px 0px 5px 0px;"></div>'
                        +'<div class="from-controll">'+ ++pageNo+'"/"'+totalPages+'</div>'
                    +'</div>'
                +'</div>'
            '</div>'
            '<div class="row" style="page-break-after: always !important;"></div>'
            '<div style="font-family: '+kalpurush+', Arial,sans-serif;font-size: 14px !important; color: #333; background-color: #fff; width: '+pageWidth+'; height: 11in; border-radius: 10px; border: dotted 1px; padding: 10px; float: left; margin: 30px auto; position: relative;">'
                '<div class="row">'
                    '<div class="col-md-12">';
        }

      }

      if(middleOPage) {
        width = 49;
        for(let midPage = 1; midPage <= middleOPage; midPage++){
          if(midPage == middleOPage) {
            thisPageRow = middlePageOData % middlePageMaxData ;
            thisPageRow = thisPageRow != 0 ? thisPageRow : middlePageMaxData ;
          }else{
            thisPageRow = middlePageMaxData ;
          }
          maxTableRow = Math.ceil(thisPageRow/oColumn);
          for(let mi = 1; mi <= oColumn; mi++) {
              width = 100;
              float = (mi % 2 == 0) ? 'right' : 'left' ;
              let firstTableRow = (mi == oColumn) ? (thisPageRow-1) % $maxTableRow : (maxTableRow-1);

              let width = 100;

              if(oColumn != 1){
                  width = 49;
              }

              InfoDataTable += "<table class='my-4 my-2' style='border:1px dotted #000; border-collapse: collapse;  width:"+width+"%; float:"+float+"'>"
              +"<thead>"
              +"<tr>"
                  +"<th class='b1' style='width:10%;text-align:center;'>ক্রমঃ</th>"
                  +"<th class='b1' style='width:10%;text-align:center;'>মালিকের নাম</th>"
                  +"<th class='b1' style='width:10%;text-align:center;'>মালিকের অংশ</th>"
              +"</tr>"
              +"</thead>"
              +"<tbody style='height:"+firstTableRow * 21+"px'>";

              for(let i = 0; i < firstTableRow; i++){

                landSum +=$dakhilaInfo?.land_schedules[dSirial]?.amount_of_land;

                  if (
                      owner[oSirial]?.name == undefined ||
                      owner[oSirial]?.land_portion == undefined
                  ) {
                      continue;
                  }
                  
                  InfoDataTable += "<tr>"
                      +"<td class='b1'>"+en2bn(parseInt(oSirial)+1)+"</td>"
                      +"<td class='b1'>"+owner[oSirial]?.name+"</td>"
                      +"<td class='b1'>"+en2bn(parseFloat(owner[oSirial]?.land_portion))+"</td>"
                  +"</tr>";
                  oSirial++;
              }

              InfoDataTable += "</tbody>"
              +"</table>" ;
          }

          InfoDataTable += "</div>"
                +"</div>";
        }
        InfoDataTable +='<div class="row">'
                    +'<div class="col-md-12 text-right" style="width: 100%; position: absolute; bottom: 0; right: 0;">'
                        +'<div style="width: 100%; border-top: 1px dotted gray; margin-top:15px; margin: 10px 0px 5px 0px;"></div>'
                        +'<div class="from-controll">'+ ++pageNo+'"/"'+totalPages+'</div>'
                    +'</div>'
                +'</div>'
            +'</div>'
            +'<div class="row" style="page-break-after: always !important;"></div>'
            +'<div style="font-family: '+kalpurush+', Arial,sans-serif;font-size: 14px !important; color: #333; background-color: #fff; width: '+pageWidth+'; height: 11in; border-radius: 10px; border: dotted 1px; padding: 10px; float: left; margin: 30px auto; position: relative;">'
                +'<div class="row">'
                    +'<div class="col-md-12">';
      }

      if(joinPageOData != 0 || joinPageDData != 0) {
        if(joinPageOData != 0) {
          width = 100;
          if(oColumn != 1){
              width = 49;
          }

          for(let fi = 1; fi <= oColumn; fi++) {
            float = (fi % 2 == 0) ? 'right' : 'left' ;
            thisTableRow = (fi == 1) ? Math.ceil(joinPageOData/oColumn) : (joinPageOData-thisTableRow);

            InfoDataTable += "<table class='my-4 my-2' style='border:1px dotted #000; border-collapse: collapse;  width:"+width+"%; float:"+float+"'>"
                +"<thead>"
                +"<tr>"
                    +"<th class='b1' style='width:10%;text-align:center;'>ক্রমঃ</th>"
                    +"<th class='b1' style='width:10%;text-align:center;'>মালিকের নাম</th>"
                    +"<th class='b1' style='width:10%;text-align:center;'>মালিকের অংশ</th>"
                +"</tr>"
                +"</thead>"
                +"<tbody style='height:"+thisTableRow * 21+"px'>";

              for(let i = 0; i < thisTableRow; i++){
              
                  if (
                      owner[oSirial]?.name == undefined ||
                      owner[oSirial]?.land_portion == undefined
                  ) {
                      continue;
                  }
                  
                  InfoDataTable += "<tr>"
                      +"<td class='b1'>"+en2bn(parseInt(oSirial)+1)+"</td>"
                      +"<td class='b1'>"+owner[oSirial]?.name+"</td>"
                      +"<td class='b1'>"+en2bn(parseFloat(owner[oSirial]?.land_portion))+"</td>"
                  +"</tr>";
                  oSirial++;
              }
              InfoDataTable += "</tbody>"
              +"</table>";
          }
          if(totalPages != 1){ 
            InfoDataTable +=  '</div>';
                +'</div>'
                +'<div class="row">'
                    +'<div class="col-md-12 text-right" style="width: 100%; position: absolute; bottom: 0; right: 0;">'
                        +'<div style="width: 100%; border-top: 1px dotted gray; margin-top:15px; margin: 10px 0px 5px 0px;"></div>'
                        +'<div class="from-controll">'+ ++pageNo+'"/"'+totalPages+'</div>'
                    +'</div>'
                +'</div>'
            '</div>'
            '<div class="row" style="page-break-after: always !important;"></div>'
            '<div style="font-family: '+kalpurush+', Arial,sans-serif;font-size: 14px !important; color: #333; background-color: #fff; width: '+pageWidth+'; height: 11in; border-radius: 10px; border: dotted 1px; padding: 10px; float: left; margin: 30px auto; position: relative;">'
                '<div class="row">'
                    '<div class="col-md-12">';
          }
        }
      }
    
    }
  
    const printPdf = (e) => {
      e.preventDefault();
  
      const printContents = document.getElementById("pdf").innerHTML;
      let originalContents = document.body.innerHTML;
  
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
  
      if (window != undefined) {
        window.location.reload(true);
      }
    };
  
    const pageBreak = '<div style="page-break-after: always;"></div>';

    return (
      <>
        <div id="pdf" className="flex" style={{ width: 7.9 + "inch" }}>
          {/* <div className="bg-white border border-dashed border-gray-500 rounded-md mb-4 text-13 leading-5" style={{}}> */}
          <div className="pdfprint">
            <div className="p-4 overflow-x-auto">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p>বাংলাদেশ ফরম নং ১০৭৭</p>
                  <p>(সংশোধিত)</p>
                </div>
                <div className="flex flex-col items-end">
                  <p>(পরিশিষ্ট: ৩৮)</p>
                  <p>
                    ক্রমিক নং {allData?.dakhila_no && en2bn(allData?.dakhila_no)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center pb-4">
                <p>ভূমি উন্নয়ন কর পরিশোধ রশিদ</p>
                <p>(অনুচ্ছেদ ৩৯২ দ্রষ্টব্য)</p>
              </div>
              <div className="flex flex-col space-y-2 pb-4">
                <div className="flex">
                  <p className="w-[50%]">
                    সিটি কর্পোরেশন / পৌর/ইউনিয়ন ভূমি অফিসের নাম :
                  </p>
                  <p className="border-gray-500 border-b border-dashed w-[50%]">
                    {dakhilaInfo?.ofc_name}
                  </p>
                </div>
                <div className="flex w-full space-x-2 justify-between">
                  <div className="flex space-x-2 justify-between items-center w-[40%]">
                    <p className="w-[45%]">মৌজার ও জে. এল. নং:</p>
                    <p className="border-gray-500 border-b border-dashed w-[55%]">
                      {dakhilaInfo?.mouja_name && en2bn(dakhilaInfo?.mouja_name)}
                    </p>
                  </div>
                  <div className="flex space-x-2 justify-between items-center w-[37%]">
                    <p className="w-[36%]">উপজেলা / থানা : </p>
                    <p className="border-gray-500 border-b border-dashed w-[64%]">
                      {dakhilaInfo?.upz_name}
                    </p>
                  </div>
                  <div className="flex space-x-2 justify-between items-center w-[23%]">
                    <p className="w-[25%]">জেলা:</p>
                    <p className="border-gray-500 border-b border-dashed w-[75%]">
                      {dakhilaInfo?.dis_name}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <p className="w-[28%]">
                    ২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর :{" "}
                  </p>
                  <p className="w-[72%] border-gray-500 border-b border-dashed">
                    {dakhilaInfo?.holding_no && en2bn(dakhilaInfo?.holding_no)}
                  </p>
                </div>
                <table className="w-full mt-2">
                  <tr>
                    <td className="w-[75px]">খতিয়ান নং:</td>
                    <td className="pl-[10px] border-gray-500 border-b border-dashed">
                      {dakhilaInfo?.khotian_no && en2bn(dakhilaInfo?.khotian_no)}
                    </td>
                  </tr>
                </table>
              </div>

              <div className="h-[10px]"></div>

              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: InfoDataTable }}
              />

              <div
                className={
                  `bg-[#FFFF] text-[#333] text-[14px]  border-black border-dotted rounded-md float-left m-5 m-auto p-2 w-[${pageWidth}]`
                }
              >
                <div class="grid grid-flow-row ">
                  <div class="col-span">
                    <table className="w-full mb-4 text-13 leading-5">
                      <thead className="w-full">
                        <tr className="border border-gray-500 p-3 text-center">
                          <th colSpan={8}><span>আদায়ের বিবরণ</span></th>
                        </tr>
                        <tr className="">
                          <th className="border border-gray-500 p-3">
                            তিন বৎসরের ঊর্ধ্বের বকেয়া
                          </th>
                          <th className="border border-gray-500 p-3">
                            গত তিন বৎসরের বকেয়া
                          </th>
                          <th className="border border-gray-500 p-3">
                            বকেয়ার সুদ ও ক্ষতিপূরণ
                          </th>
                          <th className="border border-gray-500 p-3">হাল দাবি</th>
                          <th className="border border-gray-500 p-3">মোট দাবি</th>
                          <th className="border border-gray-500 p-3">মোট আদায়</th>
                          <th className="border border-gray-500 p-3">
                            মোট বকেয়া
                          </th>
                          <th className="border border-gray-500 p-3">মন্তব্য</th>
                        </tr>
                      </thead>
                      <tbody className="w-full text-center">
                        <tr className="border border-gray-500">
                          <td className="border border-gray-500 p-3">
                            {en2bn(parseFloat(allData?.before_third_year_due))}
                          </td>
                          <td className="border border-gray-500 p-3">
                            {
                              allData?.current_due == null
                                ? en2bn(
                                    0 +
                                      parseFloat(allData?.second_year_due) +
                                      parseFloat(allData?.third_year_due)
                                  )
                                : en2bn(
                                    parseFloat(allData?.third_year_due) +
                                      parseFloat(allData?.second_year_due) +
                                      parseFloat(allData?.current_due)
                                  )
                              // parseFloat(allData?.second_year_due)
                              // parseFloat(allData?.current_due),
                              // en2bn(parseFloat(allData?.third_year_due)+parseFloat(allData?.second_year_due)+parseFloat(allData?.current_due))
                            }
                          </td>
                          <td className="border border-gray-500 p-3">
                            {en2bn(parseFloat(allData?.due_interest))}
                          </td>
                          <td className="border border-gray-500 p-3">
                            {en2bn(parseFloat(allData?.current_years_amount))}
                          </td>
                          <td className="border border-gray-500 p-3">
                            {
                              (dabi = en2bn(
                                parseFloat(allData?.before_third_year_due) +
                                  parseFloat(allData?.third_year_due) +
                                  parseFloat(allData?.second_year_due) +
                                  parseFloat(allData?.previous_year_due) +
                                  parseFloat(allData?.due_interest) +
                                  parseFloat(allData?.current_years_amount)
                              ))
                            }
                          </td>
                          <td className="border border-gray-500 p-3">
                            {en2bn(parseFloat(allData?.total_collection))}
                          </td>
                          <td className="border border-gray-500 p-3">
                            {en2bn(
                              parseFloat(
                                parseFloat(allData?.before_third_year_due) +
                                  parseFloat(allData?.third_year_due) +
                                  parseFloat(allData?.second_year_due) +
                                  parseFloat(allData?.previous_year_due) +
                                  parseFloat(allData?.due_interest) +
                                  parseFloat(allData?.current_years_amount)
                              ) - parseFloat(allData?.total_collection)
                            )}
                          </td>
                          <td className="border border-gray-500 p-3"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <p className="border-b border-gray-500 border-dashed">
                সর্বমোট (কথায়):{" "}
                {numberToBanglaWords(parseFloat(allData?.total_collection))} টাকা
                মাত্র ।
              </p>

              <div className="border-b border-dashed border-gray-500 min-w-full flex justify-between py-5">
                <div className="flex flex-col space-y-3">
                  {/* <p>নোট: সর্বশেষ কর পরিশোধের সাল - {tax_clear_year}</p> */}
                  <p>
                    চালান নং :{" "}
                    {allData?.challan_no ? en2bn(allData?.challan_no) : ""}
                  </p>
                  <div className="flex items-center">
                    <div>তারিখ : </div>
                    <div className="ml-2 text-center">
                      <div className="border-b">
                        {dDate(allData?.dakhila_date)}
                      </div>
                      <div>
                        {convertEnglishDateToBangla(allData?.dakhila_date)}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <QRCodeSVG
                    value={`${process.env.LDTAX_PORTAL_BASE}/${panelurl}/dakhila/${id}`}
                    size="80"
                    fgColor="#000"
                  />
                </div>
                <div>
                  <p className="text-center">
                    এই দাখিলা ইলেক্ট্রনিকভাবে তৈরি হয়েছে, <br /> কোনো স্বাক্ষর
                    প্রয়োজন নেই।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="m-2 m-auto table">
          <button
            onClick={(e) => printPdf(e)}
            className="bg-green-700 border border-green-700 text-white hover:bg-white hover:text-green-700 px-5 py-2 rounded-md"
          >
            প্রিন্ট করুন
          </button>
        </div>
      </>
    )
}

export default NewDakhilaDetails