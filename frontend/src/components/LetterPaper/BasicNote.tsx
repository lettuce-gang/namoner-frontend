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

function BasicNote({ setter, getter }: WriteLetterProps) {
  const { fontType } = useStore(useSendLetters);
  const MAX_LINE = 22;
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  function countLines(textareaElement: HTMLTextAreaElement) {
    const style = window.getComputedStyle(textareaElement);
    const lineHeight = parseInt(style.lineHeight, 10);
    const maxHeight = MAX_LINE * lineHeight;

    if (textareaElement.scrollHeight > maxHeight) {
      let text = textareaElement.value;
      let prevText = text;

      // 이진 탐색으로 더 효율적으로 찾기
      let start = 0;
      let end = text.length;

      while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        textareaElement.value = text.slice(0, mid);

        if (textareaElement.scrollHeight <= maxHeight) {
          prevText = textareaElement.value;
          start = mid + 1;
        } else {
          end = mid - 1;
        }
      }

      // 마지막 단어가 잘리지 않도록 처리
      const lastSpaceIndex = prevText.lastIndexOf(" ");
      const lastNewlineIndex = prevText.lastIndexOf("\n");
      const lastBreakIndex = Math.max(lastSpaceIndex, lastNewlineIndex);

      // 만약 마지막 단어가 너무 길다면 그대로 두고, 아니면 단어 단위로 자르기
      const finalText = lastBreakIndex > prevText.length - 20 ? prevText.substring(0, lastBreakIndex) : prevText;

      textareaElement.value = finalText;
      setter(finalText);

      // 커서를 텍스트 끝으로 이동
      textareaElement.selectionStart = finalText.length;
      textareaElement.selectionEnd = finalText.length;
    }
  }

  return (
    <LetterPaper
      ref={textareaRef}
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

export default BasicNote;

const LetterPaper = styled.textarea<FontType>`
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
  font-size: ${props => (props["font-size"] ? props["font-size"] : "Pretendard-R")};
  font-family: ${props => (props["font-family"] ? props["font-family"] : "14.5px")};
  white-space: pre-wrap; /* 줄 바꿈 보존 */
  word-wrap: break-word; /* 긴 단어 줄바꿈 */
`;
