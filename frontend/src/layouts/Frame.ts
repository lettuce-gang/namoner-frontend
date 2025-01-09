import styled from "styled-components";

const Frame = styled.div`
  width: 100vw;
  /* height: calc(var(--vh, 1vh) * 100); */
  height: 100vh;
  padding: 0 24px;
  background-color: #F9FAFC;
  position: relative;
`;


const FrameContent = styled.div`
  position: absolute; /* Frame 기준으로 위치 설정 */
  top: 0; /* 원하는 위치 값 */
  left: 0; /* 원하는 위치 값 */
  width: 100%;
  height: 100%;
`;

export { Frame, FrameContent };
