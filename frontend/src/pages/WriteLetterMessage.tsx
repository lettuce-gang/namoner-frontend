import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useStore } from "zustand";
import { useSendLetters } from "../stores/useSendLetters.ts";
import { LetterFontProps } from "../type/LetterFontProps.ts";
import CustomButton from "../components/CustomButton.tsx";

type FontType = {
  "font-family": string;
  "font-size": string;
};

function WriteLetterMessage() {
  const { fontType, letterPaperType, setLetterInfo, setLetterWriteStep } =
    useStore(useSendLetters);
  const [tempSender, setTempSender] = useState("");
  const [tempReceiver, setTempReceiver] = useState("");
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
    <Wrapper>
      <SenderBox>
        <span>To.</span>
        <input type="text" maxLength={9} value={tempReceiver} onChange={e => setTempReceiver(e.target.value)} />
      </SenderBox>
      <LetterPaper
        ref={textareaRef}
        onInput={handleInput}
        font-family={LetterFontProps[fontType]["font-family"]}
        font-size={LetterFontProps[fontType]["font-size"]}
      />
      <ReceiverBox>
        <span>From.</span>
        <input type="text" maxLength={9} value={tempSender} onChange={e => setTempSender(e.target.value)} />
      </ReceiverBox>
      <CustomButton fontFamily="Pretendard-B" text="작성완료" textColor="white" width="90%" height="54px" borderRadius="50px" style={{position:"absolute", top:"85%"}} onClick={()=>{
        setLetterWriteStep(3);
        setLetterInfo(tempSender, tempReceiver, textareaRef.current?.value as string)
      }}/>
    </Wrapper>
  );
}

export default WriteLetterMessage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40rem;
  background-color: white;
  border-radius: 12px;
  padding: 23px 37px 26px 37px;
  box-sizing: border-box;
  gap: 12px;
  position: relative;
`;

const LetterPaper = styled.textarea<FontType>`
  width: 100%;
  height: 340px;
  max-height: 703px;
  overflow-y: auto;
  border: 1.5px solid #e9e9e9;
  background-image: url("/img/letterPapers/letterPaper_2.svg");
  resize: none;
  background-attachment: local;
  background-size: 277px 703px;
  background-repeat: repeat-x;
  padding: 24px;
  padding-top: 20px;
  box-sizing: border-box;
  line-height: 30px;
  font-size: ${props => (props["font-size"] ? props["font-size"] : "Pretendard-R")};
  font-family: ${props => (props["font-family"] ? props["font-family"] : "14.5px")};
  white-space: pre-wrap; /* 줄 바꿈 보존 */
  word-wrap: break-word; /* 긴 단어 줄바꿈 */
`;

const SenderBox = styled.div`
  align-self: baseline;
  span {
    font-family: "Pretendard-B";
    font-size: 16px;
    color: #262626;
  }
  input {
    height: 34.844px;
    padding: 0px 10.324px 0px 17px;
    align-items: center;
    gap: 6.453px;
    align-self: stretch;
    border-radius: 6.453px;
    border: 0.645px solid #e9e9e9;
    background: #fff;
    margin-left: 1em;
    font-family: "Pretendard-R";
    font-size: 14px;
    color: #797979;
  }
`;

const ReceiverBox = styled.div`
  align-self: self-end;
  span {
    font-family: "Pretendard-B";
    font-size: 16px;
    color: #262626;
  }
  input {
    height: 34.844px;
    padding: 0px 10.324px 0px 17px;
    align-items: center;
    gap: 6.453px;
    align-self: stretch;
    border-radius: 6.453px;
    border: 0.645px solid #e9e9e9;
    background: #fff;
    margin-left: 1em;
    font-family: "Pretendard-R";
    font-size: 14px;
    color: #797979;
  }
`;
