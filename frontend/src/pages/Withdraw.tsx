import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header.tsx";
import InfoPopup from "../components/popup/InfoPopup.tsx";
import CustomButton from "../components/CustomButton.tsx";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../stores/useUserInfo.ts";
import { useStore } from "zustand";

function Withdraw() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [withdrawReason, setWithdrawReason] = useState('');
  const { withdraw } = useStore(useUserInfo);

  const handleWithdraw = async () => {
    await withdraw(withdrawReason);
    setShowWithdrawPopup(true);
  };

  const handlePopupClose = () => {
    setShowWithdrawPopup(false);
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <>
      <Header isFull={false} isBack={true} />
      <Wrapper>
        <HeaderText>나모너를 탈퇴하기 전에<br/>꼭 확인해 주세요!</HeaderText>
        
        <WarningList>
          <WarningItem>
            • 회원 탈퇴 후, 개인 정보는 즉시 파기되며<br/>복구 불가해요.
          </WarningItem>
          <WarningItem>
            • 내 우체통과 주고 받은 편지는<br/><b>영구적으로 삭제</b>되어 복구할 수 없어요.
          </WarningItem>
        </WarningList>

        <ReasonSection>
          <ReasonLabel>탈퇴 사유</ReasonLabel>
          <ReasonInput 
            placeholder="더 나은 서비스 개선을 위해 사유를 입력 해주세요. (선택)"
            value={withdrawReason}
            onChange={(e) => setWithdrawReason(e.target.value)}
          />
        </ReasonSection>

        <CheckboxWrapper>
          <Checkbox
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <CheckboxLabel>
            회원 탈퇴 시 발생하는 내용을 확인했으며, 이에 동의합니다.
          </CheckboxLabel>
        </CheckboxWrapper>

        <ButtonContainer>
          <CustomButton
            width="100%"
            height="54px"
            onClick={handleWithdraw}
            disabled={!isChecked}
            backgroundColor={isChecked ? "#4B48DF" : "#D9D9D9"}
            textColor="white"
            fontFamily="Pretendard-B"
            fontSize="18px"
            border="none"
            borderRadius="50px"
            text="탈퇴하기"
          />
          <CustomButton
            width="100%"
            height="54px"
            onClick={() => navigate(-1)}
            backgroundColor="#4B48DF"
            textColor="white"
            fontFamily="Pretendard-B"
            fontSize="18px"
            border="none"
            borderRadius="50px"
            text="다음에 할게요"
          />
        </ButtonContainer>

        <InfoPopup
          isOpen={showWithdrawPopup}
          onClose={handlePopupClose}
          message="탈퇴 처리가 완료되었습니다."
          subMessage={<>
            그동안 나모너를 이용해주셔서 감사합니다.<br/>
            더욱더 노력하고 발전하는 나모너가 되겠습니다.
          </>}
        />
      </Wrapper>
    </>
  );
}

export default Withdraw;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
  height: calc(100vh - 60px);
  box-sizing: border-box;
`;

const WarningList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`;

const WarningItem = styled.div`
  color: #262626;
  font-family: "Pretendard-R";
  font-size: 15px;
  line-height: 1.5;
`;

const ReasonSection = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

const ReasonLabel = styled.div`
  color: #262626;
  font-family: "Pretendard-M";
  font-size: 15px;
  margin-bottom: 12px;
`;

const ReasonInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 16px;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  resize: none;
  font-family: "Pretendard-R";
  font-size: 14px;
  color: #262626;
  box-sizing: border-box;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #4B48DF;
  }
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const CheckboxLabel = styled.span`
  color: #262626;
  font-family: "Pretendard-R";
  font-size: 15px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HeaderText = styled.h1`
  color: #262626;
  font-family: "Pretendard-M";
  font-size: 20px;
  margin-bottom: 24px;
`; 