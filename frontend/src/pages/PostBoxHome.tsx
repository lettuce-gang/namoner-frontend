import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.tsx";
import styled from "styled-components";
import CustomButton from "../components/CustomButton.tsx";
import LoginPopup from "../components/popup/LoginPopup.tsx";
import { useStore } from "zustand";
import { usePostBox } from "../stores/usePostBox.ts";
import { useUserInfo } from "../stores/useUserInfo.ts";
import { useSendLetters } from "../stores/useSendLetters.ts";
import { postBoxImgHandler } from "../utils/postBoxImgHandler.tsx";
import ViewPostBoxPopup from "../components/popup/ViewPostBoxPopup.tsx";
import { useNaverLogin } from "../stores/useNaverLogin.ts";
import MissingPostBoxHome from "./MissingPostBoxHome.tsx";

function PostBoxHome() {
  const { userId } = useParams<{ userId: string }>() as { userId: string };
  const { getPostBoxInfo, isOwner, existPostBox, unreadLetterCount, postboxName } = useStore(usePostBox);
  const { isUserLogin, checkUserLogin } = useStore(useUserInfo);
  const { resetData } = useStore(useSendLetters);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBoxPopupOpen, setIsBoxPopupOpen] = useState(false);
  const navigator = useNavigate();

  const isTokenExpired = () => {
    // 필요 없을 듯 한데 ..
    const expiredTime = sessionStorage.getItem("atExpiredTime");
    if (!expiredTime) return true;

    return new Date().getTime() > new Date(expiredTime).getTime();
  };

  const popupHandler = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken && !isTokenExpired()) {
      navigator(`/writeLetter/${userId}`);
    } else {
      setIsPopupOpen(true);
    }
  };

  const ClickPostBox = () => {
    if (isOwner) {
      navigator(`/postbox/${userId}/mailbox`);
    } else {
      setIsBoxPopupOpen(true);
    }
  };

  useEffect(() => {
    getPostBoxInfo(userId);
    checkUserLogin();
    resetData();
  }, [userId, postboxName]);

  if (!existPostBox) {
    return <MissingPostBoxHome />;
  } else {
    return (
      <>
        <Wrapper>
          {isPopupOpen && <LoginPopup userId={userId} handlePopup={setIsPopupOpen} />}
          {isBoxPopupOpen && <ViewPostBoxPopup handlePopup={setIsBoxPopupOpen} />}
          <Header isFull={true} />
          <PostBox>
            <PostBoxTitle>{postboxName ? `${postboxName}의 우체통` : "우체통 로딩 중..."}</PostBoxTitle>
            <PostBoxImg onClick={ClickPostBox}>{postBoxImgHandler(unreadLetterCount)}</PostBoxImg>
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
              onClick={popupHandler}
            />
          </ButtonContainer>
        </Wrapper>
      </>
    );
  }
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

const PostBoxImg = styled.div`
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
