"use client";
import { useRouter, usePathname } from "next/navigation";
import styled from "styled-components";
import Colors from "../colors";
import formats from "../formats";
import UpdateBanner from "./UpdateBanner";
import LogoSVG from "../asset/logo.svg";
import MenuSVG from "../asset/menu.svg";
import CloseSVG from "../asset/close.svg";
import { useState } from "react";
import { StyledButton } from "./styled/StyledButton";

// Styled full-screen mobile menu
const MobileMenu = styled.div<{ menuOpen: boolean }>`
  position: fixed;
  top: 8vh;
  right: 0;
  height: 92vh;
  width: 100vw;
  background-color: white;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out;
  transform: ${({ menuOpen }) =>
    menuOpen ? "translateX(0)" : "translateX(100%)"};
`;

// Main component
const TopNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ height: "8vh", width: "100%" }} className="fixed top-0">
      {/* Desktop Navigation */}
      <section className="hidden md:block">
        <UpdateBanner message="🚀 Numaira Version 1.0 Launches In October 2024" />
        <div
          className="flex items-center justify-between gap-5 px-10"
          style={{ width: "100%" }}
        >
          <div className="flex items-center justify-center gap-2">
            <LogoSVG width={40} height={40} fill={Colors.brand500} />
            <div
              className="font-bold"
              style={{ color: Colors.brand500, fontSize: formats.textXL }}
            >
              Numaira
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div>
              <div
                onClick={() => router.push("/")}
                className={pathname === "/" ? "font-bold" : ""}
                style={{
                  cursor: "pointer",
                }}
              >
                Product
              </div>
            </div>
            <div>
              <div
                onClick={() => router.push("/about")}
                className={pathname === "/about" ? "font-bold" : ""}
                style={{
                  cursor: "pointer",
                }}
              >
                About
              </div>
            </div>
            <div>
              <div
                onClick={() => router.push("/pricing")}
                className={pathname === "/pricing" ? "font-bold" : ""}
                style={{
                  cursor: "pointer",
                }}
              >
                Pricing
              </div>
            </div>
            <div>
              <div
                onClick={() => router.push("/contact")}
                className={pathname === "/contact" ? "font-bold" : ""}
                style={{
                  cursor: "pointer",
                }}
              >
                Join Us
              </div>
            </div>
            <div>
              <StyledButton
                onClick={() => router.push("/dashboard")}
                className={pathname === "/contact" ? "active" : ""}
              >
                Request a Demo
              </StyledButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopNav;
