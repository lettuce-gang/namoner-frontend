import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import SideTab from "./SideTab.tsx";
import { useStore } from "zustand";
import { useUserInfo } from "../stores/useUserInfo.ts";

type HeaderProps = {
  isFull?: boolean;
  isBack?: boolean;
  isShare?: boolean;
  headerText?: string;
};

function Header({ isFull, isBack, headerText, isShare }: HeaderProps) {
  const shareData = {
    title: "나모너",
    text: "나를 모르는 너에게 편지를 보내보세요!",
    url: window.location.href,
  };

  const shareUrl = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        alert("공유에 실패했습니다.");
      }
    } else {
      // Web Share API를 지원하지 않는 경우
      alert("이 브라우저는 공유 기능을 지원하지 않습니다.");
      copyToClipboard(shareData.url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("링크가 클립보드에 복사되었습니다!");
      })
      .catch(err => {
        console.error("클립보드 복사 실패:", err);
      });
  };

  const { isUserLogin } = useStore(useUserInfo);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const goBack = () => {
    navigate(-1);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Head>
        {isBack ? (
          <MenuButton src="/img/back-img.svg" alt="back-btn" width={9} height={15} onClick={goBack} />
        ) : (
          <MenuButton src="/img/Hamburger.svg" alt="menu-btn" width={27} height={14} onClick={() => setIsMenuOpen(true)} />
        )}

        {headerText ? (
          <span>{headerText}</span>
        ) : (
          <img
            src={isFull ? "/img/full-logo.svg" : "/img/logo.svg"}
            alt="logo"
            width={isFull ? 95 : 65}
            height={isFull ? 42 : 22}
            onClick={goHome}
          />
        )}
        {isShare && <ShareButton src="/img/share.svg" width={23} height={23} onClick={shareUrl} />}
      </Head>
      <SideTab isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} isLoggedIn={isUserLogin} />
    </>
  );
}

export default Header;

const Head = styled.div`
  width: 100%;
  padding: 26px 0px;
  box-sizing: border-box;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  img {
    cursor: pointer;
  }
`;
const MenuButton = styled.img`
  position: absolute;
  left: 10px;
  cursor: pointer;
`;

const ShareButton = styled.img`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;
