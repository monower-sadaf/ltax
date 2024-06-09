const months = ["বৈশাখ","জ্যৈষ্ঠ","আষাঢ়","শ্রাবণ","ভাদ্র","আশ্বিন","কার্তিক","অগ্রহায়ন","পৌষ","মাঘ","ফাল্গুন","চৈত্র"];
const days = ["রবি","সোম","মঙ্গল","বুধ","বৃহস্পতি","শুক্র","শনি"];
const banglaNums = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
const engToBanglaNumber = (engNum)=>{
	engNum = ""+engNum;
	let bnNum = "";
	for(let i=0;i<engNum.length;i++){
		bnNum += String.fromCharCode(engNum.charCodeAt(i) + 2534 - 48);
	}
	return bnNum;
}

const isLeapYear = (year)=>{return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);}

const AddBanglaCalendar = (date)=>{
	let monthDay = date.getMonth()*100 + date.getDate();
	let bMonth = 0;
	let bDay = 0;
	let bYear = date.getFullYear() - 593;
	
	if(monthDay < 314)
		bYear--;
	
	if(monthDay >= 314 && monthDay <= 414){
		bMonth = 0;
		bDay = monthDay < 400 ? monthDay - 313 : monthDay + 31 - 414 ;
	}else if(monthDay >= 415 && monthDay <= 514){
		bMonth = 1;
		bDay = monthDay < 500 ? monthDay - 414 : monthDay + 31 - 514 ;
	}else if(monthDay >= 515 && monthDay <= 615){
		bMonth = 2;
		bDay = monthDay < 600 ? monthDay - 514 : monthDay + 31 - 615 ;
	}else if(monthDay >= 616 && monthDay <= 715){
		bMonth = 3;
		bDay = monthDay < 700 ? monthDay - 615 : monthDay + 31 - 715 ;
	}else if(monthDay >= 716 && monthDay <= 815){
		bMonth = 4;
		bDay = monthDay < 800 ? monthDay - 715 : monthDay + 31 - 815 ;
	}else if(monthDay >= 816 && monthDay <= 916){
		bMonth = 5;
		bDay = monthDay < 900 ? monthDay - 815 : monthDay + 30 - 916 ;
	}else if(monthDay >= 917 && monthDay <= 1015){
		bMonth = 6;
		bDay = monthDay < 1000 ? monthDay - 916 : monthDay + 30 - 1015 ;
	}else if(monthDay >= 1016 && monthDay <= 1115){
		bMonth = 7;
		bDay = monthDay < 1100 ? monthDay - 1015 : monthDay + 30 - 1115 ;
	}else if(monthDay >= 1116 || monthDay <= 14){
		bMonth = 8;
		bDay = monthDay < 15 ? monthDay + 30 - 14 : monthDay - 1115; 
	}else if(monthDay >= 15 && monthDay <= 113){
		bMonth = 9;
		bDay = monthDay < 100 ? monthDay - 14 : monthDay + 30 - 113 ;
	}else if(monthDay >= 114 && monthDay <= 215){
		bMonth = 10;
		if(isLeapYear(date.getFullYear()))
			bDay = monthDay < 200 ? monthDay - 113 : monthDay + 31 - 215;
		else
			bDay = monthDay < 200 ? monthDay - 113 : monthDay + 30 - 215;
	}else if(monthDay >= 216 && monthDay <= 313){
		bMonth = 11;
		bDay = monthDay < 300 ? monthDay - 215 : monthDay + 30 - 313 ;
	}
	date.bangla = {month:bMonth, year:bYear, date: bDay};
	date.banglaMonth = months[bMonth];
	date.banglaDate = engToBanglaNumber(bDay);
	date.banglaYear = engToBanglaNumber(bYear);
	return date;
};


// exports.banglaCalendar = addBanglaCalendar;

export default AddBanglaCalendar;