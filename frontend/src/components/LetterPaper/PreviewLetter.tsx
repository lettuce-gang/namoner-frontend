import React from "react";
import styled from "styled-components";
import { LetterPaperProps } from "../../type/LetterPaperProps.ts";
import { LetterFontProps } from "../../type/LetterFontProps.ts";
import { previewLetterHandler } from "../../utils/previewLetterHandler.ts";

interface PreviewLetterProps {
  fontType: string;
  paperType: string;
}

interface FontProps {
  "font-family": string;
  "font-size": string;
}


function PreviewLetter({ fontType, paperType }: PreviewLetterProps) {
  const WidthHandler = (paperType: string) => {
    switch (paperType) {
      case "POLAROID":
        return 165;
      case "PHOTO_POSTCARD":
        return 280;
      default:
        return 197;
    }
  };

  const MaxHeight = 300; // 고정 높이

  const width = WidthHandler(paperType);

  return (
    <Wrapper width={width} height={MaxHeight}>
      <PreviewImage src={previewLetterHandler(fontType, paperType)} />
    </Wrapper>
  );
}

export default PreviewLetter;

const Wrapper = styled.div<{ width: number; height: number }>`
  margin: 0 auto;
  margin-top: 30px;
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px; /* 고정된 높이 */
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* 비율 유지하며 영역에 맞춤 */
`;
