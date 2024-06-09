export const revalidate = 3600;
import { replaceWithBr } from "@/halpers/helper";
import { nitimala } from "../../_api/api";
export default async function Home() {
  const nitimalas = await nitimala().catch((err) => {
    console.error("Server Error: ", err.message);
  });
  return (
    <div className="mt-8 lg:mt-0 mx-3 lg:mx-20 bg-white p-3 lg:p-12 lg:border-r-[2px] lg:border-l-[2px] lg:border-primary">
      <div
        dangerouslySetInnerHTML={{
          __html: replaceWithBr(nitimalas?.nitimala_description),
        }}
      />
    </div>
  );
}
