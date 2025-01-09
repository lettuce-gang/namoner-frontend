import React, { useState } from "react";
import styled from "styled-components";
import CustomButton from "./CustomButton.tsx";
import { useStore } from "zustand";
import { useSendLetters } from "../stores/useSendLetters.ts";

type PaperFontProps = {
  getPaper: string;
  getFont: string;
  setPaper: React.Dispatch<React.SetStateAction<string>>;
  setFont: React.Dispatch<React.SetStateAction<string>>;
};

const fontObject = [
  {
    id: "1",
    type: "프리텐다드",
    font: "Pretendard-R",
    fontTypeName: "Pretendard_R",
    size: "18px",
  },
  {
    id: "2",
    type: "G마켓산스",
    font: "Gmarket-R",
    fontTypeName: "Gmarket_R",
    size: "17px",
  },
  {
    id: "3",
    type: "이서윤체",
    font: "Leeseoyun",
    fontTypeName: "Leeseoyun",
    size: "20px",
  },
  {
    id: "4",
    type: "고운돋움",
    font: "Gowun-R",
    fontTypeName: "Gowun_R",
    size: "15px",
  },
  {
    id: "5",
    type: "KCC은영체",
    font: "KCC",
    fontTypeName: "KCC",
    size: "20px",
  },
  {
    id: "6",
    type: "하이멜로디체",
    font: "HiMelody-R",
    fontTypeName: "HiMelody_R",
    size: "20px",
  },
];

function FontSelectContainer({ getFont, getPaper, setFont }: PaperFontProps) {
  const { fontType, setLetterFrameType, setLetterWriteStep } = useStore(useSendLetters);
  return (
    <SelectBox>
      <GridContainer>
        {fontObject.map(font => (
          <GridObject onClick={() => setFont(font.fontTypeName)} key={font.id}>
            <FontBox id={font.id} fontFamily={font.font} size={font.size}>
              나를
              <br />
              모르는
              <br />
              너에게...
            </FontBox>
            {getFont === font.fontTypeName && <Selector src={"/img/selector.svg"} width={90} height={90} />}
            <span>{font.type}</span>
          </GridObject>
        ))}
      </GridContainer>
      <CustomButton
        fontFamily="Pretendard-B"
        text="선택완료"
        textColor="white"
        width="100%"
        height="54px"
        borderRadius="50px"
        onClick={() => {
          setLetterFrameType(getPaper, getFont);
          setLetterWriteStep(2);
        }}
      />
    </SelectBox>
  );
}

export default React.memo(FontSelectContainer);

const SelectBox = styled.div`
  width: 100%;
  height: 374px;
  border-radius: 0px 12px 12px 12px;
  background-color: white;
  padding: 32px 25px 20px 25px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 22px;
  margin-bottom: 27px;
`;

const GridObject = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  span {
    font-family: "Pretendard-R";
    font-size: 12px;
    color: #777;
  }
`;

const FontBox = styled.div<{ fontFamily: string; size: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  width: 90px;
  height: 90px;
  font-size: ${({ size }) => size};
  background-color: #f6f6f6;
  padding: 12px;
  box-sizing: border-box;
`;

const Selector = styled.img`
  position: absolute;
  top: 0;
`;
