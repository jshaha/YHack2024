"use client";
import React from "react";
import { Colors } from "../colors";
import { formats } from "../formats";
import styled from "styled-components";
import LogoSVG from "../asset/logo.svg";
import LinkedInSVG from "../asset/linkedin.svg";
import EmailSVG from "../asset/email.svg";
import { StyledButtonWhite } from "./styled/StyledButtonWhite";
import { useRouter, usePathname } from "next/navigation";

const FooterBoldedFont = styled.div`
  font-weight: 600;
  color: ${Colors.neutral1000};
  text-align: left;
`;

const FooterLessBolderFont = styled.div`
font-size: format.textXS  
font-weight: 600;
  color: ${Colors.neutral700};
  text-align: left;
`;

const FooterCoreLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: left;
  justify-content: flex-start;
`;

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <div className="flex flex-col gap-16">
        <div className="flex h-[320px] items-center justify-center gap-20">
          <div className="flex flex-col items-start" style={{ width: "800px" }}>
            <div
              className="flex flex-col items-start justify-start"
              style={{ gap: "20px" }}
            >
              <div className="items-start">
                <StyledButtonWhite
                  onClick={() => router.push("/dashboard")}
                  className={pathname === "/contact" ? "active" : ""}
                >
                  Request A Demo
                </StyledButtonWhite>
              </div>
            </div>
          </div>
          <div className="flex justify-start" style={{ gap: "72px" }}>
            <FooterCoreLayout>
              <FooterLessBolderFont>
                <h5>product</h5>
              </FooterLessBolderFont>
              <FooterBoldedFont>Features</FooterBoldedFont>
              <FooterBoldedFont>Use Cases</FooterBoldedFont>
              <FooterBoldedFont>Pricing</FooterBoldedFont>
              <FooterBoldedFont>FAQs</FooterBoldedFont>
            </FooterCoreLayout>
            <FooterCoreLayout>
              <FooterLessBolderFont>
                <h5>company</h5>
              </FooterLessBolderFont>
              <FooterBoldedFont>About</FooterBoldedFont>
              <FooterBoldedFont>Contact</FooterBoldedFont>
              <FooterBoldedFont>Join Us</FooterBoldedFont>
            </FooterCoreLayout>
            <FooterCoreLayout>
              <FooterLessBolderFont>
                <h5>Legal</h5>
              </FooterLessBolderFont>
              <FooterBoldedFont>Privacy</FooterBoldedFont>
              <FooterBoldedFont>Cookies</FooterBoldedFont>
              <FooterBoldedFont>Terms</FooterBoldedFont>
            </FooterCoreLayout>
          </div>
        </div>
        <div
          className="flex h-[80px] items-center justify-between px-20"
          style={{
            width: "100%",
            color: Colors.neutral700,
            backgroundColor: Colors.neutral100,
          }}
        >
          <a style={{ fontSize: formats.textLG, fontWeight: 400 }}>
            © 2024 Lecture-Agent. All rights are reserved
          </a>
          <div
            className="flex items-center justify-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
