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
  },
  {
    id: "2",
    type: "G마켓산스",
    font: "Gmarket-R",
    fontTypeName: "Gmarket_R",
  },
  {
    id: "3",
    type: "이서윤체",
    font: "Leeseoyun",
    fontTypeName: "Leeseoyun",
  },
  {
    id: "4",
    type: "고운돋움",
    font: "Gowun-R",
    fontTypeName: "Gowun_R",
  },
  {
    id: "5",
    type: "KCC은영체",
    font: "KCC",
    fontTypeName: "KCC",
  },
];

function FontSelectContainer({ getFont, getPaper, setFont }: PaperFontProps) {
  const { fontType, setLetterType, setLetterWriteStep } = useStore(useSendLetters);
  const [tempFontType, setTempFontType] = useState(fontType);
  // const setFontDefault= (id: string)=> {
  //   if (tempFontType === "") {
  //     return fontType === id;
  //   } else {
  //     return tempFontType === id;
  //   }
  // }
  console.log(getFont);
  return (
    <SelectBox>
      <GridContainer>
        {fontObject.map(font => (
          <GridObject onClick={() => setFont(font.fontTypeName)} key={font.id}>
            <FontBox id={font.id} fontFamily={font.font}>
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
          setLetterType(getPaper, getFont);
          setLetterWriteStep(2);
        }}
      />
    </SelectBox>
  );
}

export default React.memo(FontSelectContainer);

const SelectBox = styled.div`
  width: 90%;
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

const FontBox = styled.div<{ fontFamily: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  width: 90px;
  height: 90px;
  background-color: #f6f6f6;
  padding: 12px;
  box-sizing: border-box;
  /* position: relative; */
`;

const Selector = styled.img`
  position: absolute;
  top: 0;
`;
