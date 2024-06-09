export const revalidate = 3600;
import {
  en2bn,
} from "@/halpers/helper";
import Link from "next/link";
import { ainObidhi } from "../../_api/api";
import { FaPaperclip } from "react-icons/fa6";

export default async function AineBidhi() {
  const ain = await ainObidhi().catch((err) => console.error(err.message));
  return (
    <>
      <div>
        <div className="mt-8 lg:mt-0 mx-3 lg:mx-20 bg-white p-3 lg:p-8 lg:border-r-[2px] lg:border-l-[2px] lg:border-primary">
          <div className="flex items-center justify-center space-x-3 mb-5">
            <div>
              <FaPaperclip size={26} color="#12633d" />
            </div>
            <div>
              <h3 className="text-20 lg:text-28 font-medium text-primary">
                আইন-ও-বিধি
              </h3>
            </div>
          </div>
          <div>
            <div>
              <p className="text-18 lg:text-20 font-medium text-primary">
                আইন-ও-বিধি
              </p>
              <hr className="bg-secondary h-[2px]" />
              <p className="text-black text-13 lg:text-15 p-2">
                বাংলাদেশ প্ল্যাটফরমে আপনাকে স্বাগতম। অনলাইনে সেবার আবেদন গ্রহণ,
                আবেদনের সর্বশেষ অবস্থা জানানো এবং সর্বোপরি জনভোগান্তি হ্রাসের
                উদ্দেশ্যে এই প্ল্যাটফরম প্রস্তুত করা হয়েছে। নাগরিক, ব্যবসায়ী,
                সরকারি ও বেসরকারি প্রতিষ্ঠান এবং সরকারি কর্মকর্তা-কর্মচারিগণ এই
                প্ল্যাটফর্মের সুবিধা গ্রহণ করতে পারবেন। এই ওয়েবসাইটটি ব্যবহার
                করার জন্য আপনাকে অবশ্যই কিছু শর্তাবলি মেনে চলতে হবে, যা আপনি এই
                সাইটে প্রবেশ করা মাত্রই প্রযোজ্য।
              </p>
            </div>
            <div>
              <p className="text-deepgreen text-18 lg:text-20 font-medium py-1">
                ভূমি মন্ত্রণালয়ের আইন সমূহ
              </p>
            </div>
          </div>
          <div className="h-[65vh] overflow-auto">
            <table className="w-full">
              <thead className="bg-primary text-white h-10 sticky top-0 border z-10">
                <tr>
                  <th className="pl-2">নং</th>
                  <th>বিষয়</th>
                  <th>ফাইল (MS Word)</th>
                  <th>ফাইল (PDF)</th>
                </tr>
              </thead>
              <tbody>
                {ain?.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center h-10 border border-[#F1F8E8] rounded drop-shadow lg:drop-shadow-md hover:bg-[#F1F8E8]"
                  >
                    <td>{en2bn(index + 1)}</td>
                    <td>{item?.title}</td>
                    <td>
                      <Link
                        href={item?.ayinbidhi_doc}
                        target="_blank"
                        rel="noreferrer noopenner"
                        className="px-5 py-1 rounded border border-primary  h-8 text-primary shadow-md"
                      >
                        ডাউনলোড
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={item?.ayinbidhi_pdf}
                        target="_blank"
                        rel="noreferrer noopenner"
                        className="px-5 py-1 rounded border border-primary  h-8 text-primary shadow-md"
                      >
                        ডাউনলোড
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
