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
  backgroundImg: string;
};

function BasicNote({ letter }: LetterInfoType) {

  return (
    <LetterPaper
    fontFamily={LetterFontProps[letter.fontType]["font-family"]}
    fontSize={LetterFontProps[letter.fontType]["font-size"].GRAPH_PAPER}
    backgroundImg={"/img/writeLetterPaper/graph-write-letter-paper.svg"}
  >
    {letter.message}
  </LetterPaper>
  );
}

export default BasicNote;

const LetterPaper = styled.div<LetterDivType>`
  width: 100%;
  height: 340px;
  max-height: 703px;
  overflow-y: auto;
  border: 1.5px solid #e9e9e9;
  background-image: url("/img/writeLetterPaper/basic-write-letter-paper.svg");
  resize: none;
  background-attachment: local;
  background-size: 100% 703px;
  background-repeat: no-repeat;
  padding: 24px;
  padding-top: 20px;
  box-sizing: border-box;
  margin: 0;
  display: block;
  line-height: 30px;
  font-size: ${props => (props.fontSize ? props.fontSize : "Pretendard-R")};
  font-family: ${props => (props.fontFamily ? props.fontFamily : "14.5px")};
  white-space: pre-wrap; /* 줄 바꿈 보존 */
  word-wrap: break-word; /* 긴 단어 줄바꿈 */
`;
