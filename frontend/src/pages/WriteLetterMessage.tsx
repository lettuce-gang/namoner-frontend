import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useStore } from "zustand";
import { useSendLetters } from "../stores/useSendLetters.ts";
import { LetterFontProps } from "../type/LetterFontProps.ts";
import CustomButton from "../components/CustomButton.tsx";
import GraphPaper from "../components/LetterPaper/GraphPaper.tsx";
import BasicNote from "../components/LetterPaper/BasicNote.tsx";
import Postcard from "../components/LetterPaper/Postcard.tsx";
import Polaroid from "../components/LetterPaper/Polaroid.tsx";

type FontType = {
  "font-family": string;
  "font-size": string;
};

function WriteLetterMessage() {
  const { fontType, letterPaperType, setLetterInfo, setLetterWriteStep } =
    useStore(useSendLetters);
  const [tempSender, setTempSender] = useState("");
  const [tempReceiver, setTempReceiver] = useState("");
  const [tempMessage, setTempMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const LetterPaperHandler = (letterPaperType: string) => {
    switch(letterPaperType) {
      case "GRAPH_PAPER":
        return <GraphPaper getter={tempMessage} setter={setTempMessage}/>
        break
      case "BASIC_NOTE":
        return <BasicNote getter={tempMessage} setter={setTempMessage} />
        break
      case "PHOTO_POSTCARD":
        return <Postcard getter={tempMessage} setter={setTempMessage} />
        break
      case "POLAROID":
        return <Polaroid textGetter={tempMessage} textSetter={setTempMessage} imgGetter={preview} imgSetter={setPreview}/>
        break
    }
  }

  return (
    <Wrapper>
      <SenderBox>
        <span>To.</span>
        <input type="text" maxLength={9} value={tempReceiver} onChange={e => setTempReceiver(e.target.value)} />
      </SenderBox>
      {LetterPaperHandler(letterPaperType)}
      <ReceiverBox>
        <span>From.</span>
        <input type="text" maxLength={9} value={tempSender} onChange={e => setTempSender(e.target.value)} />
      </ReceiverBox>
      <CustomButton fontFamily="Pretendard-B" text="작성완료" textColor="white" width="90%" height="54px" borderRadius="50px" style={{position:"absolute", top:"85%"}} onClick={()=>{
        setLetterWriteStep(3);
        setLetterInfo(tempSender, tempReceiver, tempMessage)
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
  height: calc(100vh - 55px - 32px);
  background-color: white;
  border-radius: 12px;
  padding: 23px 37px 26px 37px;
  box-sizing: border-box;
  gap: 12px;
  position: relative;
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
