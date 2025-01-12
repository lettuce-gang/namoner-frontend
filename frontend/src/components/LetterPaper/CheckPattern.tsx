import React, { useRef } from "react";
import { WriteLetterProps } from "./GraphPaper";
import styled from "styled-components";
import { LetterFontProps } from "../../type/LetterFontProps.ts";
import { useStore } from "zustand";
import { useSendLetters } from "../../stores/useSendLetters.ts";

type FontType = {
  fontFamily: string;
  fontSize: string;
};

// 22줄까지

function CheckPattern({ setter, getter }: WriteLetterProps) {
  const { fontType } = useStore(useSendLetters);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    const text = textarea.value;

    // 수동 줄바꿈 체크
    const lines = text.split("\n");
    if (lines.length > 9) {
      const limitedText = lines.slice(0, 9).join("\n");
      setter(limitedText);
      return;
    }

    // 자동 줄바꿈 체크
    if (textareaRef.current) {
      const style = window.getComputedStyle(textareaRef.current);
      const lineHeight = parseInt(style.lineHeight, 10);
      const paddingTop = parseInt(style.paddingTop, 10);
      const paddingBottom = parseInt(style.paddingBottom, 10);

      // 패딩을 제외한 실제 텍스트 영역의 높이로 계산
      const textHeight = textarea.scrollHeight - paddingTop - paddingBottom;
      const currentLines = Math.ceil(textHeight / lineHeight);

      if (currentLines > 9) {
        return;
      }
    }

    setter(text);
  };

  return (
    <LetterPaper
      ref={textareaRef}
      value={getter}
      onChange={handleTextChange}
      fontFamily={LetterFontProps[fontType]["font-family"]}
      fontSize={LetterFontProps[fontType]["font-size"].CHECK_PAPER}
      rows={9}
    />
  );
}

export default CheckPattern;

const LetterPaper = styled.textarea<FontType>`
  width: 277px;
  height: 340px;
  overflow-y: auto;
  border: none;
  background-image: url("/img/writeLetterPaper/check-pattern-write-letter-paper.svg");
  resize: none;
  background-attachment: local;
  background-size: 100% 340px;
  background-repeat: no-repeat;
  padding: 40px;
  padding-top: 30px;
  box-sizing: border-box;
  line-height: 30px;
  font-size: ${props => (props.fontSize ? props.fontSize : "14.5")};
  font-family: ${props => (props.fontFamily ? props.fontFamily : "Pretendard-R")};
  white-space: pre-wrap; /* 줄 바꿈 보존 */
  word-wrap: break-word; /* 긴 단어 줄바꿈 */
`;
