import React, { useState } from "react";
import styled from "styled-components";
import PaperSelectContainer from "./PaperSelectContainer.tsx";
import FontSelectContainer from "./FontSelectContainer.tsx";

function SelectTab() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [tempSelectedPaper, setTempSelectedPaper] = useState("1");
  const [tempSelectedFont, setTempSelectedFont] = useState("1");
  const TabViewController = () => {
    switch (selectedTab) {
      case 1:
        return <PaperSelectContainer getPaper={tempSelectedPaper} setPaper={setTempSelectedPaper} getFont={tempSelectedFont} setFont={setTempSelectedFont}/>;
      case 2:
        return <FontSelectContainer getPaper={tempSelectedPaper} setPaper={setTempSelectedPaper} getFont={tempSelectedFont} setFont={setTempSelectedFont}/>;
      default:
        return null;
      }
  };
  return (
    <Wrapper>
      <TabSelector>
        <Tab tab={1 == selectedTab} onClick={() => setSelectedTab(1)}>
          편지지
        </Tab>
        <Tab tab={2 == selectedTab} onClick={() => setSelectedTab(2)}>
          글씨체
        </Tab>
      </TabSelector>
      {TabViewController()}
    </Wrapper>
  );
}

export default SelectTab;

const Wrapper = styled.div`
  margin-top: 32px;
`;

const TabSelector = styled.div`
  display: flex;
  height: 33px;
`;

const Tab = styled.div<{ tab: boolean }>`
  display: flex;
  width: 82px;
  height: 33px;
  border-radius: 10px 10px 0px 0px;
  font-size: 14px;
  background-color: ${({ tab }) => (tab ? "white" : "#D9D9D9")};
  font-family: ${({ tab }) => (tab ? "Pretendard-B" : "Pretendard-R")};
  color: ${({ tab }) => (tab ? "#262626" : "#777")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
