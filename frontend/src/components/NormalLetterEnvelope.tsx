import React from "react";
import styled from "styled-components";
import { LetterListProps } from "../stores/useLetterList";
import { useNavigate } from "react-router";

interface NormalLetterEnvProp {
  letter: LetterListProps;
}

function NormalLetterEnvelope({ letter }: NormalLetterEnvProp) {
    const navigator = useNavigate();
  return (
    <LetterEnvelope onClick={()=>navigator(`letter/${letter.id}`)}>
      <Top>
        <ToContainer>
          <span>TO.</span>
          <Receiver>{letter.letterReceiver}</Receiver>
        </ToContainer>
        <IsReadBox isread={letter.isRead}>{letter.isRead ? "읽음" : "NEW"}</IsReadBox>
      </Top>
      <Bottom>
        <ReceivedDate>{letter.receiveDate}</ReceivedDate>
        <FromContainer>
          <span>FROM.</span>
          <Sender>{letter.letterSender}</Sender>
        </FromContainer>
      </Bottom>
    </LetterEnvelope>
  );
}

export default NormalLetterEnvelope;

const LetterEnvelope = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  border: 1px solid #e9e9e9;
  background: #fff;
  padding: 13px 20px 13px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

const ReceivedDate = styled.div`
  color: #9d9d9d;
  font-family: "Pretendard-M";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.21px;
`;

const IsReadBox = styled.div<{ isread: boolean }>`
  width: 43px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #efefef;
  background: #f6f6f6;
  font-family: "Pretendard-B";
  color: ${props => (props.isread ? "#888" : " #4361EE")};
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;
