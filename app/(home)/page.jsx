export const revalidate = 3600;
import dynamic from "next/dynamic";
import HeroSection from "../_components/Home/HeroSection";
import HomeNotice from "../_components/Home/HomeNotice";
import Fourcard from "../_components/Home/Fourcard";
import Howtotax from "../_components/Home/Howtotax";
import HomeStats from "../_components/Home/HomeStats";
import Table1 from "../_components/Home/Table1";
import Table2 from "../_components/Home/Table2";
import HomeStats2 from "../_components/Home/HomeStats2";
import Faqsection from "../_components/Home/Faqsection";
import Helpsection from "../_components/Home/Helpsection";
import { HomeStatistics } from "../_api/api";
const Home  = async () => {
  const statistics = await HomeStatistics().catch((err) => {
    console.log(err)
  });
  return (
    <>
      <HeroSection />
      <HomeNotice />
      <Fourcard />
      <Howtotax />
      <HomeStats stats={statistics} />
      <Table1 />
      <Table2 />
      <HomeStats2 />
      <Faqsection />
      <Helpsection />
    </>
  );
};
export default Home;