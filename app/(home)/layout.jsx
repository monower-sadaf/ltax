import dynamic from "next/dynamic";
import Navbar from "../layouts/navbar";
const Footer = dynamic(() => import("../layouts/FooterSection"));
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
