"use client";
import React, { useState } from "react";
import { StyledButtonWhite } from "../../components/styled/StyledButtonWhite";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LeftArrowSVG from "../../asset/left-arrow.svg";
import RightArrowSVG from "../../asset/right-arrow.svg";
import PlayButtonSVG from "../../asset/video-play.svg";
import ex_1 from "../../asset/ex-1.jpg";

const page = () => {
  const router = useRouter();
  const images = [];

  return (
    <div>
      <div>You lecture is ongoing, stay focus! </div>
      <div className="flex flex-row justify-center gap-12">
        <Image src={LeftArrowSVG} />
        <div className="flex flex-col items-center justify-center">
          <Image src={ex_1} style={{ width: "800px", height: "600px" }} />
          <Image src={PlayButtonSVG} />
          <StyledButtonWhite onClick={() => router.push("/ending")}>
            Lecturing
          </StyledButtonWhite>
        </div>
        <Image src={RightArrowSVG} />
      </div>
    </div>
  );
};

export default page;
