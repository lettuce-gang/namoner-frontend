import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header.tsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";
import CustomButton from "../components/CustomButton.tsx";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type SelectedDate = Date;
function ReserveLetter() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [value, onChange] = useState("00:00:00");
  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };
  const showSecond = false;
  const str = showSecond ? "HH:mm:ss" : "HH:mm";
  return (
    <>
      <Header isFull={false} isBack={true} />
      <Wrapper>
        <Calendar onChange={handleDateChange} value={selectedDate} locale="ko" selectRange={false} showNeighboringMonth={false} />
        <TimeInput type="time"/>
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
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin-bottom: 20px;
`
