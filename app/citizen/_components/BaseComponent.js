'use client'
import Footer from "../layouts/FooterSection";
import Navbar from "../layouts/navbar";

export default function BaseComponent({ children }) {
  return (
    <>
      <Navbar/>
      {children}
      <Footer/>
    </>
  )
}