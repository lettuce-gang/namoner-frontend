import React from "react";
import { LetterListProps } from "../stores/useLetterList.ts";
import styled from "styled-components";
import NormalLetterEnvelope from "./NormalLetterEnvelope.tsx";
import ReservedLetterEnvelope from "./ReservedLetterEnvelope.tsx";

interface ReceivedMailContainerProp {
  letters: LetterListProps[];
}

function ReceivedMailContainer({ letters }: ReceivedMailContainerProp) {
  const isEmpty = letters.length === 0;
  return (
    <MailListContainer>
      {isEmpty && (
        <EmptyLetterContainer>
          <img src="/img/no-letter-img.svg" alt="empty-letter" width={66} height={66} />
          <p>우체통이 텅 비었어요!</p>
          <span>
            도착한 편지가 없어요
            <br />
            가장 먼저 편지를 써서 마음을 전달해보세요!
          </span>
        </EmptyLetterContainer>
      )}
      {letters &&
        letters.map(letter => {
          if (letter.letterType === "NORMAL") {
            return <NormalLetterEnvelope letter={letter} />;
          } else {
            return <ReservedLetterEnvelope letter={letter}/>;
          }
        })}
    </MailListContainer>
  );
}

export default ReceivedMailContainer;

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
    line-height: 21px; /* 131.25% */
    letter-spacing: -0.24px;
  }
`;
