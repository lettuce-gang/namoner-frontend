import React from "react";
import styled from "styled-components";
import CustomButton from "../components/CustomButton.tsx";
import { useStore } from "zustand";
import { useSendLetters } from "../stores/useSendLetters.ts";
import { useParams } from "react-router";

function WriteLetterFinish() {
  const { sender, receiver, sendLetter, letterPaperType, fontType, message, setLetterWriteStep } = useStore(useSendLetters);
  const { userId } = useParams<{ userId: string }>() as { userId: string };

  const sendMyLetter = () => {
    const formData = new FormData();
    const letterData = {
      userReceiver: userId,
      letterSender: sender,
      letterReceiver: receiver,
      message: message,
      letterPaperType: letterPaperType,
      fontType: fontType,
      letterType: "NORMAL"  //이 페이지에서 보내면(바로보내기) NORMAL 고정
    };
    const letter = new Blob([JSON.stringify(letterData)], { type: "application/json" });
    formData.append("letterInfo", letter);
    sendLetter(formData, () => setLetterWriteStep(4));
  };
  return (
    <Wrapper>
      <LetterContainer>
        <div>
          <ToFrom>To. </ToFrom>
          <Name>{receiver}</Name>
        </div>
        <div style={{ alignSelf: "end" }}>
          <ToFrom>From. </ToFrom>
          <Name>{sender}</Name>
        </div>
      </LetterContainer>
      <ButtonContainer>
        <CustomButton
          fontFamily="Pretendard-B"
          text="바로 전송하기"
          textColor="white"
          width="100%"
          height="54px"
          borderRadius="50px"
          onClick={() => sendMyLetter()}
        />
        <CustomButton
          fontFamily="Pretendard-B"
          text="예약 전송하기"
          textColor="white"
          width="100%"
          height="54px"
          borderRadius="50px"
          backgroundColor="#FFBE0B"
          border="none"
        />
      </ButtonContainer>
    </Wrapper>
  );
}

export default WriteLetterFinish;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40rem;
  background-color: #f0f1f5;
  border-radius: 12px;
  padding: 23px 37px 26px 37px;
  box-sizing: border-box;
  gap: 12px;
  position: relative;
`;

const LetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 7em;
  width: 100%;
  height: 170px;
  border-radius: 10px;
  border: 1px solid #e9e9e9;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
`;
const ButtonContainer = styled.div`
  position: absolute;
  top: 75%;
  width: 90%;
  flex-direction: column;
  display: flex;
  gap: 18px;
  align-items: center;
`;

const Name = styled.span`
  color: #505050;
  font-family: "Pretendard-M";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;

const ToFrom = styled.span`
  color: #505050;
  font-family: "Pretendard-B";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
