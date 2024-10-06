"use client";
import React from "react";
import Image from "next/image";
import { StyledButtonWhite } from "../../components/styled/StyledButtonWhite";
import { useRouter } from "next/navigation";
import Horry from "../../asset/horry.jpg";

const page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col items-center gap-16">
        <div style={{ fontSize: "30px", fontWeight: "800px" }}>
          Well done! You finished this lecture!{" "}
        </div>
        <Image src={Horry} />
        <StyledButtonWhite onClick={() => router.push("/")}>
          Back to home
        </StyledButtonWhite>
      </div>
    </div>
  );
};

export default page;
