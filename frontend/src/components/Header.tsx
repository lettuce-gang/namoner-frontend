import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

type HeaderProps = {
  isFull: boolean;
};

function Header({ isFull }: HeaderProps) {
  const navigate = useNavigate()
  const goHome = () => {
    navigate("/")
  }
  return (
    <Head>
      <MenuButton src="/img/hamburger.svg" alt="menu-btn" width={27} height={14} />
      <img src={isFull ? "/img/full-logo.svg" : "/img/logo.svg"} alt="logo" width={isFull ? 95 : 65} height={isFull ? 42 : 22} onClick={goHome} />
    </Head>
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
