import React, { useRef } from "react";
import styled from "styled-components";
import heic2any from "heic2any";

export interface WriteLetterProps {
  textGetter: string;
  textSetter: React.Dispatch<React.SetStateAction<string>>;
  imgGetter: string | null;
  imgSetter: React.Dispatch<React.SetStateAction<string | null>>;
}

function Polaroid({ textGetter, textSetter, imgGetter, imgSetter }: WriteLetterProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type === "image/heic") {
      try {
        const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg" });
        const objectUrl = URL.createObjectURL(convertedBlob as Blob);
        console.log("url",objectUrl)
        imgSetter(objectUrl);
      } catch (conversionError) {
        console.error("HEIC 파일 변환에 실패했습니다.");
      }
    } else if (file) {
      const objectUrl = URL.createObjectURL(file);
      imgSetter(objectUrl);
    }
    console.log(imgGetter);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Wrapper>
      <LetterPaper src="/img/writeLetterPaper/polaroid-write-letter-paper.svg" />
      {imgGetter && <LetterImgPreview src={imgGetter} alt="미리보기" />}
      <LetterText value={textGetter} onChange={e => textSetter(e.target.value)} />
      {/* 숨겨진 파일 입력 */}
      <HiddenFileInput ref={fileInputRef} type="file" accept="image/*, .heic" onChange={handleImageChange} />
      {/* 파일 선택 버튼 */}
      <UploadButton onClick={handleFileInputClick}>{/* {imgGetter ? "이미지 변경" : "이미지 업로드"} */}</UploadButton>
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

const LetterText = styled.textarea`
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
`;

const LetterImgPreview = styled.img`
  position: absolute;
  top: 22px;
  left: 25px;
  width: calc(100% - 50px);
  height: calc(100% - 115px);
  object-fit: fill;
  z-index: 10;
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
