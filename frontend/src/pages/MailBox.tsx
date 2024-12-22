import React, { useEffect, useState } from "react";
import Header from "../components/Header.tsx";
import { useParams } from "react-router";
import styled from "styled-components";
import { useStore } from "zustand";
import { useLetterList } from "../stores/useLetterList.ts";
import ReceivedMailContainer from "../components/ReceivedMailContainer.tsx";
import SendMailContainer from "../components/SendMailContainer.tsx";

const testData = [
  {
    id: "1fesnjes3552", // 편지 고유 ID
    letterSender: "이승현", // 편지 전송자
    letterReceiver: "최승용", // 편지 수신자
    receiveDate: "2025-12-22", // 편지 수신 날짜
    isRead: false, // 읽음 여부
    fontType: "Pretendard_R", // 폰트 타입
    letterPaperType: "GRAPH_PAPER", // 편지지 타입
    letterType: "normal", // 편지 타입(일반, 예약)
  },
  {
    id: "1fesnjes3551", // 편지 고유 ID
    letterSender: "정다혜", // 편지 전송자
    letterReceiver: "황경주", // 편지 수신자
    receiveDate: "2025-12-25", // 편지 수신 날짜
    isRead: false, // 읽음 여부
    fontType: "KCC", // 폰트 타입
    letterPaperType: "GRAPH_PAPER", // 편지지 타입
    letterType: "reserved", // 편지 타입(일반, 예약)
  },
];

function MailBox() {
  const { userId } = useParams<{ userId: string }>() as { userId: string };
  const { letterList, getLetterList } = useStore(useLetterList);
  const [selectedTab, setSelectedTab] = useState(1);
  // Hamburger 에서 Back Key 고려해야 함
  useEffect(() => {
    if (selectedTab === 1) {
      getLetterList(userId);
    } else {
      // 내가 보낸 편지함
    }
  }, [selectedTab]);
  return (
    <div>
      <Header isFull={false} />
      <Container>
        <TabSelector>
          <Tab tab={1 == selectedTab} onClick={() => setSelectedTab(1)}>
            나에게 온 편지함
          </Tab>
          <Tab tab={2 == selectedTab} onClick={() => setSelectedTab(2)}>
            내가 보낸 편지함
          </Tab>
        </TabSelector>
        {selectedTab === 1 ? <ReceivedMailContainer letters={letterList} /> : <SendMailContainer />}
      </Container>
    </div>
  );
}

export default MailBox;

const Container = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const TabSelector = styled.div`
  display: flex;
  height: 44px;
`;

const Tab = styled.div<{ tab: boolean }>`
  display: flex;
  width: 121px;
  height: 44px;
  border-radius: 10px 10px 0px 0px;
  font-size: 14px;
  background-color: ${({ tab }) => (tab ? "#F0F1F5;" : "#D8DBE3;")};
  font-family: ${({ tab }) => (tab ? "Pretendard-M" : "Pretendard-R")};
  color: ${({ tab }) => (tab ? "#262626" : "#777")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

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
