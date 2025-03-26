import React from "react";
import styled from "styled-components";

interface BubbleMsgBoxProps {
  message: string;
}

const BubbleMsgBox: React.FC<BubbleMsgBoxProps> = ({ message }) => {
  return <BubbleBox>{message}</BubbleBox>;
};

export default BubbleMsgBox;

const BubbleBox = styled.div`
  background-color: #c7d9ff; /* 연한 파란색 */
  border-radius: 10px;
  padding: 15px;
  position: relative;
  width: 170px;
  min-height: 70px;
  margin: 10px 0;
  font-family: "Pretendard_R", sans-serif; /* 원하는 폰트로 변경 */
  color: #262626; /* 글자 색상 */
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: pre-line;
  overflow-wrap: break-word; /* 긴 단어가 줄을 넘지 않도록 처리 */
  &:after {
    content: "";
    position: absolute;
    bottom: 100%; /* 버블 아래쪽 */
    left: 135px; /* 위치 조정 */
    margin-left: -2px; /* 삼각형 위치 조정 */
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #c7d9ff transparent; /* 삼각형 색상 */
  }
`;
