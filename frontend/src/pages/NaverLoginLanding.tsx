import React, { useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { useStore } from "zustand";
import { useNaverLogin } from "../stores/useNaverLogin.ts";

function NaverLoginLanding() {
  const location = useLocation();
  const { sendAuthCode } = useStore(useNaverLogin);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (state === "false") {
      if (code) {
        sendAuthCode(code, state);
      }
    }
  }, [location]);
  return (
    <SuspendContainer>
      <img src="/img/naverLoginMiniIcon.png" width={60} height={60} />
      <span>네이버 로그인중입나다</span>
    </SuspendContainer>
  );
}

export default NaverLoginLanding;

const SuspendContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
  font-family: "Pretendard-B";
  font-size: 24px;
`;
