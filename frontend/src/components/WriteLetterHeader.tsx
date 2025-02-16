import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import SideTab from "./SideTab.tsx";
import { useStore } from "zustand";
import { useUserInfo } from "../stores/useUserInfo.ts";
import { useSendLetters } from "../stores/useSendLetters.ts";

type HeaderProps = {
  isFull: boolean;
  isBack?: boolean;
};

function WriteLetterHeader({ isFull, isBack }: HeaderProps) {
  const { isUserLogin } = useStore(useUserInfo);
  const { letterWriteStep, setLetterWriteStep } = useStore(useSendLetters);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const goBack = () => {
    if (letterWriteStep > 1) {
      console.log("letterWriteStep", letterWriteStep);
      setLetterWriteStep(letterWriteStep - 1);
    } else {
      navigate(-1);
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLast = letterWriteStep == 4 ? true : false;
  return (
    <>
      <Head>
        {isBack && !isLast && <MenuButton src="/img/back-img.svg" alt="back-btn" width={9} height={15} onClick={goBack} />}

        <img
          src={isFull ? "/img/full-logo.svg" : "/img/logo.svg"}
          alt="logo"
          width={isFull ? 95 : 65}
          height={isFull ? 42 : 22}
          onClick={goHome}
        />
      </Head>
      <SideTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} isLoggedIn={isUserLogin} />
    </>
  );
}

export default WriteLetterHeader;

const Head = styled.div`
  width: 100%;
  padding: 26px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  img {
    cursor: pointer;
  }
`;
const MenuButton = styled.img`
  position: absolute;
  left: 30px;
  cursor: pointer;
`;
