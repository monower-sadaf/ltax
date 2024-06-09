import AddBanglaCalendar from "@/app/_utils/banglaCalenderUtils";
import { GetDistricts } from "@/app/_api/api";

const englishMonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
const banglaMonthNames = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];

export const number_check = (number) => {

    var first_one = number.slice(0, 1);
    var first_two = number.slice(0, 2);
    var three_number_position = number.slice(2, 3);

    if (number.length > 2 || number.length > 3) {
        if (three_number_position == 0 || three_number_position == 1 || three_number_position == 2) {
            return false;
        }
        if (first_two != '01') {
            return false;
        }

        if (first_one != '0') {
            return false;
        }
    }

    return true;
}

export const ls = (key, val) => {
    localStorage.setItem(key, val)
    return true;
}

export function public_image_path(file_name){
    return `../../assets/images/`+file_name;
    
}

export function relative_image_path(file_name){
    return `/assets/images/`+file_name;
}

export function relative_file_path(file_name){
    return `/assets/files/`+file_name;
}

export const useDivision = (id=null) =>{
  const data = [
    {
      id: 1,
      name_bn: "বরিশাল",
    },
    {
      id: 2,
      name_bn: "চট্টগ্রাম",
    },
    {
      id: 3,
      name_bn: "ঢাকা",
    },
    {
      id: 4,
      name_bn: "খুলনা",
    },
    {
      id: 5,
      name_bn: "রাজশাহী",
    },
    {
      id: 6,
      name_bn: "রংপূর",
    },
    {
      id: 7,
      name_bn: "সিলেট",
    },
    {
      id: 8,
      name_bn: "ময়মনসিংহ",
    },
  ];
  if(id){
    return data[id-1].name_bn;
  }else{
    return data;
  }
}

export function convertArrayToObj (parsedData){
    const citizen_data = [parsedData]?.data?.reduce((acc, item) => {
        acc['data'] = item;
        return acc;
    }, {});

    return citizen_data;
}

export function capitalize(str) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase()+lower.slice(1);
} 

export function en2bn(englishNumber) {
    const englishToBanglaMap = {
        '0': '০',
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯',
    };

    if(englishNumber == ' ' || englishNumber == null || englishNumber == undefined) {
      englishNumber = 0;
    }else {
      englishNumber = englishNumber;
    }
    
    const convertedNumber = englishNumber.toString()
          .split('')
          .map((digit) => englishToBanglaMap[digit] || digit)
          .join('');
    
    return convertedNumber;
}

export function bn2en(englishNumber) {
  const englishToBanglaMap = {
      '০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9',
  };

  if(englishNumber == ' ' || englishNumber == null || englishNumber == undefined) {
    englishNumber = 0;
  }else {
    englishNumber = englishNumber;
  }

  const convertedNumber = englishNumber.toString()
      .split('')
      .map((digit) => englishToBanglaMap[digit] || digit)
      .join('');

  return convertedNumber;
}

export function passwordStrengthChecker (password) {
    // Check the length of the password.
    let message = {};
    const passwordLength = password.length;
    if (passwordLength < 8) {
        message = {
            'status': false,
            'message': 'The password must be at least 8 characters long.',
            'color': '#CF0000'
        }
        return message;
    }
  
    // Check for uppercase letters.
    const hasUppercaseLetter = /[A-Z]/.test(password);
    if (!hasUppercaseLetter) {
        message = {
            'status': false,
            'message': 'The password must contain at least one uppercase letter.',
            'color': '#CF0000'
        }
        return message;
    }
  
    // Check for lowercase letters.
    const hasLowercaseLetter = /[a-z]/.test(password);
    if (!hasLowercaseLetter) {
        message = {
            'status': false,
            'message': 'The password must contain at least one lowercase letter.',
            'color': '#CF0000'
        }
        return message;
    }
  
    // Check for numbers.
    const hasNumber = /[0-9]/.test(password);
    if (!hasNumber) {
        message = {
            'status': false,
            'message': 'The password must contain at least one number.',
            'color': '#CF0000'
        }
        return message;
    }
  
    // Check for special characters.
    const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);
    if (!hasSpecialCharacter) {
        message = {
            'status': false,
            'message': 'The password must contain at least one special character.',
            'color': '#CF0000'
        }
        return message;
    }
  
    // The password is strong!
    message = {
        'status': true,
        'message': 'The password is strong.',
        'color': '#198754'
    }

    return message;
  };

