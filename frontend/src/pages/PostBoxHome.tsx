import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.tsx";
import styled from "styled-components";
import CustomButton from "../components/CustomButton.tsx";
import LoginPopup from "../components/popup/LoginPopup.tsx";
import ViewPostBoxPopup from "../components/popup/ViewPostBoxPopup.tsx";
import { useStore } from "zustand";
import { usePostBox } from "../stores/usePostBox.ts";
import { useUserInfo } from "../stores/useUserInfo.ts";
import { useSendLetters } from "../stores/useSendLetters.ts";

function PostBoxHome() {
  const { userId } = useParams<{ userId: string }>() as { userId: string };
  const { getPostBoxInfo, postboxName } = useStore(usePostBox);
  const { isUserLogin } = useStore(useUserInfo);
  const { setLetterWriteStep } = useStore(useSendLetters);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigator = useNavigate();
  const PostBoxImgByTime = () => {
    const rootPath = "/img/postbox/postbox-";
    const date = new Date();
    const hour = date.getHours();
    if (12 <= hour && hour < 18) {
      return rootPath + "afternoon.svg";
    } else if (0 <= hour && hour <= 6) {
      return rootPath + "night.svg";
    } else {
      return rootPath + "dawn.svg";
    }
  };
  useEffect(() => {
    getPostBoxInfo(userId);
    setLetterWriteStep(1);
  }, [userId]);
  return (
    <>
      <Wrapper>
        {isPopupOpen && !isUserLogin && <LoginPopup userId={userId} handlePopup={setIsPopupOpen} />}
        <Header isFull={true} />
        <PostBox>
          <PostBoxTitle>{postboxName ? `${postboxName}의 우체통` : "우체통 로딩 중..."}</PostBoxTitle>
          <PostBoxImg src={PostBoxImgByTime()} onClick={() => navigator(`/postbox/${userId}/mailbox`)} />
          <p>우체통을 눌러 편지를 확인해보세요!</p>
        </PostBox>
        <ButtonContainer>
          <CustomButton
            fontFamily="Pretendard-B"
            text="편지쓰기"
            textColor="white"
            width="100%"
            height="54px"
            borderRadius="50px"
            onClick={() => setIsPopupOpen(true)}
          />
        </ButtonContainer>
      </Wrapper>
    </>
  );
}

export default PostBoxHome;

const Wrapper = styled.div`
  /* text-align: center; */
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

const PostBoxImg = styled.img`
  width: 277px;
  height: 277px;
  cursor: pointer;
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-60%); */
`;

const PostBoxTitle = styled.span`
  /* transform: translate(-50%, -80%); */
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
