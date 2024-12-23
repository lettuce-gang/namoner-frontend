import React from "react";
import styled from "styled-components";
import SelectTab from "../components/SelectTab.tsx";

function SelectFrame() {
  return (
    <Container>
      <PreviewImage src="/img/letterPapers/graph-paper.svg" width={197} height={242}/>
      <SelectTab />
    </Container>
  );
}

export default SelectFrame;

const PreviewImage = styled.img`
  margin: 0 auto;
  margin-top: 30px;

`; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`