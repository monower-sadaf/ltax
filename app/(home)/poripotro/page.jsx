export const revalidate = 3600;
import {
  en2bn,
} from "@/halpers/helper";
import Link from "next/link";
import { poriPotro } from "../../_api/api";
import { BiWindows } from "react-icons/bi";


export default async function Home() {
  const poripotro = await poriPotro().catch((err) => {
    console.error("Server Error: ", err.message);
  });
  return (
    <>
      <div className="mt-8 lg:mt-0 mx-3 lg:mx-20 bg-white p-3 lg:p-8">
        <div className="flex items-center justify-center space-x-3 mb-5">
          <BiWindows color="#12633D" size={32} />
          <div>
            <h3 className="text-18 lg:text-28 font-medium text-primary">
              ভূমি সংক্রান্ত পরিপত্র/প্রজ্ঞাপন
            </h3>
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
              {poripotro?.map((item, index) => (
                <tr
                  key={index}
                  className="text-center h-10 border border-[#F1F8E8] rounded drop-shadow lg:drop-shadow-md hover:bg-[#F1F8E8]"
                >
                  <td>{en2bn(index + 1)}</td>
                  <td>{item?.title}</td>
                  <td>
                    <Link
                      href={item?.poripotro_proggapon_doc}
                      target="_blank"
                      rel="noreferrer noopenner"
                      className="px-5 py-1 rounded border border-primary  h-8 text-primary shadow-md"
                    >
                      ডাউনলোড
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={item?.poripotro_proggapon_pdf}
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
    </>
  );
}
