import React, { useState } from "react";
import styled from "styled-components";
import SelectTab from "../components/SelectTab.tsx";
import { LetterPaperProps } from "../type/LetterPaperProps.ts";
import PreviewLetter from "../components/LetterPaper/PreviewLetter.tsx";
import { useStore } from "zustand";
import { useSendLetters } from "../stores/useSendLetters.ts";

function SelectFrame() {
    const {letterPaperType, fontType} = useStore(useSendLetters);
    const [tempSelectedPaper, setTempSelectedPaper] = useState(letterPaperType);
    const [tempSelectedFont, setTempSelectedFont] = useState(fontType);
  
  return (
    <Container>
      <PreviewLetter fontType={tempSelectedFont} paperType={tempSelectedPaper} />     
      <SelectTab tempSelectedPaper={tempSelectedPaper} setTempSelectedPaper={setTempSelectedPaper} tempSelectedFont={tempSelectedFont} setTempSelectedFont={setTempSelectedFont}/>
    </Container>
  );
}

export default SelectFrame;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`