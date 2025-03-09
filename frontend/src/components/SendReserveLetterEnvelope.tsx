import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LetterListProps } from "../stores/useLetterList";
import { useNavigate } from "react-router";
import { isLock } from "../utils/isLock.ts";

interface NormalLetterEnvProp {
  letter: LetterListProps;
  type: string;
}

function SendReserveLetterEnvelope({ letter, type }: NormalLetterEnvProp) {
  const navigator = useNavigate();
  const [timeLeft, setTimeLeft] = useState(letter.receiveDate);

  function getTotalHour(isoString: string) {
    const targetDate = new Date(isoString);
    const now = Date.now();
    const diffInMs = targetDate.getTime() - now;

    const totalHours = Math.floor(diffInMs / (1000 * 60 * 60));

    return totalHours;
  }

  const getFormattedTime = (isoString: string) => {
    const targetDate = new Date(isoString);
    const now = Date.now();
    const diffInMs = targetDate.getTime() - now;
    const totalHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInMs < 0) {
      // 시간이 지났는데 RESERVED가 안바뀌는 듯 ?
      // getLetterList(userId);
    }
    const formatter = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    // 24시간 이상인 경우 목표 날짜 표시
    if (totalHours > 24) {
      return formatter.format(targetDate).replace(/\. /g, ".").slice(0, -1);
    }

    // 24시간 미만인 경우 남은 시간 표시
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
    const addLeadingZero = num => String(num).padStart(2, "0");
    const parts: string[] = [];
    if (totalHours > 0) parts.push(`${addLeadingZero(totalHours)}:`);
    if (minutes >= 0) parts.push(`${addLeadingZero(minutes)}:`);
    if (seconds >= 0) parts.push(`${addLeadingZero(seconds)}`);

    return parts.join("");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getFormattedTime(letter.receiveDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [letter.receiveDate]);
  return (
    <LetterEnvelope onClick={() => navigator(`letter/${letter.id}/${type}`)}>
      <Top>
        <ToContainer>
          <span>TO.</span>
          <Receiver>{letter.letterReceiver}</Receiver>
        </ToContainer>
        <IsReadBox>예약</IsReadBox>
      </Top>
      <Bottom>
        <ReceivedDate>
          <img src={isLock(getTotalHour(letter.receiveDate)) ? "/img/lock.svg" : "/img/hourglass.svg"} width={15} />
          {timeLeft}
        </ReceivedDate>
        <FromContainer>
          <span>FROM.</span>
          <Sender>{letter.letterSender}</Sender>
        </FromContainer>
      </Bottom>
    </LetterEnvelope>
  );
}

export default SendReserveLetterEnvelope;

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
  display: flex;
  align-items: center;
  gap: 5px;
  color: #505050;
  font-family: "Pretendard-M";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.21px;
`;

const IsReadBox = styled.div`
  width: 43px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #efefef;
  background: #f6f6f6;
  font-family: "Pretendard-B";
  color: #ff45c4;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;
