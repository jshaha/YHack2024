"use client";
import Image from "next/image";
import formats from "./formats";
import styled, { keyframes } from "styled-components";
import LogoSVG from "./asset/logo.svg";
import landingImage from "./asset/landing.png";
import Colors from "./colors";
import { StyledButtonWhite } from "./components/styled/StyledButtonWhite";
import { useRouter, usePathname } from "next/navigation";
import Landing_1 from "./asset/landing-page-1.jpg";

const Header = styled.div`
  color: ${Colors.brand500};
  maxwidth: 600px;
  font-size: 2em;
  font-weight: 650;
  &:hover {
    color: #0066ff;
  }
`;

const AnimatedText = styled.span`
  font-size: 30px;
  color: ${Colors.brand500};
  font-weight: 600;
  transition:
    transform 0.3s,
    font-size 0.3s,
    color 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1); /* Slightly increases the size */
    font-size: 50px; /* Increase the font size */
    color: #f45b69; /* Change color on hover */
    font-weight: 700; /* Make it bolder */
  }
`;

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <div className="flex flex-row items-center justify-center">
        <div style={{ maxHeight: "350px", maxWidth: "600px" }}>
          <div className="flex flex-col">
            <div className="mb-5 mt-5 font-semibold" style={{ fontSize: "px" }}>
              Introducing{" "}
              <AnimatedText>
                <span
                  style={{
                    fontSize: "30px",
                    marginLeft: "10px",
                  }}
                >
                  Lecture-Agent
                </span>
              </AnimatedText>
            </div>
            <Header>
              Going through the slides like the professor is giving your zoom
              lecture!
            </Header>
          </div>
          <div
            className="mb-10 flex justify-center"
            style={{
              color: Colors.neutral700,
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
        </div>

        <Image src={Landing_1} style={{ width: "500px", height: "500px" }} />
      </div>
      <StyledButtonWhite onClick={() => router.push("/upload")}>
        Get started
      </StyledButtonWhite>
    </div>
  );
}
