"use client";
import React from "react";
import Colors from "../../colors";
import styled from "styled-components";
// import Footer from "./components/footer";
import { StyledButtonWhite } from "../../components/styled/StyledButtonWhite";
import { useRouter } from "next/navigation";

const Header = styled.div`
  color: ${Colors.brand500};
  maxwidth: 600px;
  font-size: 2em;
  font-weight: 650;
  &:hover {
    color: #0066ff;
  }
`;

const page = () => {
  const router = useRouter();
  return (
    <div className="w-100 flex h-screen flex-col items-center justify-start text-center">
      <div style={{ maxHeight: "350px", maxWidth: "600px" }}>
        <div className="mb-5 mt-5 font-semibold">Introducing Numaira</div>

        <Header>Upload your file here</Header>
        <div
          className="mb-10 flex justify-center"
          style={{
            color: Colors.neutral700,
            display: "flex",
            justifyContent: "center",
          }}
        ></div>
        <StyledButtonWhite onClick={() => router.push("/loading")}>
          Upload
        </StyledButtonWhite>
      </div>
    </div>
  );
};

export default page;
