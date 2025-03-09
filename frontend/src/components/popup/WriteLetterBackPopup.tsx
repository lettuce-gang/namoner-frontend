import React from "react";
import styled from "styled-components";
import CustomButton from "../CustomButton.tsx";
import { useNavigate } from "react-router";
import { useStore } from "zustand";
import { useSendLetters } from "../../stores/useSendLetters.ts";

type UserType = {
  handlePopup: React.Dispatch<React.SetStateAction<boolean>>;
};

function WriteLetterBackPopup({ handlePopup }: UserType) {
  const { setLetterWriteStep } = useStore(useSendLetters);

  // 팝업이 열릴 때 body 스크롤 비활성화
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // 팝업이 닫힐 때 원래 상태로 복원
    };
  }, []);

  return (
    <Overlay>
      <Wrapper>
        <img src="/img/wait-img.png" width={67} height={67} alt="wait-img" />
        <CloseIcon src="/img/close-img.svg" width={12} height={12} onClick={() => handlePopup(false)} />
        <TextContainer>
          <p>잠깐!</p>
          <span>
            이 페이지를 벗어나면
            <br />
            작성 중인 내용이 사라져요.
            <br />
            그래도 계속하시겠습니까?
          </span>
        </TextContainer>
        <ButtonContainer>
          <CustomButton
            width="100%"
            height="43px"
            backgroundColor="#4361EE"
            fontFamily="Pretendard-B"
            fontSize="14px"
            border="none"
            borderRadius="40px"
            text="네"
            textColor="white"
            onClick={() => {
              setLetterWriteStep(1);
              handlePopup(false);
            }}
          />
          <CustomButton
            width="100%"
            height="43px"
            backgroundColor="white"
            fontFamily="Pretendard-B"
            fontSize="14px"
            borderRadius="40px"
            text="아니요"
            textColor="#4361EE"
            border="1px solid #4361EE"
            onClick={() => handlePopup(false)}
          />
        </ButtonContainer>
      </Wrapper>
    </Overlay>
  );
}

export default WriteLetterBackPopup;

const Wrapper = styled.div`
  padding-top: 125px;
  width: 80%;
  height: 80%;
  border-radius: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  z-index: 5;
`;

const TextContainer = styled.div`
  margin-top: 30px;
  text-align: center;
  p {
    color: #262626;
    font-family: "Pretendard-B";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  span {
    color: #777;
    font-family: "Pretendard-M";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.24px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 80%;
  flex-direction: column;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  cursor: pointer;
`;
