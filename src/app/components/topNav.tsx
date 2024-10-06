"use client";
import { useRouter, usePathname } from "next/navigation";
import styled from "styled-components";
import Colors from "../colors";
import formats from "../formats";
import LogoSVG from "../asset/logo.svg";
import { useState } from "react";
import { StyledButton } from "./styled/StyledButton";

// Main component
const TopNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ height: "8vh", width: "100%" }} className="fixed top-0">
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
        </div>
      </div>
    </div>
  );
};

export default TopNav;
