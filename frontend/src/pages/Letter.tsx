import React, { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useStore } from "zustand";
import { useLetter } from "../stores/useLetter.ts";
import Header from "../components/Header.tsx";
import { LetterPaperProps } from "../type/LetterPaperProps.ts";
import { LetterFontProps } from "../type/LetterFontProps.ts";

type LetterInfoType = {
  "font-family": string;
  "font-size": string;
  letterBackImg: string;
};

function Letter() {
  const { letterId } = useParams<{ letterId: string }>() as { letterId: string };
  const { letter, getLetter } = useStore(useLetter);
  useEffect(() => {
    getLetter(letterId);
  }, [letterId]);
  return (
    <>
      {!letter && <div>wait img</div>}
      {letter && (
        <>
          <Header isFull={false} />
          <Wrapper>
            <SenderBox>
              <span>To. </span>
              <NameBox>{letter?.letterReceiver}</NameBox>
            </SenderBox>
            <LetterPaper
              font-family={LetterFontProps[`${letter?.fontType}`]["font-family"]}
              font-size={LetterFontProps[`${letter?.fontType}`]["font-size"]}
              letterBackImg={LetterPaperProps[`${letter?.letterPaperType}`]["imgUrl"]}
            >
              {letter?.message}
            </LetterPaper>
            <ReceiverBox>
              <span>From. </span>
              <NameBox>{letter?.letterReceiver}</NameBox>
            </ReceiverBox>
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
  height: 40rem;
  background-color: white;
  border-radius: 12px;
  padding: 23px 37px 26px 37px;
  box-sizing: border-box;
  gap: 12px;
  position: relative;
  margin-top: 40px;
`;

const LetterPaper = styled.div<LetterInfoType>`
  width: 100%;
  height: 340px;
  max-height: 703px;
  overflow-y: auto;
  border: 1.5px solid #e9e9e9;
  background-image: ${props => `url(${props["letterBackImg"]})`};
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
