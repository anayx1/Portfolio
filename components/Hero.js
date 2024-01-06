import React from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { RainbowHighlight } from "./RainbowHighlight";
import userData from "@constants/data";
import Image from "next/image";

export default function Hero() {
  const colors = ["#F59E0B", "#84CC16", "#10B981", "#3B82F6"];
  return (
    <>
      <div className="flex flex-col justify-center items-start overflow-hidden my-20">
        {/* Text container */}
        <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
          <Image
            src={userData.avatarUrl}
            width={200}
            height={200}
            style={{borderRadius:"50%"}}
          />
        </div>
        <div className="flex justify-center py-5 flex-col" style={{width:"100%", textAlign:"center",gap:"1rem"}}>
          <div className="text-4xl"> Frontend Developer</div>
          <span>I design and code beautifully simple things, and I love what I do.</span>
        </div>
        {/* <div className="w-full md:w-1/2 mx-auto text-center lg:p-12">
          <RoughNotationGroup show={true}>
            <RainbowHighlight color={colors[0]}>
              <h1 className="text-4xl md:text-7xl font-bold text-gray-700 dark:text-gray-200 my-2">
                Developer.
              </h1>
            </RainbowHighlight>
            <br></br>
            <RainbowHighlight color={colors[2]}>
              <h1 className="text-4xl md:text-7xl font-bold text-gray-700 dark:text-gray-200 my-2">
                Programmer.
              </h1>
            </RainbowHighlight>
          </RoughNotationGroup>
        </div> */}
      </div>
    </>
  );
}
