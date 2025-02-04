import React, { useEffect } from "react";
import "./App.css";
import "../src/font/style.css";
import { Frame } from "./layouts/Frame.ts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import PostBoxHome from "./pages/PostBoxHome.tsx";
import WriteLetter from "./pages/WriteLetter.tsx";
import MailBox from "./pages/MailBox.tsx";
import NaverLoginLanding from "./pages/NaverLoginLanding.tsx";
import Letter from "./pages/Letter.tsx";
import SignUp from "./pages/SignUp.tsx";
import MakePostBox from "./pages/MakePostBox.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ReserveLetter from "./pages/ReserveLetter.tsx";

function App() {
  useEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.innerHeight * 0.01; // 실제 화면 높이 계산
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);
  return (
    <Router>
      <Frame>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/makePostBox" element={<MakePostBox />} />
          <Route path="/postbox/:userId" element={<PostBoxHome />} />
          <Route path="/postbox/:userId/mailbox" element={<MailBox />} />
          <Route path="/postbox/:userId/mailbox/letter/:letterId" element={<Letter />} />
          <Route path="/oauth/naver" element={<NaverLoginLanding />} />
          <Route path="/writeLetter/:userId" element={<WriteLetter />} />
          <Route path="/writeLetter/:userId/reserve" element={<ReserveLetter />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Frame>
    </Router>
  );
}

export default App;
