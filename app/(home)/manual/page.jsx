export const revalidate = 3600;
import { manuals } from "../../_api/api";
import Manualtab from "../_components/Manual/Manualtab";
import { BiWindows } from "react-icons/bi";
export default async function Home() {
  let nagorik, songstha;
  const manual = await manuals().catch((err) => {
    console.error("Server Error: ", err.message);
  });
  if (manual != null) {
    let nagorikManual = manual.filter((item) => {
      return item?.type == 1;
    });
    let songsthaManual = manual.filter((item) => {
      return item?.type == 2;
    });

    let filteredNagorikManual = nagorikManual.map((item) => {
      return {
        id: item?.id,
        question: item?.title,
        answer: item?.text,
        attachment: item?.image_url,
        dynamic: true,
      };
    });
    let filteredSongsthaManual = songsthaManual.map((item) => {
      return {
        id: item?.id,
        question: item?.title,
        answer: item?.text,
        attachment: item?.image_url,
        dynamic: true,
      };
    });

    nagorik = filteredNagorikManual;
    songstha = filteredSongsthaManual;
  }
  return (
    <div className="mt-8 lg:mt-0 mx-3 lg:mx-20 bg-white p-3 lg:p-12 lg:border-r-[2px] lg:border-l-[2px] lg:border-primary">
      <div className="flex items-center justify-center space-x-3 mb-5">
        <BiWindows color="#12633D" size={32} />
        <div>
          <h3 className="text-20 lg:text-28 font-medium text-primary">
            নির্দেশিকা / ম্যানুয়াল
          </h3>
        </div>
      </div>
      <div>
        <div>
          <p className="text-18 lg:text-20 text-primary pl-3">
            নির্দেশিকা / ম্যানুয়াল
          </p>
          <hr className="bg-secondary h-[2px]" />
          <p className="pt-2 pl-3 text-13 lg:text-15 font-medium">
            বাংলাদেশ প্ল্যাটফরমে আপনাকে স্বাগতম। অনলাইনে সেবার আবেদন গ্রহণ,
            আবেদনের সর্বশেষ অবস্থা জানানো এবং সর্বোপরি জনভোগান্তি হ্রাসের
            উদ্দেশ্যে এই প্ল্যাটফরম প্রস্তুত করা হয়েছে। নাগরিক, ব্যবসায়ী, সরকারি
            ও বেসরকারি প্রতিষ্ঠান এবং সরকারি কর্মকর্তা-কর্মচারিগণ এই
            প্ল্যাটফরমের সুবিধা গ্রহণ করতে পারবেন। এই ওয়েবসাইটটি ব্যবহার করার
            জন্য আপনাকে অবশ্যই কিছু শর্তাবলি মেনে চলতে হবে, যা আপনি এই সাইটে
            প্রবেশ করা মাত্রই প্রযোজ্য।
          </p>
        </div>
        <Manualtab nagorik={nagorik} songstha={songstha} />
      </div>
    </div>
  );
}
