"use client";
import React, { useState } from "react";
import { StyledButtonWhite } from "../../components/styled/StyledButtonWhite";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LeftArrowSVG from "../../asset/left-arrow.svg";
import RightArrowSVG from "../../asset/right-arrow.svg";
import PlayButtonSVG from "../../asset/video-play.svg";
import ex_1 from "../../asset/ex-1.jpg";
import ex_2 from "../../asset/ex-2.jpg";
import ex_3 from "../../asset/ex-3.jpg";
import ex_4 from "../../asset/ex-4.jpg";

const page = () => {
  const router = useRouter();
  const images = [ex_1, ex_2, ex_3, ex_4];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div>
      <div>You lecture is ongoing, stay focus! </div>
      <div className="flex flex-row justify-center gap-12">
        <div onClick={handlePrev} style={{ cursor: "pointer" }}>
          <Image src={LeftArrowSVG} alt="Previous" width={24} height={24} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={images[currentIndex]}
            style={{ width: "800px", height: "600px" }}
            alt={`Slide ${currentIndex + 1}`}
          />
          <Image src={PlayButtonSVG} alt="Play" width={48} height={48} />
          <StyledButtonWhite onClick={() => router.push("/ending")}>
            End Lecture
          </StyledButtonWhite>
        </div>
        <div onClick={handleNext} style={{ cursor: "pointer" }}>
          <Image src={RightArrowSVG} alt="Next" width={24} height={24} />
        </div>
        <Image src={RightArrowSVG} />
      </div>
    </div>
  );
};

export default page;
