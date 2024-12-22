import React from 'react';
import styled from "styled-components";
import CustomButton from "../components/CustomButton.tsx";
import { useNavigate } from "react-router-dom";

function LetterSendFinish() {
    const navigator = useNavigate();
    const handleNavigate = () => {
        navigator("/");
    }
    return (
        <Wrapper>
            <EnvelopeImg src="/img/letterEnvelope.svg" />
            <Container>
                <img src="/img/sendFinishIcon.svg" alt="icon" width={30} height={30}/>
                <span>전송 완료!</span>
            </Container>
            <ButtonContainer>
                <CustomButton fontFamily="Pretendard-B" text="홈으로 가기" textColor="white" width="90%" height="54px" borderRadius="50px" style={{position:"absolute", top:"85%"}} onClick={()=>handleNavigate()}/>
            </ButtonContainer>
        </Wrapper>
    );
}

export default LetterSendFinish;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40rem;
  background-color: #f0f1f5;
  border-radius: 12px;
  padding: 23px 37px 26px 37px;
  box-sizing: border-box;
  gap: 12px;
  position: relative;
`;

const EnvelopeImg = styled.img`
  margin-top: 7em;
  width: 100%;
  height: 170px;
  /* border-radius: 10px;
  border: 1px solid #e9e9e9;
  background: #fff;
  padding: 20px; */
  /* box-sizing: border-box; */
`;

const Container = styled.div`
margin-top:2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:10px;
    span {
        font-family: "Pretendard-B";
        font-size:20px;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`