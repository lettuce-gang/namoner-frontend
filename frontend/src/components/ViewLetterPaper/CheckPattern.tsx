import React from "react";
import styled from "styled-components";
import { LetterFontProps } from "../../type/LetterFontProps.ts";
import { LetterProps } from "../../stores/useLetter.ts";
type LetterInfoType = {
  letter:LetterProps
  };

type LetterDivType = {
  fontSize: string;
  fontFamily: string;
  backgroundImg: string;
}
  
function CheckPattern({letter}:LetterInfoType) {

  return (
    <LetterPaper
    fontFamily={LetterFontProps[letter.fontType]["font-family"]}
    fontSize={LetterFontProps[letter.fontType]["font-size"].GRAPH_PAPER}
    backgroundImg={"/img/writeLetterPaper/check-write-letter-paper.svg"}
  >
    {letter.message}
  </LetterPaper>
  );
}

export default CheckPattern;

const LetterPaper = styled.textarea<LetterDivType>`
  width: 277px;
  height: 340px;
  overflow-y: auto;
  border: none;
  background-image: url("/img/writeLetterPaper/check-pattern-write-letter-paper.svg");
  resize: none;
  background-attachment: local;
  background-size: 277px 340px;
  background-repeat: no-repeat;
  padding: 40px;
  padding-top: 30px;
  box-sizing: border-box;
  line-height: 30px;
  margin: 0 auto;
  font-size: ${props => (props.fontSize ? props.fontSize : "14.5")};
  font-family: ${props => (props.fontFamily ? props.fontFamily : "Pretendard-R")};
  white-space: pre-wrap; /* 줄 바꿈 보존 */
  word-wrap: break-word; /* 긴 단어 줄바꿈 */
`;
