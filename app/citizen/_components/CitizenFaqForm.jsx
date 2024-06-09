import { toast } from "react-toastify";
import { useState } from "react";

export default function CitizenFaqForm() {
  const [submit, setSubmit] = useState(false);
  const [formValues, setFormValues] = useState({
    question: "",
  });
  const HandleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    setFormValues({
      question: "",
    });
    toast.success("আপনার প্রশ্নটি সঠিকভাবে গ্রহন করা হয়েছে ধন্যবাদ।");
    setTimeout(() => {
      setSubmit(false);
    }, 1000);
  };
  return (
    <>
      <form
        onSubmit={(e) => HandleSubmit(e)}
        method="POST"
        className="flex flex-col pb-[20px] lg:pb-[12px]"
      >
        <p className="font-medium text-14 leading-[14.16px] bg-[#EDB900] py-[16px] lg:py-[12px] text-center mb-[12px]">
          আপনার জিজ্ঞাসিত প্রশ্ন নিম্নে প্রদান করুন
        </p>
        <fieldset className="border border-[#BABABA] rounded-md px-2 mb-[29px] lg:mb-[22px]">
          <legend className='text-16 leading-[16.18px] after:content-["_*"] after:text-[#CF0000] pb-[12px] lg:pb-[9px]'>
            আপনার প্রশ্ন
          </legend>
          <textarea
            value={formValues.question}
            onChange={(e) =>
              setFormValues({ ...formValues, question: e.target.value })
            }
            className="border-none focus:ring-0 p-0 w-full"
            placeholder="আপনার প্রশ্ন লিখুন"
            name="question"
            cols="20"
            rows="10"
            required
          ></textarea>
        </fieldset>
        <div className="flex justify-center items-center">
          <button
            disabled={submit}
            className={`${
              submit && "cursor-not-allowed"
            } p-3 text-[10px] ml-2 leading-[10.11px]  lg:text-14 lg:leading-[14.16px] border border-primary rounded-lg text-primary hover:bg-primary hover:text-white lg:w-[100%]`}
            type="submit"
          >
            প্রদান করুন
          </button>
        </div>
      </form>
      <div className="bg-[#A5008A] text-white flex flex-col justify-center items-center h-[6em]">
        <p className="text-16 leading-[18.38px] pb-[11px]">
          যেকোনো জিজ্ঞাসা জন্য কল করুন
        </p>
        <h3 className="inline-flex items-center font-medium text-36 leading-[36.41px]">
          <svg
            className="mr-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.3152 16.9593L18.0652 14.7093C17.8409 14.6137 17.5916 14.5936 17.3549 14.6519C17.1182 14.7103 16.9068 14.8439 16.7527 15.0328L14.4277 17.8734C10.7788 16.153 7.84228 13.2165 6.12188 9.5676L8.9625 7.2426C9.15172 7.0887 9.28565 6.87734 9.34401 6.64051C9.40237 6.40369 9.38199 6.1543 9.28594 5.9301L7.03594 0.680097C6.93052 0.438414 6.74408 0.241087 6.50876 0.122144C6.27344 0.00319988 6.00399 -0.0299059 5.74687 0.0285349L0.871875 1.15353C0.623986 1.21078 0.402818 1.35035 0.24447 1.54948C0.0861212 1.74861 -5.71036e-05 1.99553 2.83885e-08 2.24994C2.83885e-08 14.2734 9.74531 23.9999 21.75 23.9999C22.0045 24.0001 22.2515 23.914 22.4507 23.7556C22.65 23.5973 22.7896 23.376 22.8469 23.1281L23.9719 18.2531C24.0299 17.9947 23.9961 17.7242 23.8763 17.488C23.7564 17.2519 23.558 17.0649 23.3152 16.9593Z"
              fill="white"
            />
          </svg>
          ১৬১২২
        </h3>
      </div>
    </>
  );
}
