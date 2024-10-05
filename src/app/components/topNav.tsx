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
      Hello
    </div>
  );
};

export default TopNav;
