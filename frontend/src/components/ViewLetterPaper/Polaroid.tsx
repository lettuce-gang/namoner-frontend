import React from "react";
import styled from "styled-components";
import { LetterFontProps } from "../../type/LetterFontProps.ts";
import { LetterProps } from "../../stores/useLetter.ts";

type LetterInfoType = {
  letter: LetterProps;
};

type LetterDivType = {
  fontSize: string;
  fontFamily: string;
};

function Polaroid({ letter }: LetterInfoType) {
  console.log(letter);
  return (
    <Wrapper>
      <LetterPaper src="/img/writeLetterPaper/polaroid-write-letter-paper.svg" />
      {letter.imageUrl && <LetterImg src={letter.imageUrl} alt="편지 이미지" />}
      <LetterText
        fontFamily={LetterFontProps[letter.fontType]["font-family"]}
        fontSize={LetterFontProps[letter.fontType]["font-size"].POLAROID}
      >
        {letter.message}
      </LetterText>
    </Wrapper>
  );
}

export default Polaroid;

const Wrapper = styled.div`
  position: relative;
  width: 275px;
  height: 395px;
`;

const LetterPaper = styled.img`
  width: 275px;
  height: 395px;
`;

const LetterImg = styled.img`
  position: absolute;
  top: 22px;
  left: 25px;
  width: 224px;
  height: 290px;
  object-fit: fill;
  z-index: 10;
`;

const LetterText = styled.div<LetterDivType>`
  position: absolute;
  left: 25px;
  bottom: 20px;
  height: 60px;
  width: 227px;
  line-height: 25px;
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 5px;
  padding: 5px;
  overflow: hidden;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: ${props => props.fontSize || "14.5px"};
  font-family: ${props => props.fontFamily || "Pretendard-R"};
`;
