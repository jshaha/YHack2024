"use client";
import React from "react";
import { StyledButtonWhite } from "../../components/styled/StyledButtonWhite";
import { useRouter } from "next/navigation";
import Loading from "../../asset/loading.svg";
import Image from "next/image";

const page = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col items-center gap-12">
        <Image src={Loading} />
        <StyledButtonWhite onClick={() => router.push("/")}>
          Cancel
        </StyledButtonWhite>
        <StyledButtonWhite onClick={() => router.push("/lecture")}>
          continue
        </StyledButtonWhite>
      </div>
    </div>
  );
};

export default page;
