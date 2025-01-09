import React from "react";
import { WriteLetterProps } from "./GraphPaper";
import styled from "styled-components";
import { LetterFontProps } from "../../type/LetterFontProps.ts";
import { useStore } from "zustand";
import { useSendLetters } from "../../stores/useSendLetters.ts";

type FontType = {
  "font-family": string;
  "font-size": string;
};

// 22줄까지

function CheckPattern({ setter, getter }: WriteLetterProps) {
  const { fontType } = useStore(useSendLetters);
  const MAX_LINE = 22;
  function countLines(textareaElement: HTMLTextAreaElement) {
    // const text = textareaElement.value; // 텍스트 가져오기
    // const lines = text.split("\n"); // 줄 바꿈으로 텍스트 분리
    const style = window.getComputedStyle(textareaElement);
  const lineHeight = parseInt(style.lineHeight, 10);
  const scrollHeight = textareaElement.scrollHeight;
//   const scrollHeight = 704;


    console.log(lineHeight, scrollHeight);

    console.log(Math.ceil(scrollHeight / lineHeight));

    // if (lines.length > MAX_LINE) {
    //   const trimmedValue = lines.slice(0, MAX_LINE).join("\n");
    //   textareaElement.value = trimmedValue; // 초과된 줄을 잘라냄
    // }
  }

  return (
    <LetterPaper
      value={getter}
      onChange={e => {
        countLines(e.target);
        setter(e.target.value);
      }}
      font-family={LetterFontProps[fontType]["font-family"]}
      font-size={LetterFontProps[fontType]["font-size"]}
    />
  );
}

export default CheckPattern;

const LetterPaper = styled.textarea<FontType>`
  width: 100%;
  height: 340px;
  max-height: 703px;
  overflow-y: auto;
  border: 1.5px solid #e9e9e9;
  background-image: url("/img/writeLetterPaper/check-pattern-write-letter-paper.svg");
  resize: none;
  background-attachment: local;
  background-size: 340px 703px;
  background-repeat: no-repeat;
  padding: 24px;
  padding-top: 20px;
  box-sizing: border-box;
  line-height: 30px;
  font-size: ${props => (props["font-size"] ? props["font-size"] : "Pretendard-R")};
  font-family: ${props => (props["font-family"] ? props["font-family"] : "14.5px")};
  white-space: pre-wrap; /* 줄 바꿈 보존 */
  word-wrap: break-word; /* 긴 단어 줄바꿈 */
`;
