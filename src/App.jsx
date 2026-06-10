import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import IdeaBoardPage from "./pages/IdeaBoardPage";
import HelloPage from "./pages/HelloPage";

function App() {
  return (
    // BrowserRouter: URL 기반 라우팅 활성화
    <BrowserRouter>
      {/* 모든 페이지에서 공통으로 보이는 네비게이션 */}
      <Navbar />

      {/* URL에 따라 표시할 페이지를 결정합니다 */}
      <Routes>
        <Route path="/" element={<IdeaBoardPage />} />
        <Route path="/hello" element={<HelloPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
