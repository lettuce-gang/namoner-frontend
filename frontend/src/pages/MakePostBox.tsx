import React, { useState } from "react";
import Header from "../components/Header.tsx";
import styled from "styled-components";
import CustomButton from "../components/CustomButton.tsx";

function MakePostBox() {
  const [postBoxName, setPostBoxName] = useState("");
  return (
    <div>
      <Header isFull={true} />
      <Container>
        <img src="/img/makePostBox-img.svg" width={145} height={145} />
        <span>{postBoxName.length === 0 ? "우체통의 이름을 정해주세요!" : `${postBoxName}님의 우체통`}</span>
        <input type="text" placeholder="닉네임을 입력해주세요" maxLength={6} value={postBoxName} onChange={(e)=>setPostBoxName(e.target.value)} />
      </Container>
      <ButtonContainer>
      <CustomButton
          width="100%"
          height="54px"
          backgroundColor={postBoxName.length === 0 ? "#B9B9B9" : "#4361EE"}
          fontFamily="Pretendard-B"
          fontSize="18px"
          border="none"
          borderRadius="50px"
          text="우체통 생성하기"
          textColor="white"
        />

      </ButtonContainer>
    </div>
  );
}

export default MakePostBox;

const Container = styled.div`
margin-top: 100px;
/* height: 100vh; */
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;
  align-items: center;
  span {
    color: #4361ee;
    text-align: center;
    font-family: "Pretendard-B";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px; /* 138.889% */
    letter-spacing: -0.27px;
  }
  input {
    border-radius: 10px;
    border: 1px solid #e9e9e9;
    background: #fff;
    color: #797979;
    font-family: "Pretendard-R";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 90%;
    padding:0 16px;
    height: 54px;
  }
`;

const ButtonContainer = styled.div`
margin-top:240px;
`