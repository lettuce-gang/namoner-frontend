import React from "react";
import { LetterListProps } from "../stores/useLetterList.ts";
import styled from "styled-components";
import NormalLetterEnvelope from "./NormalLetterEnvelope.tsx";
import ReservedLetterEnvelope from "./ReservedLetterEnvelope.tsx";


interface ReceivedMailContainerProp {
    letters: LetterListProps[]
}

function ReceivedMailContainer({letters}: ReceivedMailContainerProp) {
  return (
    <MailListContainer>
      {letters &&
        letters.map(letter => {
          if (letter.letterType === "NORMAL") {
            return <NormalLetterEnvelope letter={letter} />;
          } else {
            return <ReservedLetterEnvelope letter={letter}/>;
          }
        })}
    </MailListContainer>
  );
}

export default ReceivedMailContainer;

const MailListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f0f1f5;
  width: 100%;
  height: calc(40rem - 44px);
  border-radius: 0px 12px 12px 12px;
  padding: 24px 30px 24px 30px;
  box-sizing: border-box;
  overflow: auto;
  > * {
    flex-shrink: 0;
  }
`;
