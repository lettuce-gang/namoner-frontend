import React from "react";
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

const paperObject = Array.from({ length: 6 }, (_, i) => ({
  id: (i + 1).toString(),
  imgUrl: "/img/letterPapers/test-paper.svg",
  type: `테스트용${i + 1}`,
}));

function PaperSelectContainer({ getFont, getPaper, setPaper }: PaperFontProps) {
  const { letterPaperType, setLetterType, setLetterWriteStep } = useStore(useSendLetters);
  return (
    <SelectBox>
      <GridContainer>
        {paperObject.map(letter => (
          <GridObject onClick={() => setPaper(letter.id)}>
            <PaperImg src={letter.imgUrl} alt="letter-img" id={letter.id} width={90} height={90} />
            {getPaper == letter.id && <Selector src={"/img/selector.svg"} width={90} height={90} />}
            <span>{letter.type}</span>
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

export default React.memo(PaperSelectContainer);

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

const PaperImg = styled.img`
  /* position: relative; */
`;

const Selector = styled.img`
  position: absolute;
  top: 0;
`;
