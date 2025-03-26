import React, { ReactNode } from "react";
import styled from "styled-components";

interface InfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: ReactNode;
  subMessage?: ReactNode;
}

function InfoPopup({ isOpen, onClose, message, subMessage }: InfoPopupProps) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <DialogContainer onClick={e => e.stopPropagation()}>
        <IconWrapper>
          <InfoIcon>i</InfoIcon>
        </IconWrapper>
        <Message>{message}</Message>
        {subMessage && <SubMessage>{subMessage}</SubMessage>}
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </DialogContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DialogContainer = styled.div`
  background: white;
  border-radius: 14px;
  padding: 24px 20px 16px 20px;
  width: 80%;
  max-width: 335px;
  text-align: center;
`;

const IconWrapper = styled.div`
  margin-bottom: 16px;
`;

const InfoIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #4b48df;
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard-R";
`;

const Message = styled.p`
  color: #262626;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 8px;
  font-family: "Pretendard-M";
  white-space: pre-line;
`;

const SubMessage = styled.p`
  color: #777;
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 16px;
  font-family: "Pretendard-M";
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 14px 0 0 0;
  border: none;
  border-top: 1px solid #f2f2f2;
  background: none;
  color: #262626;
  font-size: 15px;
  font-family: "Pretendard-M";
  cursor: pointer;
`;

export default InfoPopup;
