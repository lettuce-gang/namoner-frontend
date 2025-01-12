import React from "react";
import styled from "styled-components";

type ButtonProps = {
  width: string;
  height: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
  border?: string;
  borderRadius?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontFamily?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
};

function CustomButton(props: ButtonProps) {
  return (
    <StyledButton
      width={props.width}
      height={props.height}
      onClick={props.onClick}
      border={props.border}
      borderRadius={props.borderRadius}
      backgroundColor={props.backgroundColor}
      textColor={props.textColor}
      fontSize={props.fontSize}
      fontFamily={props.fontFamily}
      style={props.style}
      disabled={props.disabled}
    >
      {props.text}
    </StyledButton>
  );
}

export default CustomButton;

const StyledButton = styled.button<ButtonProps>`
  width: ${props => props.width};
  height: ${props => props.height};
  border: ${props =>
    props.disabled
      ? "1px solid #E9E9E9" // disabled일 때의 테두리
      : props.border
        ? props.border
        : "1px solid #4361EE"};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "10px")};
  background-color: ${props =>
    props.disabled
      ? "#B9B9B9" // disabled일 때의 배경색
      : props.backgroundColor
        ? props.backgroundColor
        : "#4361EE"};
  color: ${props => (props.textColor ? props.textColor : "black")};
  font-size: ${props => (props.fontSize ? props.fontSize : "16px")};
  font-family: ${props => (props.fontFamily ? props.fontFamily : "Pretendard-R")};
  cursor: pointer;
`;
