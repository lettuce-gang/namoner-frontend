import React, { useState } from "react";
import styled from "styled-components";
import { useStore } from "zustand";
import { useNaverLogin } from "../stores/useNaverLogin.ts";
import { useUserInfo } from "../stores/useUserInfo.ts";
import { useNavigate } from "react-router";
import api from "../auth/api.ts";
import { useUserAction } from "../stores/useUserAction.ts";

interface SideTabProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
}

function SideTab({ isOpen, onClose, isLoggedIn }: SideTabProps) {
  const { postBoxName, setPostBoxName } = useStore(useNaverLogin);
  const { logout, userId } = useStore(useUserInfo);
  const navigator = useNavigate();
  const { moveMyPostbox } = useStore(useUserAction);
  const [isEditing, setIsEditing] = useState(false);
  const [newPostBoxName, setNewPostBoxName] = useState(postBoxName);
  const URLS = {
    PrivacyPolicy: "https://profuse-tea-75d.notion.site/1730ec71df638010b95aef1d3d6e79c6",
    FAQ: "https://profuse-tea-75d.notion.site/FAQ-1750ec71df63804b8b54cb8050f9b201",
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const Logout = () => {
    logout();
    navigator("/");
  };
  const menuItems = isLoggedIn ? (
    <>
      <MenuTitle>
        {isEditing ? (
          <FlexBox>
            <NameChangeInput type="text" value={newPostBoxName} onChange={e => setNewPostBoxName(e.target.value)} maxLength={9} />
            <Span_
              onClick={() => {
                setPostBoxName(newPostBoxName);
                setIsEditing(false);
              }}
              style={{ cursor: "pointer" }}
            >
              변경
            </Span_>
          </FlexBox>
        ) : (
          <>
            {postBoxName}
            <img src="/img/icon-edit.svg" width={16} onClick={handleEditClick} style={{ cursor: "pointer", marginLeft: 5 }} />
          </>
        )}
      </MenuTitle>

      <Divider />
      <MenuItem>편지 쓰기</MenuItem>
      <MenuItem onClick={() => moveMyPostbox(navigator)}>내 편지함</MenuItem>
      <MenuItem onClick={() => navigator(`/config`)}>환경설정</MenuItem>
      <BottomBox>
        <Divider />
        <BottomMenuItem onClick={() => window.open(URLS.FAQ)}>FAQ</BottomMenuItem>
        <BottomMenuItem>고객센터</BottomMenuItem>
        <BottomMenuItem onClick={Logout}>로그아웃</BottomMenuItem>
      </BottomBox>
      <Footer>
        <span onClick={() => window.open(URLS.PrivacyPolicy)}>개인정보처리방침 | 이용약관</span>
      </Footer>
    </>
  ) : (
    <>
      <MenuTitle style={{ cursor: "pointer" }} onClick={() => navigator("/signup")}>
        로그인/회원가입
      </MenuTitle>
      <Divider />
      <MenuItem>편지 쓰기</MenuItem>

      <BottomBox>
        <Divider />
        <BottomMenuItem onClick={() => window.open(URLS.FAQ)}>FAQ</BottomMenuItem>
        <BottomMenuItem>고객센터</BottomMenuItem>
      </BottomBox>
      <Footer>
        <span onClick={() => window.open(URLS.PrivacyPolicy)}>개인정보처리방침 | 이용약관</span>
      </Footer>
    </>
  );

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <SideMenu isOpen={isOpen}>{menuItems}</SideMenu>
    </>
  );
}

const MenuTitle = styled.div`
  color: #262626;
  font-family: "Pretendard_B";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 40px 16px;
  margin-top: 48px;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  font-size: 18px;
  font-family: "Pretendard_R";
  color: #262626;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
const BottomMenuItem = styled.div`
  padding: 5px 5px;
  cursor: pointer;
  color: #777;
  font-family: "Pretendard_R";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px; /* 143.75% */
  letter-spacing: -0.24px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 8px 0;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 16px;
  font-size: 12px;
  padding: 16px;
  color: #777;
  span {
    cursor: pointer;
  }
`;

const BottomBox = styled.div`
  position: absolute;
  width: 90%;
  bottom: 150px;
  left: 16px;
  padding: 16px;
  color: #777;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 40;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`;

const SideMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 65%;
  height: 100%;
  background-color: white;
  z-index: 50;
  transform: translateX(${props => (props.isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  padding: 0px 24px;
  box-sizing: border-box;
`;

const NameChangeInput = styled.input`
  width: 140px;
  height: 35px;
  padding: 0px 10.324px 0px 17px;
  align-items: center;
  gap: 6.45px;
  margin-left: -10px;
  border: none;
  border-radius: 6.453px;
  background: #e9e9e9;
`;

const Span_ = styled.span`
  color: #777;
  width: 30px;
  font-family: "Pretendard-R";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 8px;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

export default SideTab;