// convert date to local date format
export function formatdate(date) {
    return new Date(date).toLocaleDateString();
}

// string, splice length, separator
export function formatStringForDate(data=null,length,separator=null){
    let formatedData = data.slice(0,length);
    return formatedData;
}

const numberToBanglaWords = (function() {
    const units = [
      "শূন্য", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়", "দশ",
      "এগারো", "বারো", "তেরো", "চৌদ্দ", "পনেরো", "ষোল", "সতেরো", "আঠারো", "ঊনিশ"
    ];
  
    const tens = [
      "", "", "বিশ", "ত্রিশ", "চল্লিশ", "পঁয়তাল্লিশ", "ষাট", "সত্তর", "আশি", "নব্বই"
    ];
  
    const chunkNames = ["", " হাজার", " লক্ষ", " কোটি", " অবক", " নিয়োগ"];
  
    function convertLessThanOneThousand(number) {
      if (number === 0) {
        return "";
      }
  
      if (number < 20) {
        return units[number];
      }
  
      if (number < 100) {
        return tens[Math.floor(number / 10)] + (number % 10 !== 0 ? " " + units[number % 10] : "");
      }
  
      return units[Math.floor(number / 100)] + " শত" + (number % 100 !== 0 ? " " + convertLessThanOneThousand(number % 100) : "");
    }
  
    return function(number) {
      if (number === 0) {
        return units[number];
      }
  
      const parts = [];
      let chunkIndex = 0;
  
      while (number > 0) {
        const chunk = number % 1000;
        if (chunk !== 0) {
          parts.unshift(convertLessThanOneThousand(chunk) + chunkNames[chunkIndex]);
        }
        number = Math.floor(number / 1000);
        chunkIndex++;
      }
  
      return parts.join(" ");
    };
  })();
  
//   const number = 12598;
//   const banglaWords = numberToBanglaWords(number);
//   console.log(banglaWords); // Output: "বারো হাজার পাঁচ শত নয়সহস্র নয়টি"

