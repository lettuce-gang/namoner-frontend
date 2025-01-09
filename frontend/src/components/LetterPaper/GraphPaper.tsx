import React, { useRef } from 'react';
import styled from "styled-components";
import { LetterFontProps } from "../../type/LetterFontProps.ts";
import { useStore } from "zustand";
import { useSendLetters } from "../../stores/useSendLetters.ts";

type FontType = {
    "font-family": string;
    "font-size": string;
  };

export interface WriteLetterProps {
      getter: string;
      setter: React.Dispatch<React.SetStateAction<string>>;
    
}
  

function GraphPaper({getter, setter}: WriteLetterProps) {
    const {fontType} = useStore(useSendLetters)
      const textareaRef = useRef<HTMLTextAreaElement>(null);
    
      const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
          const maxLines = 80; // 최대 줄 수
          const lineHeight = 30; // 줄 간격(px)
          const maxHeight = maxLines * lineHeight; // 최대 높이 계산
    
          if (textarea.scrollHeight > maxHeight) {
            const text = textarea.value.split("\n"); // 줄 단위로 분리
            if (text.length > maxLines) {
              textarea.value = text.slice(0, maxLines).join("\n"); // 초과된 줄 삭제
            }
          }
        }
      };
    
    return (
        <LetterPaper
        ref={textareaRef}
        onInput={handleInput}
        value={getter}
        onChange={e=>setter(e.target.value)}
        font-family={LetterFontProps[fontType]["font-family"]}
        font-size={LetterFontProps[fontType]["font-size"]}
      />
    );
}

export default GraphPaper;

const LetterPaper = styled.textarea<FontType>`
  width: 100%;
  height: 340px;
  max-height: 703px;
  overflow-y: auto;
  border: 1.5px solid #e9e9e9;
  background-image: url("/img/writeLetterPaper/graph-write-letter-paper.svg");
  resize: none;
  background-size:cover;
  background-repeat: repeat-y;
  padding: 24px;
  padding-top: 20px;
  box-sizing: border-box;
  line-height: 30px;
  font-size: ${props => (props["font-size"] ? props["font-size"] : "14.5px")};
  font-family: ${props => (props["font-family"] ? props["font-family"] : "Pretendard-R")};
  white-space: pre-wrap; /* 줄 바꿈 보존 */
  word-wrap: break-word; /* 긴 단어 줄바꿈 */
`;
