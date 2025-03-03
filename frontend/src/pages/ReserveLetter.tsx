import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header.tsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";
import CustomButton from "../components/CustomButton.tsx";
import { useStore } from "zustand";
import { useSendLetters } from "../stores/useSendLetters.ts";
import { useNavigate, useParams } from "react-router";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type SelectedDate = Date;
function ReserveLetter() {
  const navigator = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { sender, receiver, sendLetter, letterPaperType, fontType, message, setLetterWriteStep } = useStore(useSendLetters);

  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [value, onChange] = useState("00:00:00");
  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };
  const showSecond = false;
  const str = showSecond ? "HH:mm:ss" : "HH:mm";

  const combineDateTime = () => {
    const [hours, minutes] = value.split(":");
    const combinedDate = new Date(selectedDate);
    combinedDate.setHours(parseInt(hours));
    combinedDate.setMinutes(parseInt(minutes));
    combinedDate.setSeconds(0);

    return combinedDate.toISOString();
  };

  const handleSubmit = () => {
    const reservationDateTime = combineDateTime();
    const formData = new FormData();
    const letterData = {
      userReceiver: userId,
      letterSender: sender,
      letterReceiver: receiver,
      message: message,
      letterPaperType: letterPaperType,
      fontType: fontType,
      letterType: "RESERVED",
      receiveDate: reservationDateTime,
    };
    const letter = new Blob([JSON.stringify(letterData)], { type: "application/json" });
    formData.append("letterInfo", letter);
    sendLetter(
      formData,
      () => {
        setLetterWriteStep(4);
        navigator(`/writeLetter/${userId}`);
      },
      false,
    );
  };
  const getTileClassName = ({ date }: { date: Date }) => {
    const day = date.getDay(); // 0: 일요일, 6: 토요일
    if (day === 0) return "sunday"; // 일요일
    if (day === 6) return "saturday"; // 토요일
    return ""; // 기본 값 (클래스 없음)
  };

  return (
    <>
      <Header isFull={false} isBack={true} />
      <Wrapper>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          locale="ko"
          selectRange={false}
          showNeighboringMonth={false}
          formatMonthYear={(locale, date) => `${date.getFullYear()}.${date.getMonth() + 1}`}
          formatDay={(locale, date) => date.getDate().toString()}
          className="custom-calendar"
        />
        <TimeInput type="time" value={value} onChange={e => onChange(e.target.value)} />
        <CustomButton
          fontFamily="Pretendard-B"
          text="예약 전송하기"
          textColor="white"
          width="100%"
          height="54px"
          borderRadius="50px"
          backgroundColor="#FFBE0B"
          border="none"
          onClick={handleSubmit}
        />
      </Wrapper>
    </>
  );
}

export default ReserveLetter;

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

const TimeInput = styled.input`
  width: 100%;
  height: 50px;
  font-size: 20px;
  padding: 0px 20px;
  font-family: "Pretendard_R";
  border-radius: 10px;
  border: none;
  margin-bottom: 20px;
`;
