import React, { useRef } from 'react';
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
  

function GraphPaper({letter}:LetterInfoType) {
    console.log(letter);
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

export default GraphPaper;

const LetterPaper = styled.div<LetterDivType>`
  width: 277px;
  height: 340px;
  max-height: 703px;
  overflow-y: auto;
  background-image: url(${props => props["backgroundImg"]});
  resize: none;
  background-size:cover;
  background-repeat: repeat-y;
  padding: 24px;
  padding-top: 20px;
  box-sizing: border-box;
  line-height: 30px;
  margin: 0 auto;
  font-size: ${props => (props["fontSize"] ? props["fontSize"] : "14.5px")};
  font-family: ${props => (props["fontFamily"] ? props["fontFamily"] : "Pretendard-R")};
  white-space: pre-wrap; /* 줄 바꿈 보존 */
  word-wrap: break-word; /* 긴 단어 줄바꿈 */
`;
