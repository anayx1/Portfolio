import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import Contact from "../components/Contact";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";

export default function contact() {
  return (
    // <ContainerBlock>
    //   <Contact />

    // </ContainerBlock>

    <div>
        <Navbar/>
        <Contact />
        <Footer />
      </div>
  );
}
