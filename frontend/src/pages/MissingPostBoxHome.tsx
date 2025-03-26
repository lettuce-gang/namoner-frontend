import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header.tsx";
import CustomButton from "../components/CustomButton.tsx";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import LoginPopup from "../components/popup/LoginPopup.tsx";
import BubbleMsgBox from "../components/BubbleMsgBox.tsx";

function MissingPostBoxHome() {
  const { userId } = useParams<{ userId: string }>() as { userId: string };
  const navigator = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isTokenExpired = () => {
    // 필요 없을 듯 한데 ..
    const expiredTime = sessionStorage.getItem("atExpiredTime");
    if (!expiredTime) return true;

    return new Date().getTime() > new Date(expiredTime).getTime();
  };
  const popupHandler = () => {
    // 로그인 여부 판단을 다른 방식으로 해야 할 듯..
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken && !isTokenExpired()) {
      navigator(`/writeLetter/${userId}`);
    } else {
      setIsPopupOpen(true);
    }
  };

  return (
    <Wrapper>
      {isPopupOpen && <LoginPopup userId={userId} handlePopup={setIsPopupOpen} />}
      <Header isFull={true} isShare={true} />
      <BubbleBoxContainer>
        <BubbleMsgBox message={"우체통의 주인을 \n같이 찾아주세요! 🙏"} />
      </BubbleBoxContainer>
      <PostBox>
        <PostBoxTitle>잃어버린 우체통</PostBoxTitle>
        <PostBoxImg>
          <img src="/img/postbox/missing-postbox.png" width="277px" height="277px" />
          <CountCircle>?</CountCircle>
        </PostBoxImg>
        <p>주인을 알 수 없는 우체통이에요</p>
      </PostBox>
      <ButtonContainer>
        <CustomButton
          fontFamily="Pretendard-B"
          text="편지쓰기"
          textColor="white"
          width="100%"
          height="54px"
          borderRadius="50px"
          onClick={popupHandler}
        />
      </ButtonContainer>
    </Wrapper>
  );
}

export default MissingPostBoxHome;

const Wrapper = styled.div`
  /* text-align: center; */
`;

const BubbleBoxContainer = styled.div`
  position: absolute; /* 절대 위치 지정 */
  top: 70px; /* 헤더 아래쪽에 위치 */
  right: 20px; /* 오른쪽에 고정 */
  z-index: 10; /* 다른 요소 위에 표시 */
`;

const PostBox = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  p {
    color: #777;
    font-family: "Pretendard-M";
    font-size: 16px;
  }
`;

const PostBoxImg = styled.div`
  width: 277px;
  height: 277px;
  cursor: pointer;
  position: relative;
`;

const PostBoxTitle = styled.span`
  font-family: "Pretendard-B";
  font-size: 20px;
  color: #262626;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 85%;
  left: 50%;
  width: 300px;
  transform: translateX(-50%);
`;

const CountCircle = styled.div`
  display: flex;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-radius: 17.5px;
  background: #4361ee;
  box-sizing: border-box;
  position: absolute;
  left: 214px;
  top: 17px;

  color: #fff;
  text-align: center;
  font-family: "Pretendard-B";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
