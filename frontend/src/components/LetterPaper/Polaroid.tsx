import React, { useRef } from "react";
import styled from "styled-components";
import heic2any from "heic2any";
import { LetterFontProps } from "../../type/LetterFontProps.ts";
import { useStore } from "zustand";
import { useSendLetters } from "../../stores/useSendLetters.ts";

type FontType = {
  "font-family": string;
  "font-size": string;
};

export interface WriteLetterProps {
  textGetter: string;
  textSetter: React.Dispatch<React.SetStateAction<string>>;
  imgGetter: string | null;
  imgSetter: React.Dispatch<React.SetStateAction<string>>;
  setImageFile?: (file: File) => void;
}

function Polaroid({ textGetter, textSetter, imgGetter, imgSetter, setImageFile }: WriteLetterProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { fontType } = useStore(useSendLetters);
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    const text = e.target.value;

    // 수동 줄바꿈 체크
    const lines = text.split("\n");
    if (lines.length > 2) {
      const limitedText = lines.slice(0, 2).join("\n");
      textSetter(limitedText);
      return;
    }

    // 자동 줄바꿈 체크
    const style = window.getComputedStyle(textarea);
    const lineHeight = parseInt(style.lineHeight, 10);
    const currentLines = Math.floor(textarea.scrollHeight / lineHeight);

    if (currentLines > 2) {
      return;
    }

    textSetter(text);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type === "image/heic") {
      try {
        const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg" });
        const objectUrl = URL.createObjectURL(convertedBlob as Blob);
        imgSetter(objectUrl);
        setImageFile?.(file);
      } catch (conversionError) {
        console.error("HEIC 파일 변환에 실패했습니다.");
      }
    } else if (file) {
      const objectUrl = URL.createObjectURL(file);
      imgSetter(objectUrl);
      setImageFile?.(file);
    }
    console.log(imgGetter);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Wrapper>
      <LetterPaper src="/img/writeLetterPaper/polaroid-write-letter-paper.svg" />
      {imgGetter && <LetterImgPreview src={imgGetter} alt="미리보기" onClick={handleFileInputClick} style={{ cursor: "pointer" }} />}
      <LetterText
        ref={textareaRef}
        value={textGetter}
        onChange={handleTextChange}
        rows={3}
        maxLength={100}
        font-family={LetterFontProps[fontType]["font-family"]}
        font-size={LetterFontProps[fontType]["font-size"].POLAROID}
      />
      <HiddenFileInput ref={fileInputRef} type="file" accept="image/*, .heic" onChange={handleImageChange} />
      {!imgGetter && <UploadButton onClick={handleFileInputClick}></UploadButton>}
    </Wrapper>
  );
}

export default Polaroid;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const LetterPaper = styled.img`
  width: 100%;
  height: auto;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const LetterText = styled.textarea<FontType>`
  position: absolute;
  left: 25px;
  bottom: 20px;
  height: 60px;
  width: calc(100% - 50px);
  line-height: 25px;
  box-sizing: border-box;
  background-color: transparent;
  resize: none;
  border-radius: 5px;
  padding: 5px;
  overflow: hidden;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: ${props => (props["font-size"] ? props["font-size"] : "14.5px")};
  font-family: ${props => (props["font-family"] ? props["font-family"] : "Pretendard-R")};
`;

const LetterImgPreview = styled.img`
  position: absolute;
  top: 22px;
  left: 25px;
  width: calc(100% - 50px);
  height: calc(100% - 115px);
  object-fit: fill;
  z-index: 10;
  &:hover {
    opacity: 0.8; // 호버 효과 추가 (선택사항)
  }
`;

const UploadButton = styled.div`
  position: absolute;
  top: 22px;
  left: 25px;
  width: calc(100% - 50px);
  height: calc(100% - 115px);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  z-index: 20;
`;
