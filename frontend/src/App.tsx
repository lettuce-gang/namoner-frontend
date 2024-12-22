import React from "react";
import "./App.css";
import "../src/font/style.css";
import { Frame } from "./components/Frame.ts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import PostBoxHome from "./pages/PostBoxHome.tsx";
import WriteLetter from "./pages/WriteLetter.tsx";
import MailBox from "./pages/MailBox.tsx";
import NaverLoginLanding from "./pages/NaverLoginLanding.tsx";
import Letter from "./pages/Letter.tsx";

function App() {
  return (
    <Router>
      <Frame>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postbox/:userId" element={<PostBoxHome />} />
          <Route path="/postbox/:userId/mailbox" element={<MailBox />} />
          <Route path="/postbox/:userId/mailbox/letter/:letterId" element={<Letter />} />
          <Route path="/oauth/naver" element={<NaverLoginLanding />} />
          <Route path="/writeLetter" element={<WriteLetter />} />
        </Routes>
      </Frame>
    </Router>
  );
}

export default App;
