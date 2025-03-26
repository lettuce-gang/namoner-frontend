import React from "react";
import styled from "styled-components";
import CustomButton from "../CustomButton.tsx";
import { useNavigate } from "react-router";

type UserType = {
  userId: string;
  handlePopup: React.Dispatch<React.SetStateAction<boolean>>;
};

function LoginPopup({ userId, handlePopup }: UserType) {
  const navigator = useNavigate();
  return (
    <Overlay>
      <Wrapper>
        <img src="/img/wait-img.png" width={67} height={67} alt="wait-img" />
        <CloseIcon src="/img/close-img.svg" width={12} height={12} onClick={() => handlePopup(false)} />
        <TextContainer>
          <p>잠깐!</p>
          <span>
            지금 가입하면 상대의 <br />
            편지 수신 여부를 확인할 수 있어요!
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
            text="로그인/회원가입"
            textColor="white"
            onClick={() => navigator("/signup", { state: { userId: userId } })}
          />
          <CustomButton
            width="100%"
            height="43px"
            backgroundColor="white"
            fontFamily="Pretendard-B"
            fontSize="14px"
            borderRadius="40px"
            text="편지만 보내기"
            textColor="#4361EE"
            border="1px solid #4361EE"
            onClick={() => navigator(`/writeLetter/${userId}`)}
          />
        </ButtonContainer>
      </Wrapper>
    </Overlay>
  );
}

export default LoginPopup;

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
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 5;
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  cursor: pointer;
`;
