import React, { useRef, useState } from "react";
import styled from "styled-components";
import SelectFrame from "./SelectFrame.tsx";
import WriteLetterMessage from "./WriteLetterMessage.tsx";
import { useStore } from "zustand";
import { useSendLetters } from "../stores/useSendLetters.ts";
import WriteLetterFinish from "./WriteLetterFinish.tsx";
import LetterSendFinish from "./LetterSendFinish.tsx";

type FontType = {
  "font-family": string;
  "font-size": string;
};


function WriteLetter() {
  const {letterWriteStep, setLetterWriteStep} = useStore(useSendLetters);
  const ViewController = () => {
    switch (letterWriteStep) {
      case 1:
        return <SelectFrame />;
        break;
      case 2:
        return <WriteLetterMessage />;
        break;
      case 3:
        return <WriteLetterFinish />;
        break;
      case 4:
        return <LetterSendFinish />;
        break;
    }
  };
  return (
    <>
      <HeadController>
        <img src="/img/logo.svg" />
      </HeadController>
      <ViewController />
    </>
  );
}

export default WriteLetter;


const HeadController = styled.div`
  /* width: 100%; */
  height: 55px;
  padding: 17px;
    text-align: center;
`;
