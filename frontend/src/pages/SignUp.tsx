import React from "react";
import Header from "../components/Header.tsx";
import styled from "styled-components";
import CustomButton from "../components/CustomButton.tsx";
import { useNaverLogin } from "../stores/useNaverLogin.ts";
import { useStore } from "zustand";
import { useLocation } from "react-router-dom";

function SignUp() {
  const { startLogin } = useStore(useNaverLogin);
  const location = useLocation();
  return (
    <>
      <Header isFull={true} isBack={true} />
      <Wrapper>
        <Container>
          <img src="/img/login-img.svg" width={66} height={69} />
          <p>지금 바로 당신만의 편지를 써보세요!</p>
          <span>당신의 편지는 익명으로, 진심은 그대로</span>
        </Container>
        <ButtonContainer>
          <CustomButton
            width="100%"
            height="54px"
            backgroundColor="#FEE500"
            fontFamily="Pretendard-B"
            fontSize="18px"
            border="none"
            borderRadius="50px"
            text="카카오로 계속하기"
            textColor="black"
          />
          <CustomButton
            width="100%"
            height="54px"
            backgroundColor="#03C75A"
            fontFamily="Pretendard-B"
            fontSize="18px"
            borderRadius="50px"
            text="네이버로 계속하기"
            textColor="white"
            border="none"
            onClick={() => startLogin(location.state?.userId)}
          />
        </ButtonContainer>
      </Wrapper>
    </>
  );
}

export default SignUp;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding-top: 5vh;
`;

const ButtonContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 90%;
  max-width: 400px;
  flex-direction: column;
  padding-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: #262626;
    text-align: center;
    font-family: "Pretendard-B";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px; /* 138.889% */
    letter-spacing: -0.27px;
    margin-top: 35px;
    margin-bottom: 6px;
  }
  span {
    color: #777;
    text-align: center;
    font-family: "Pretendard-R";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.24px;
  }
`;
