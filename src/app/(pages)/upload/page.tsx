"use client";
import React from "react";
import Image from "next/image";
import Colors from "../../colors";
import styled, { keyframes } from "styled-components";
// import Footer from "./components/footer";
import { StyledButtonWhite } from "../../components/styled/StyledButtonWhite";
import { useRouter } from "next/navigation";
import uploadPic from "../../asset/upload-bk.jpg";

// const Header = styled.div`
//   color: ${Colors.brand500};
//   maxwidth: 600px;
//   font-size: 2em;
//   font-weight: 650;
//   &:hover {
//     color: #0066ff;
//   }
// `;

const jump = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Adjust the height of the jump */
  }
`;

const Header = styled.div`
  color: ${Colors.brand500};
  max-width: 600px;
  font-size: 2em;
  font-weight: 650;
  cursor: pointer; /* Add a cursor to indicate interactivity */

  animation: ${jump} 1s ease-in-out infinite; /* Set the jump animation */
  transition: color 0.3s ease-in-out; /* Smooth transition for color */

  &:hover {
    animation: ${jump} 0.5s ease-in-out infinite; /* Speed up on hover */
    color: #ff6347; /* Change color on hover */
    transform: scale(1.1); /* Slightly enlarge on hover */
  }
`;

const page = () => {
  const router = useRouter();
  return (
    <div className="w-100 flex h-screen flex-col items-center justify-start text-center">
      <div style={{ maxHeight: "350px", maxWidth: "600px" }}>
        <Image src={uploadPic} />
        <div
          style={{
            maxHeight: "350px",
            maxWidth: "600px",
            marginBottom: "40px",
          }}
        >
          <Header style={{ marginTop: "100px" }}>Click to upload </Header>
        </div>

        <StyledButtonWhite onClick={() => router.push("/loading")}>
          Upload
        </StyledButtonWhite>
      </div>
    </div>
  );
};

export default page;
