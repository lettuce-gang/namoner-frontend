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

function Postcard({ letter }: LetterInfoType) {
  return (
    <Wrapper>
      <LetterPaper src="/img/writeLetterPaper/postcard-write-letter-paper.svg" />
      {letter.imageUrl && <LetterImg src={letter.imageUrl} alt="편지 이미지" />}
      <LetterText
        fontFamily={LetterFontProps[letter.fontType]["font-family"]}
        fontSize={LetterFontProps[letter.fontType]["font-size"].PHOTO_POSTCARD}
      >
        {letter.message}
      </LetterText>
    </Wrapper>
  );
}

export default Postcard;

const Wrapper = styled.div`
  position: relative;
`;

const LetterPaper = styled.img`
  width: 300px;
  height: 220px;
  margin:0 auto;
  position: relative;
`;

const LetterImg = styled.img`
  position: absolute;
  top: 18px;
  left: 17px;
  width: 122px;
  height: 164px;
  object-fit: fill;
  z-index: 10;
`;

const LetterText = styled.div<LetterDivType>`
  position: absolute;
  right: 15px;
  top: 6px;
  width: 140px;
  height: 205px;
  line-height: 24px;
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
