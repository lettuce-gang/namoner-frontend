import React, { useEffect, useState } from "react";
import Header from "../components/Header.tsx";
import styled from "styled-components";
import { useNaverLogin } from "../stores/useNaverLogin.ts";
import { useStore } from "zustand";
import Toggle from '../components/Toggle.tsx';
import InfoPopup from '../components/popup/InfoPopup.tsx';
import { useNavigate } from "react-router-dom";
import { useUserConfig } from "../stores/useUserConfig.ts";

function Configuration() {
  const { startLogin } = useStore(useNaverLogin);
  const { getUserConfig, setUserConfig, config } = useStore(useUserConfig);
  const [dialogInfo, setDialogInfo] = useState<{
    isOpen: boolean;
    message: React.ReactNode;
    subMessage?: React.ReactNode;
  }>({
    isOpen: false,
    message: '',
    subMessage: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    getUserConfig();
  }, []);

  const handleInfoClick = (type: 'mailbox' | 'pause' | 'count') => {
    const dialogContents = {
      mailbox: {
        message: <>타인이 내 번호를 검색했을 때의<br/>내 우체통 노출 여부를 설정할 수 있어요.</>,
        subMessage: <>우체통 비공개 시, URL을 통해서만 편지를 받을 수 있어요.</>
      },
      pause: {
        message: <>편지 수신을 일시적으로 정지할 수 있어요.<br/>정지 유무와 관계 없이 편지는 작성 가능해요.</>,
        subMessage: <>수신 정지 시, 내 홈에서 '편지쓰기' 기능이 비활성화되어요.</>
      },
      count: {
        message: <>우체통에 노출되고 있는 편지의 수를<br/>숨길 수 있어요.</>,
        subMessage: <>편지 개수는 <b>내 편지함</b>에서 확인할 수 있어요.</>
      }
    };

    setDialogInfo({
      isOpen: true,
      ...dialogContents[type]
    });
  };

  return (
    <>
      <Header headerText="환경설정" isBack={true}/>
      <Wrapper>
        <SettingsSection>
          <SectionTitle>서비스 설정</SectionTitle>
          <SettingItem>
            <SettingLabel>
              우체통 공개
              <InfoIcon onClick={() => handleInfoClick('mailbox')}>i</InfoIcon>
            </SettingLabel>
            <Toggle 
              isOn={config?.userConfig?.showPostbox} 
              onToggle={() => setUserConfig({ showPostbox: !config?.userConfig?.showPostbox })} 
            />
          </SettingItem>
          <SettingItem>
            <SettingLabel>
              수신 일시 정지
              <InfoIcon onClick={() => handleInfoClick('pause')}>i</InfoIcon>
            </SettingLabel>
            <Toggle 
              isOn={config?.userConfig?.receiveLetter} 
              onToggle={() => setUserConfig({ receiveLetter: !config?.userConfig?.receiveLetter })} 
            />
          </SettingItem>
          <SettingItem>
            <SettingLabel>
              수신 편지 개수 공개
              <InfoIcon onClick={() => handleInfoClick('count')}>i</InfoIcon>
            </SettingLabel>
            <Toggle 
              isOn={config?.userConfig?.showLetterCount} 
              onToggle={() => setUserConfig({ showLetterCount: !config?.userConfig?.showLetterCount })} 
            />
          </SettingItem>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>기타</SectionTitle>
          <WithdrawLink onClick={() => navigate('/withdraw')}>
            회원탈퇴
          </WithdrawLink>
        </SettingsSection>
      </Wrapper>

      <InfoPopup
        isOpen={dialogInfo.isOpen}
        onClose={() => setDialogInfo(prev => ({ ...prev, isOpen: false }))}
        message={dialogInfo.message}
        subMessage={dialogInfo.subMessage}
      />
    </>
  );
}

export default Configuration;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding-top: 5vh;
`;

const SettingsSection = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #262626;
  font-family: "Pretendard-M";
  font-size: 16px;
  margin-bottom: 16px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F2F2F2;
`;

const SettingLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #262626;
  font-family: "Pretendard-M";
  font-size: 15px;
`;

const InfoIcon = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #E8E8E8;
  color: #777;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: "Pretendard-R";
  cursor: pointer;
`;

const WithdrawLink = styled.a`
  color: #777;
  font-family: "Pretendard-R";
  font-size: 15px;
  text-decoration: none;
  display: block;
  padding: 12px 0;
  cursor: pointer;
`;
