"use client";
import React, { useState } from "react";
import { StyledButtonWhite } from "../../components/styled/StyledButtonWhite";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import Colors from "../../colors";
import Image from "next/image";
import LeftArrowSVG from "../../asset/left-arrow.svg";
import RightArrowSVG from "../../asset/right-arrow.svg";
import PlayButtonSVG from "../../asset/video-play.svg";
import ex_1 from "../../asset/ex-1.jpg";
import ex_2 from "../../asset/ex-2.jpg";
import ex_3 from "../../asset/ex-3.jpg";
import ex_4 from "../../asset/ex-4.jpg";

const jump = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Adjust the height of the jump */
  }
`;

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

  const Header = styled.div`
    color: ${Colors.brand500};
    max-width: 600px;
    font-size: 2em;
    font-weight: 650;
    cursor: pointer; /* Add a cursor to indicate interactivity */

    &:hover {
      animation: ${jump} 0.5s ease-in-out infinite; /* Speed up on hover */
      color: #ff6347; /* Change color on hover */
      transform: scale(1.1); /* Slightly enlarge on hover */
    }
  `;

  return (
    <div>
      <div className="flex flex-col items-center">
        <div
          style={{
            // marginTop: "40px",
            // maxHeight: "500px",
            // maxWidth: "600px",
            marginBottom: "40px",
          }}
        >
          <Header>You are having lecture, stay focus! </Header>
        </div>
        <div className="flex flex-row items-center justify-center gap-12">
          <div onClick={handlePrev} style={{ cursor: "pointer" }}>
            <Image src={LeftArrowSVG} alt="Previous" width={40} height={40} />
          </div>
          <div className="flex flex-col items-center gap-8">
            <Image
              src={images[currentIndex]}
              style={{
                width: "800px",
                height: "600px",
                border: `solid 10px ${Colors.brand200}`,
              }}
              alt={`Slide ${currentIndex + 1}`}
            />
            <Image src={PlayButtonSVG} alt="Play" width={48} height={48} />
            <StyledButtonWhite onClick={() => router.push("/ending")}>
              End Lecture
            </StyledButtonWhite>
          </div>

          <div onClick={handleNext} style={{ cursor: "pointer" }}>
            <Image src={RightArrowSVG} alt="Next" width={40} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
