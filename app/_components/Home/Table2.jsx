
import dynamic from "next/dynamic";
import TablePlaceHolder from "../_skeleton/TablePlaceHolder";
const DrillDownDabiTable = dynamic(() => import("../_table/DrillDownDabiTable"), {
  ssr: false,
  loading: () => <TablePlaceHolder />,
});


const Table2 = () => {
    return (
      <section className="px-4 lg:px-16 py-5">
        <div className="text-center mb-3">
          <h3 className="text-primary text-22 lg:text-28">ভূমি উন্নয়ন কর</h3>
          <p className="text-black text-13">
            (চলতি অর্থ বছর ১লা জুলাই ২০২২ থেকে ১৫ মে ২০২৩)
          </p>
        </div>

        <div>
          <DrillDownDabiTable />
        </div>
      </section>
    );
};


export default Table2;