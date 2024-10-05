"use client";

import Image from "next/image";
import styled from "styled-components";
import LogoSVG from "./asset/logo.svg";
import landingImage from "./asset/landing.png";
import Colors from "./colors";
import Footer from "./components/footer";
import TopNav from "./components/topNav";
import { StyledButtonWhite } from "./components/styled/StyledButtonWhite";
import { useRouter, usePathname } from "next/navigation";
const Header = styled.div`
  color: ${Colors.brand500};
  maxwidth: 600px;
  font-size: 2em;
  font-weight: 650;
  &:hover {
    color: #0066ff;
  }
`;

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="w-100 flex h-screen flex-col items-center justify-start text-center">
      <div style={{ maxHeight: "350px", maxWidth: "600px" }}>
        <div className="mb-5 mt-5 font-semibold">Introducing Numaira</div>

        <Header>Reviewing your slides by listening to lecture again!</Header>
        <div
          className="mb-10 flex justify-center"
          style={{
            color: Colors.neutral700,
            display: "flex",
            justifyContent: "center",
          }}
        ></div>
        <StyledButtonWhite
          onClick={() => router.push("/upload")}
          className={pathname === "/contact" ? "active" : ""}
        >
          Get started
        </StyledButtonWhite>
      </div>
    </div>
  );
}
