"use client";
import React from "react";
import { StyledButtonWhite } from "../../components/styled/StyledButtonWhite";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <div>
      <StyledButtonWhite onClick={() => router.push("/lecture")}>
        Upload
      </StyledButtonWhite>
    </div>
  );
};

export default page;
