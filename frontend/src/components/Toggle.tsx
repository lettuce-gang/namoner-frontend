import React from 'react';
import styled from 'styled-components';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

function Toggle({ isOn, onToggle }: ToggleProps) {
  return (
    <ToggleWrapper onClick={onToggle} isOn={isOn}>
      <ToggleCircle isOn={isOn} />
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.div<{ isOn: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background-color: ${props => props.isOn ? '#4B48DF' : '#E8E8E8'};
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease-in-out;
`;

const ToggleCircle = styled.div<{ isOn: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 2px;
  left: ${props => props.isOn ? '22px' : '2px'};
  transition: left 0.2s ease-in-out;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export default Toggle; 