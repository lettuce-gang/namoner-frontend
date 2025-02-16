import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { useStore } from "zustand";
import { useLetter } from "../stores/useLetter.ts";
import Header from "../components/Header.tsx";
import GraphPaper from "../components/ViewLetterPaper/GraphPaper.tsx";
import BasicNote from "../components/ViewLetterPaper/BasicNote.tsx";
import Polaroid from "../components/ViewLetterPaper/Polaroid.tsx";
import Postcard from "../components/ViewLetterPaper/Postcard.tsx";
import CheckPattern from "../components/ViewLetterPaper/CheckPattern.tsx";
import CustomButton from "../components/CustomButton.tsx";
import { useSendLetters } from "../stores/useSendLetters.ts";

function Letter() {
  const { letterId } = useParams<{ letterId: string }>() as { letterId: string };
  const { letter, getLetter } = useStore(useLetter);
  const { setLetterInfo } = useStore(useSendLetters);
  const navigator = useNavigate();
  const LetterPaperHandler = (letterPaperType: string) => {
    if (!letter) {
      alert("다시 시도해주세요.");
      return null;
    }

    switch (letterPaperType) {
      case "GRAPH_PAPER":
        return <GraphPaper letter={letter} />;
        break;
      case "BASIC_NOTE":
        return <BasicNote letter={letter} />;
        break;
      case "POLAROID":
        return <Polaroid letter={letter} />;
        break;
      case "PHOTO_POSTCARD":
        return <Postcard letter={letter} />;
        break;
      case "CHECK_PAPER":
        return <CheckPattern letter={letter} />;
        break;
    }
  };
  const ReplyLetter = () => {
    return (
      <>
        <DivideLine />
        <SenderBox>
          <span>To. </span>
          <NameBox>{letter?.reply.letterReceiver}</NameBox>
        </SenderBox>
        {LetterPaperHandler(letter?.reply.letterPaperType as string)}
        <ReceiverBox>
          <span>From. </span>
          <NameBox>{letter?.reply.letterSender}</NameBox>
        </ReceiverBox>
      </>
    );
  };
  useEffect(() => {
    getLetter(letterId);
  }, [letterId]);
  return (
    <>
      {!letter && <div>wait img</div>}
      {letter && (
        <>
          <Header isFull={false} isBack={true}/>
          <Wrapper>
            <SenderBox>
              <span>To. </span>
              <NameBox>{letter.letterReceiver}</NameBox>
            </SenderBox>
            {LetterPaperHandler(letter.letterPaperType as string)}
            <ReceiverBox>
              <span>From. </span>
              <NameBox>{letter.letterSender}</NameBox>
            </ReceiverBox>
            {!letter.isCanReply ? (
              <ButtonContainer>
                <CustomButton
                  fontFamily="Pretendard-B"
                  text="답장하기"
                  textColor="white"
                  width="100%"
                  height="54px"
                  borderRadius="50px"
                  onClick={() => {
                    setLetterInfo(letter.letterReceiver, letter.letterSender, "");
                    navigator(`/writeLetter/${letterId}/reply`);
                  }}
                />
              </ButtonContainer>
            ) : (
              ReplyLetter()
            )}
          </Wrapper>
        </>
      )}
    </>
  );
}

export default Letter;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 23px 37px 26px 37px;
  box-sizing: border-box;
  gap: 12px;
  position: relative;
  margin-top: 40px;
`;

const SenderBox = styled.div`
  align-self: baseline;
  :first-child {
    font-family: "Pretendard-B";
    font-size: 16px;
    color: #262626;
  }
`;

const ReceiverBox = styled.div`
  align-self: self-end;
  :first-child {
    font-family: "Pretendard-B";
    font-size: 16px;
    color: #262626;
  }
`;

const NameBox = styled.span`
  height: 34.844px;
  align-items: center;
  align-self: stretch;
  font-family: "Pretendard-M";
  font-size: 14px;
  color: #262626;
`;

const ButtonContainer = styled.div`
  position: absolute;
  width: 85%;
  bottom: 25px;
`;

const DivideLine = styled.div`
width: 100%;
height: 1px;
  border: 1px solid #EFEFEF;
  margin: 20px 0px;
`