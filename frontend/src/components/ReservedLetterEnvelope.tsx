import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LetterListProps, useLetterList } from "../stores/useLetterList.ts";
import { useStore } from "zustand";
import { useParams } from "react-router";
import { isLock } from "../utils/isLock.ts";

interface ReservedLetterEnvProp {
  letter: LetterListProps;
}

function ReservedLetterEnvelope({ letter }: ReservedLetterEnvProp) {
  const [timeLeft, setTimeLeft] = useState(letter.receiveDate);
  const { getLetterList } = useStore(useLetterList);
  const { userId } = useParams<{ userId: string }>() as { userId: string };

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
      getLetterList(userId);
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
    <LetterEnvelope>
      <TimeDisplay>
        <img src={isLock(getTotalHour(letter.receiveDate)) ? "/img/lock.svg" : "/img/hourglass.svg"} />
        {timeLeft}
      </TimeDisplay>
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

const TimeDisplay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  z-index: 10;

  color: #505050;
  font-family: "Pretendard_M";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.24px;
`;
