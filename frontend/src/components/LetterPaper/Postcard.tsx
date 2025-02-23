import React, { useRef } from "react";
import styled from "styled-components";
import heic2any from "heic2any";
import { LetterFontProps } from "../../type/LetterFontProps.ts";
import { useStore } from "zustand";
import { useSendLetters } from "../../stores/useSendLetters.ts";

type FontType = {
  fontFamily: string;
  fontSize: string;
};

export interface WriteLetterProps {
  textGetter: string;
  textSetter: React.Dispatch<React.SetStateAction<string>>;
  imgGetter: string | null;
  imgSetter: React.Dispatch<React.SetStateAction<string>>;
  setImageFile?: (file: File) => void;
}

function Postcard({ textGetter, textSetter, imgGetter, imgSetter, setImageFile }: WriteLetterProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { fontType } = useStore(useSendLetters);
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    const text = e.target.value;

    // 수동 줄바꿈 체크
    const lines = text.split("\n");
    if (lines.length > 8) {
      const limitedText = lines.slice(0, 2).join("\n");
      textSetter(limitedText);
      return;
    }

    // 자동 줄바꿈 체크
    const style = window.getComputedStyle(textarea);
    const lineHeight = parseInt(style.lineHeight, 10);
    const currentLines = Math.floor(textarea.scrollHeight / lineHeight);

    if (currentLines > 8) {
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
      <LetterPaper src="/img/writeLetterPaper/postcard-write-letter-paper.svg" />
      {imgGetter && <LetterImgPreview src={imgGetter} alt="미리보기" onClick={handleFileInputClick} style={{ cursor: "pointer" }} />}
      <LetterText
        ref={textareaRef}
        value={textGetter}
        onChange={handleTextChange}
        rows={8}
        fontFamily={LetterFontProps[fontType]["font-family"]}
        fontSize={LetterFontProps[fontType]["font-size"].PHOTO_POSTCARD}
      />
      <HiddenFileInput ref={fileInputRef} type="file" accept="image/*, .heic" onChange={handleImageChange} />
      {!imgGetter && <UploadButton onClick={handleFileInputClick}></UploadButton>}
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
  margin: 0 auto;
  position: relative;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const LetterText = styled.textarea<FontType>`
  position: absolute;
  left: 150px;
  top: 6px;
  width: 140px;
  height: 205px;
  line-height: 24px;
  box-sizing: border-box;
  background-color: transparent;
  resize: none;
  border-radius: 5px;
  padding: 5px;
  overflow: hidden;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: ${props => (props.fontSize ? props.fontSize : "14.5px")};
  font-family: ${props => (props.fontFamily ? props.fontFamily : "Pretendard-R")};
`;

const LetterImgPreview = styled.img`
  position: absolute;
  top: 18px;
  left: 17px;
  width: 122px;
  height: 164px;
  object-fit: fill;
  z-index: 10;
  &:hover {
    opacity: 0.8; // 호버 효과 추가 (선택사항)
  }
`;

const UploadButton = styled.div`
  position: absolute;
  top: 18px;
  left: 17px;
  width: 122px;
  height: 164px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  z-index: 20;
`;
