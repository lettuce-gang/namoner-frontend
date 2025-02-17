import React from "react";
import styled from "styled-components";

export const PostBoxImgByTime = (letterCount: number) => {
  let boxUrl = "/img/postbox/postbox_";
  const date = new Date();
  const hour = date.getHours();
  let bgUrl = "/img/postbox/bg_";
  if (12 <= hour && hour < 18) {
    bgUrl = bgUrl + "afternoon.svg";
  } else if (0 <= hour && hour <= 6) {
    bgUrl = bgUrl + "night.svg";
  } else {
    bgUrl = bgUrl + "dawn.svg";
  }

  if (letterCount === 0) {
    boxUrl += "1.svg";
  } else if (letterCount === 1) {
    boxUrl += "2.svg";
  } else if (letterCount === 2) {
    boxUrl += "3.svg";
  } else if (letterCount === 3 || letterCount === 4) {
    boxUrl += "4.svg";
  } else if (letterCount >= 5 && letterCount <= 9) {
    boxUrl += "5.svg";
  } else if (letterCount >= 10 && letterCount <= 15) {
    boxUrl += "6.svg";
  } else if (letterCount >= 16) {
    boxUrl += "7.svg";
  }

  return (
    <Container>
      <BackGround src={bgUrl} />
      <PostBoxImg src={boxUrl} />
      <CountCircle letterCount={letterCount}>{letterCount}</CountCircle>
    </Container>
  );
};

const Container = styled.div`
  width: 277px;
  height: 277px;
  position: relative;
`;

const BackGround = styled.img`
  width: 277px;
  height: 277px;
  position: absolute;
  top: 0;
  left: 0;
`;

const PostBoxImg = styled.img`
  width: 277px;
  height: 277px;
  position: absolute;
  top: 0;
  left: 0;
`;

const CountCircle = styled.div<{ letterCount: number }>`
  display: flex;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-radius: 17.5px;
  background: #4361ee;
  box-sizing: border-box;
  width: ${({ letterCount }) => {
    if (letterCount < 10)
      return "35px"; // 1자리 수
    else if (letterCount < 100) return "48px"; // 2자리 수
    return "51px"; // 3자리 수 이상
  }};
  position: absolute;
  left: 214px;
  top: 17px;

  color: #fff;
  text-align: center;
  font-family: "Pretendard_B";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