const numberToEnglishWords = (function() {
    const units = [
      "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
      "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
  
    const tens = [
      "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];
  
    function convertLessThanOneThousand(number) {
      if (number === 0) {
        return "";
      }
  
      if (number < 20) {
        return units[number];
      }
  
      if (number < 100) {
        return tens[Math.floor(number / 10)] + (number % 10 !== 0 ? " " + units[number % 10] : "");
      }
  
      return units[Math.floor(number / 100)] + " Hundred" + (number % 100 !== 0 ? " and " + convertLessThanOneThousand(number % 100) : "");
    }
  
    return function(number) {
      if (number === 0) {
        return "Zero";
      }
  
      const parts = [];
      const chunkNames = ["", " Thousand", " Million", " Billion", " Trillion"];
      let chunkIndex = 0;
  
      while (number > 0) {
        const chunk = number % 1000;
        if (chunk !== 0) {
          parts.unshift(convertLessThanOneThousand(chunk) + chunkNames[chunkIndex]);
        }
        number = Math.floor(number / 1000);
        chunkIndex++;
      }
  
      return parts.join(" ");
    };
  })();
  
//   const number = 12598;
//   const words = numberToWords(number);
//   console.log(words); // Output: "Twelve Thousand Five Hundred Ninety-Eight"


  
const convertEnglishDateToBangla = ($d) => {
    const date = new Date($d);
  
    const options = { weekday: 'long', locale: 'bn-BD' };
    const dayNameInBangla = date.toLocaleDateString('bn-BD', options);
    const englishDay = date.getDate();
    const englishMonth = date.getMonth();
    const englishYear = date.getFullYear();
  
    const banglaDay = englishDay; // In most cases, the day remains the same
    const banglaMonth = banglaMonthNames[englishMonth];
    // const banglaYear = (englishYear - 593) // Assuming the English year 2023 is 1430 in Bangla year
    const banglaYear = (englishYear)
    return `${en2bn(banglaDay)} ${banglaMonth}, ${en2bn(banglaYear)}`;
};

const dateName = ($d) => {
  const date = new Date($d);
  const options = { weekday: 'long', locale: 'bn-BD' };
  const dayNameInBangla = date.toLocaleDateString('bn-BD', options);
  return `${dayNameInBangla}`;
}
  
//   const englishDate = "2023-08-31"; // Example English date
//   const banglaDate = convertEnglishDateToBangla(englishDate);
//   console.log(banglaDate); // Output: "31 আগস্ট, ১৪৩০"



export {dateName,numberToBanglaWords,numberToEnglishWords,convertEnglishDateToBangla}

export function dDate ($d) {
  const myDate = AddBanglaCalendar(new Date($d));
  let banglaMonth = myDate.banglaMonth; // জ্যৈষ্ঠ   
  let banglaYear = myDate.banglaYear;   // ১৪২৯    
  let banglaDate = myDate.banglaDate;   // ২৩   
  let banglaCalendar = myDate.bangla;   // {month:1, year:1429, date: 23};   
  let dDate = `${banglaDate}, ${banglaMonth} ${banglaYear}`;
  return dDate;
};


export function dakhilaRowDatas(totalData,firstPageMaxData,middlePageMaxData,lastPageMaxData,maxColumn,firstPageBreakMinRow){
    let firstPageRow = 0;
    let middlePageRow = 0;
    let lastPageRow = 0 ;
    let middlePages = 0;
    let totalPages = 1;

    let firstTableMinRow = firstPageBreakMinRow/maxColumn;//24
    let firstTableMaxRow = firstPageMaxData/maxColumn;//35
    let middleTableMaxRow = middlePageMaxData/maxColumn;//35
    let lastTableMaxRow = lastPageMaxData/maxColumn;//20

    if(totalData <= firstPageMaxData){

      firstPageRow = totalData;

      if(totalData > firstPageBreakMinRow){
        totalPages++;
      }

      middlePageRow = lastPageRow = 0;

    }else if(totalData <= (firstPageMaxData+lastPageMaxData)){

      firstPageRow = firstPageMaxData;
      middlePageRow = 0;
      lastPageRow = totalData-firstPageMaxData;
      totalPages++;

    }else if(totalData > (firstPageMaxData+lastPageMaxData)){

      firstPageRow = firstPageMaxData;
      middlePages = Math.floor((totalData-firstPageMaxData)/middlePageMaxData);
      middlePageRow = middlePages * middlePageMaxData;
      lastPageRow = (totalData-firstPageMaxData) - middlePageRow;

      if(lastPageRow > lastPageMaxData){
        middlePages++;
        middlePageRow += lastPageRow;
        lastPageRow = 0;
      }

      totalPages += middlePages+1;// 1page add for last page
    }

    return [{
      'firstPageRow'     : firstPageRow,
      'middlePageRow'    : middlePageRow,
      'middlePages'      : middlePages,
      'totalPages'       : totalPages,
      'lastPageRow'      : lastPageRow,
      'firstTableMinRow' : firstTableMinRow,
      'firstTableMaxRow' : firstTableMaxRow,
      'middleTableMaxRow': middleTableMaxRow,
      'lastTableMaxRow'  : lastTableMaxRow
    }];
}

export function newDakhilaRowDatas(totalOwners,totalDags,firstPageMaxData,firstPageBreakMinRow,middlePageMaxData,lastPageMaxData,maxColumn){
  let oColumn = 1;
  let dColumn = 1;
  let totalPages = 1;
  let firstPageOData = 0; 
  let firstPageDData = 0; 
  let middleOPage = 0; 
  let middlePageOData = 0; 
  let middleDPage = 0; 
  let middlePageDData = 0; 
  let joinPageOData = 0; 
  let joinPageDData= 0; 
  let lastPageOData = 0; 
  let lastPageDData = 0; 
  let joinPage = 0;

  let data = [];

  let totalData = totalOwners+totalDags;

  if(totalOwners > 1){oColumn = 2;}
  if(totalDags > 1){dColumn = 2;}

  let firstTableMinRow = firstPageBreakMinRow/maxColumn;//24
  let firstTableMaxRow = firstPageMaxData/maxColumn;//35
  let middleTableMaxRow = middlePageMaxData/maxColumn;//35
  let lastTableMaxRow = lastPageMaxData/maxColumn;//20

  if(totalData <= firstPageMaxData){
      firstPageOData = totalOwners;
      firstPageDData = totalDags;

      if(totalData > firstPageBreakMinRow){
        totalPages++;
      }
  }else if(totalData <= (firstPageMaxData+lastPageMaxData)){
      if(totalOwners > $firstPageMaxData){
          firstPageOData = firstPageMaxData;
          lastPageOData = totalOwners-firstPageMaxData;
          lastPageDData = totalDags;
      }else{
          firstPageOData = totalOwners;
          firstPageDData = firstPageMaxData-totalOwners;
          lastPageDData = totalDags-firstPageDData;
      }
      totalPages++;
  }else if(totalData > (firstPageMaxData+lastPageMaxData)){
      if(totalOwners > firstPageMaxData){
          firstPageOData = firstPageMaxData;
          totalOwners -= firstPageMaxData;
          // $middleOPage = ceil($totalOwners/$middlePageMaxData);
          middleOPage = floor(totalOwners/middlePageMaxData);
          middlePageOData = middleOPage*middlePageMaxData;
          totalOwners -= middlePageOData;

          if(totalOwners > firstPageMaxData){
              middleOPage++;
              middlePageOData += totalOwners;
          }else{// if less then  the $firstPageMaxData then Join page with Dag data
              let joinPage = 1;
              let joinPageOData = totalOwners;
              let joinPageDData = middlePageMaxData - totalOwners - 10; // (-)4 for the head of the Dags
              joinPageDData = ceil(joinPageDData/2)*2;

              $totalDags -= $joinPageDData;
          }
      }else{
          firstPageOData = totalOwners;
          firstPageDData = firstPageMaxData-totalOwners;
          totalDags -= firstPageDData;
      }

      if(totalDags > lastPageMaxData){
          middleDPage = floor(totalDags/middlePageMaxData);
          middlePageDData = middleDPage*middlePageMaxData;

          totalDags -= middlePageDData;
          if(totalDags > lastPageMaxData){
              middleDPage++;
              middlePageDData += totalDags;
          }else{
              lastPageDData = totalDags;
          }
      }else{
          lastPageDData = totalDags;
      }

      totalPages = totalPages+middleOPage+middleDPage+joinPage+1;// 1page add for last page
  }

  data =  {
      'totalPages'     : totalPages,
      'firstPageOData' : firstPageOData,
      'firstPageDData' : firstPageDData,
      'middleOPage'    : middleOPage,
      'middlePageOData': middlePageOData,
      'joinPageOData'  : joinPageOData,
      'joinPageDData'  : joinPageDData,
      'middleDPage'    : middleDPage,
      'middlePageDData': middlePageDData,
      'lastPageOData'  : lastPageOData,
      'lastPageDData'  : lastPageDData,
      // 'joinPage'    : => $joinPage,
      'oColumn'        : oColumn,
      'dColumn'        : dColumn
  };
  // echo "<pre>";
  // print_r($data);
  // exit();
  return data;
}

export function txtBanglaToEnglish(banglaNumber)
{

    const mobileNo = new String(banglaNumber);
    var englishNumber = new String();
    for (var i = 0; i < mobileNo.length; i++)
    {
        if (mobileNo.charCodeAt(i) == 2534)
            englishNumber = englishNumber + 0;
        else if (mobileNo.charCodeAt(i) == 2535)
            englishNumber = englishNumber + 1;
        else if (mobileNo.charCodeAt(i) == 2536)
            englishNumber = englishNumber + 2;
        else if (mobileNo.charCodeAt(i) == 2537)
            englishNumber = englishNumber + 3;
        else if (mobileNo.charCodeAt(i) == 2538)
            englishNumber = englishNumber + 4;
        else if (mobileNo.charCodeAt(i) == 2539)
            englishNumber = englishNumber + 5;
        else if (mobileNo.charCodeAt(i) == 2540)
            englishNumber = englishNumber + 6;
        else if (mobileNo.charCodeAt(i) == 2541)
            englishNumber = englishNumber + 7;
        else if (mobileNo.charCodeAt(i) == 2542)
            englishNumber = englishNumber + 8;
        else if (mobileNo.charCodeAt(i) == 2543)
            englishNumber = englishNumber + 9;
        else if (mobileNo.charCodeAt(i) == 46 && englishNumber != "")
            englishNumber = englishNumber + ".";
    }
    if (englishNumber == "")
    {
        englishNumber = banglaNumber;
    }
    return englishNumber;
}


export const replaceWithBr = (text) => {
  return text?.replace(/\n/g, "<br />")
}
