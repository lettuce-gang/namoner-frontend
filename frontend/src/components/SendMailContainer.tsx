import React from "react";
import { LetterListProps } from "../stores/useLetterList.ts";
import styled from "styled-components";
import NormalLetterEnvelope from "./NormalLetterEnvelope.tsx";
import ReservedLetterEnvelope from "./ReservedLetterEnvelope.tsx";

interface SendMailContainerProp {
  letters: LetterListProps[];
}

function SendMailContainer({ letters }: SendMailContainerProp) {
  const isEmpty = letters.length === 0;
  return (
    <MailListContainer>
      {isEmpty && (
        <EmptyLetterContainer>
          <img src="/img/no-letter-img.png" alt="empty-letter" width={66} height={66} />
          <p>보낸 편지가 없어요!</p>
          <span>
            아직 보낸 편지가 없어요
            <br />
            소중한 마음을 편지로 전달해보세요!
          </span>
        </EmptyLetterContainer>
      )}
      {letters &&
        letters.map(letter => {
            return <NormalLetterEnvelope letter={letter} />;
        })}
    </MailListContainer>
  );
}

export default SendMailContainer;

const MailListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f0f1f5;
  width: 100%;
  height: calc(40rem - 44px);
  border-radius: 0px 12px 12px 12px;
  padding: 24px 30px 24px 30px;
  box-sizing: border-box;
  overflow: auto;
  > * {
    flex-shrink: 0;
  }
`;

const EmptyLetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  p {
    color: #262626;
    text-align: center;
    font-family: "Pretendard-B";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  span {
    color: #777;
    text-align: center;
    font-family: "Pretendard-M";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: -0.24px;
  }
`;
