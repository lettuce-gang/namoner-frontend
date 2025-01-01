import React from "react";
import Header from "../components/Header.tsx";
import styled from "styled-components";
import CustomButton from "../components/CustomButton.tsx";
import { useNavigate } from "react-router";

function ErrorPage() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
  return (
    <>
      <Header isFull={true} />
    <Wrapper>
      <Container>
        <img src="/img/error-img.svg" width={66} height={69} />
        <p>404 Error</p>
        <span>페이지를 찾을 수 없습니다</span>
      </Container>
      <ButtonContainer>
        <CustomButton
          width="100%"
          height="54px"
          backgroundColor="#4361EE"
          fontFamily="Pretendard-B"
          fontSize="18px"
          borderRadius="50px"
          text="이전 페이지"
          textColor="white"
          border="none"
          onClick={goBack}
        />
      </ButtonContainer>
    </Wrapper>
    </>
  );
}

export default ErrorPage;

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    padding-top: 188px;
`

const ButtonContainer = styled.div`
  margin-top: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 80%;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: #262626;
    text-align: center;
    font-family: "Pretendard-B";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px; /* 138.889% */
    letter-spacing: -0.27px;
    margin-top: 35px;
    margin-bottom: 6px;
  }
  span {
    color: #777;
    text-align: center;
    font-family: "Pretendard-R";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.24px;
  }
`;
