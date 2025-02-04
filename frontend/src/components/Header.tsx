import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import SideTab from "./SideTab.tsx";
import { useStore } from "zustand";
import { useUserInfo } from "../stores/useUserInfo.ts";

type HeaderProps = {
  isFull: boolean;
  isBack?: boolean;
};

function Header({ isFull, isBack }: HeaderProps) {
  const { isUserLogin } = useStore(useUserInfo);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const goBack = () => {
    navigate(-1);
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Head>
        {isBack ? (
          <MenuButton src="/img/back-img.svg" alt="back-btn" width={9} height={15} onClick={goBack}/>
        ) : (
          <MenuButton src="/img/Hamburger.svg" alt="menu-btn" width={27} height={14} onClick={() => setIsMenuOpen(true)} />
        )}

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

export default Header;

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
