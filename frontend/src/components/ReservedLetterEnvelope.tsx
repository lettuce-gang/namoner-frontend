import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LetterListProps } from "../stores/useLetterList.ts";
import { isLock } from "../utils/isLock.ts";
import moment from 'moment';
import 'moment/locale/ko';

interface ReservedLetterEnvProp {
  letter: LetterListProps;
  type: string;
}

function ReservedLetterEnvelope({ letter, type }: ReservedLetterEnvProp) {
  const [timeLeft, setTimeLeft] = useState(letter.receiveDate);

  function getTotalHour(isoString: string) {
    const targetDate = new Date(isoString);
    const now = Date.now();
    const diffInMs = targetDate.getTime() - now;

    const totalHours = Math.floor(diffInMs / (1000 * 60 * 60));

    return totalHours;
  }

  const getFormattedTime = (isoString: string) => {
    const targetDate = moment(isoString);
  const now = moment();
  const diffInHours = targetDate.diff(now, 'hours');

  // 24시간 이상인 경우 목표 날짜 표시 (YYYY.MM.DD 형식)
  if (diffInHours > 24) {
    return targetDate.format('YYYY.MM.DD');
  }

  // 24시간 미만인 경우 남은 시간 표시 (HH:mm:ss 형식)
  const duration = moment.duration(targetDate.diff(now));
  return moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
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
