import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header.tsx";
import axios from "axios";
import { useNavigate } from "react-router";
import { FrameContent } from "../layouts/Frame.ts";

function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigator = useNavigate();
  const formatPhoneNumber = (value: string) => {
    const onlyNumbers = value.replace(/[^0-9]/g, ""); // 숫자만 남김
    if (onlyNumbers.length <= 3) return onlyNumbers;
    if (onlyNumbers.length <= 7) return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      SearchPhoneNumber();
    }
  };

  const SearchPhoneNumber = () => {
    if (phoneNumber.length < 13) {
      alert("010-XXXX-XXXX 형식으로 입력해주세요.");
    } else {
      axios
        .get(process.env.REACT_APP_BASE_URL + `/users/phone/${phoneNumber}`)
        .then(res => {
          const { userId } = res.data.data;
          navigator(`/postbox/${userId}`);
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <Header isFull={true} isBack={false}/>
      <FlexBox>
        <HeadBox>
          <img src={"/img/letter.svg"} alt="default-letter" width={44} height={22} />
          <span>
            익명으로 내 마음을 전해보고
            <br />
            나에게 도착한 편지도 확인해보세요!
          </span>
        </HeadBox>
        <InputBox>
          <PhoneNumberInput type="text" value={phoneNumber} onChange={handleChange} placeholder="010-XXXX-XXXX" maxLength={13} onKeyDown={handleKeyDown}/>
          <SearchIcon src={"/img/search.svg"} width={25} onClick={SearchPhoneNumber} />
          <span>
            휴대폰 번호를 입력하여
            <br />
            우체통 속 편지를 확인해보세요
          </span>
        </InputBox>
        <FrameContent>
          <CustomButton onClick={() => navigator("/signup")}>{isLogin ? "내 우체통 가기" : "로그인/회원가입"}</CustomButton>
        </FrameContent>
      </FlexBox>
    </>
  );
}

export default Home;

const FlexBox = styled.div`
  display: flex;
  /* position: relative; */
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const HeadBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0px 46px 0px 46px;
  width: 100%;
  height: 183px;
  border-radius: 12px;
  margin: 0 auto;
  margin-top: 11px;
  background-color: white;
  justify-content: center;
  align-items: center;
  gap: 12px;
  span {
    font-family: "Pretendard-B";
    font-size: 18px;
    color: #4361ee;
    text-align: center;
    line-height: 25px;
  }
`;

const PhoneNumberInput = styled.input`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  height: 54px;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  padding: 0px 16px;
  font-size: 16px;
  margin-top: 40px;
  color: #797979;
  font-weight: 400;
`;

const CustomButton = styled.button`
  width: 90%;
  height: 54px;
  border-radius: 50px;
  color: white;
  font-size: 18px;
  font-family: "Pretendard-B";
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  border: none;
  background-color: #4361ee;
  cursor: pointer;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 17px;
  z-index: 3;

  span {
    font-family: "Pretendard-R";
    font-size: 16px;
    line-height: 23px;
    color: #777;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 3.5rem;
  right: 16px;
  cursor: pointer;
`;
