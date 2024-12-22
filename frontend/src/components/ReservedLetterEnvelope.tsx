import React from "react";
import styled from "styled-components";
import { LetterListProps } from "../stores/useLetterList";

interface ReservedLetterEnvProp {
  letter: LetterListProps;
}

function ReservedLetterEnvelope({ letter }: ReservedLetterEnvProp) {
  return (
    <LetterEnvelope>
      <ToContainer>
        <span>TO.</span>
        <Receiver>{letter.letterReceiver}</Receiver>
      </ToContainer>
      <FromContainer>
        <span>FROM.</span>
        <Sender>{letter.letterSender}</Sender>
      </FromContainer>
    </LetterEnvelope>
  );
}

export default ReservedLetterEnvelope;

const LetterEnvelope = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  border: 1px solid #e9e9e9;
  background: #fff;
  padding: 13px 20px 13px 20px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.35); /* 반투명 흰색 커버 */
    backdrop-filter: blur(3.5px); /* 배경 흐림 효과 */
    -webkit-backdrop-filter: blur(3.5px); /* 사파리 호환 */
    z-index: 1; /* 커버를 텍스트 위로 */
  }
`;


const ToContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  span {
    color: #9f9f9f;
    font-family: "Pretendard-M";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.18px;
  }
`;
const FromContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
  span {
    color: #9f9f9f;
    font-family: "Pretendard-M";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.18px;
  }
`;

const Receiver = styled.div`
  color: #505050;
  font-family: "Pretendard-B";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.24px;
`;

const Sender = styled.div`
  color: #505050;
  font-family: "Pretendard-B";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.24px;
`;
