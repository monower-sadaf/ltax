export const revalidate = 3600;
import DrillDownHoldingTable from "../_table/DrillDownHoldingTable";
import { getTable1Data } from "@/app/_api/api";
const Table1 = async () => {
  const data = await getTable1Data("divisions", 0, "বিভাগ", "").catch((err) =>
    console.log(err)
  );
    return (
      <section className="px-4 md:px-16 py-5">
        <div className="text-center mb-3">
          <h3 className="text-primary text-22 md:text-28">
            ভূমি উন্নয়ন কর নাগরিক নিবন্ধনকৃত খতিয়ান থেকে হোল্ডিং এন্ট্রি ও
            সমন্বয়
          </h3>
        </div>
        <div>
          <DrillDownHoldingTable data={data} />
        </div>
      </section>
    );
};
export default Table1;