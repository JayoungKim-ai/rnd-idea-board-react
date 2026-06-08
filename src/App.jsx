import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";
import { useState } from "react"; //상태를 관리하는 함수(값을 담는 그릇, 값을 변경하는 함수로 구성되어 있음)
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

function App() {
  // 입력되는 값의 상태 관리
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("AI");
  const [desc, setDesc] = useState("");

  // 등록된 아이디어의 상태 관리
  const [ideas, setIdeas] = useState([
    {
      category: "AI",
      title: "제조 공정 불량 자동 검출",
      desc: "생산 라인 영상을 학습해 불량품을 실시간으로 가려내는 시스템.",
    },
    {
      category: "바이오",
      title: "단백질 구조 예측 도우미",
      desc: "신약 후보 물질의 단백질 구조를 빠르게 추정해 연구 기간을 단축.",
    },
    {
      category: "반도체",
      title: "소재 결함 데이터셋 구축",
      desc: "반도체 소재의 결함 사례를 모아 분석용 데이터로 정리.",
    },
  ]);

  // 정렬 순서 상태 관리 (null: 기본순, "asc": 오름차순, "desc": 내림차순)
  const [sortOrder, setSortOrder] = useState(null);

  // 정렬이 적용된 아이디어 목록 (ideas 원본은 유지)
  const sortedIdeas = [...ideas].sort((a, b) => {
    if (sortOrder === "asc") return a.title.localeCompare(b.title, "ko");
    if (sortOrder === "desc") return b.title.localeCompare(a.title, "ko");
    return 0;
  });

  // 아이디어 등록 함수 (state에 값 추가)
  function addIdea() {
    if (title.trim() === "") {
      alert("제목을 입력하세요");
      return;
    }
    if (desc.trim() === "") {
      alert("설명을 입력하세요");
      return;
    }
    const newIdea = { category: category, title: title, desc: desc };
    setIdeas([...ideas, newIdea]);
    setTitle("");
    setCategory("AI");
    setDesc("");
  }

  // 아이디어 삭제 함수 (해당 인덱스 카드 제거)
  function deleteIdea(index) {
    setIdeas(ideas.filter((_, i) => i !== index));
  }

  return (
    <>
      {/* 헤더 영역 */}
      <Header />

      {/* 본문 시작 */}
      <main>
        {/* 입력 폼: 새 아이디어 등록 */}
        <section className="form-section">
          <form className="idea-form">
            {/* 제목: 한 줄 입력 */}
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              placeholder="아이디어 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* 분야: 드롭다운 선택 */}
            <label htmlFor="category">분야</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="AI">AI</option>
              <option value="바이오">바이오</option>
              <option value="반도체">반도체</option>
              <option value="에너지">에너지</option>
              <option value="기타">기타</option>
            </select>

            {/* 설명: 여러 줄 입력 */}
            <label htmlFor="description">설명</label>
            <textarea
              id="description"
              rows={3}
              placeholder="아이디어를 간단히 설명하세요"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <button type="button" onClick={addIdea}>
              등록
            </button>
          </form>
        </section>

        {/* 제목 정렬 UI */}
        <section className="sort-section" aria-label="제목 정렬">
          <span className="sort-label">제목 정렬</span>
          <div className="sort-buttons">
            <button
              type="button"
              className={`sort-button${sortOrder === "asc" ? " active" : ""}`}
              aria-label="제목 오름차순 정렬"
              title="오름차순 (A → Z)"
              onClick={() => setSortOrder("asc")}
            >
              <TiArrowSortedDown size={20} />
            </button>
            <button
              type="button"
              className={`sort-button${sortOrder === "desc" ? " active" : ""}`}
              aria-label="제목 내림차순 정렬"
              title="내림차순 (Z → A)"
              onClick={() => setSortOrder("desc")}
            >
              <TiArrowSortedUp size={20} />
            </button>
          </div>
        </section>

        {/* 카드 목록: 등록된 아이디어 */}
        <section className="card-grid">
          {sortedIdeas.map((idea, index) => (
            <Card
              key={`${idea.title}-${index}`}
              category={idea.category}
              title={idea.title}
              desc={idea.desc}
              onDelete={() => deleteIdea(ideas.indexOf(idea))}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
