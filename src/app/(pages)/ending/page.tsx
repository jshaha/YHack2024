"use client";
import React from "react";
import { StyledButtonWhite } from "../../components/styled/StyledButtonWhite";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div>
      <div>Well done! You finished this lecture! </div>
      <StyledButtonWhite onClick={() => router.push("/")}>
        Back
      </StyledButtonWhite>
    </div>
  );
};

export default page;
