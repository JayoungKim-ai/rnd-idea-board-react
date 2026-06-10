import Header from "../components/Header";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { supabase } from "../supabaseClient";

function IdeaBoardPage() {
  // 입력되는 값의 상태 관리
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("AI");
  const [desc, setDesc] = useState("");

  // 등록된 아이디어의 상태 관리 (초기값: 빈 배열 → DB에서 불러옴)
  const [ideas, setIdeas] = useState([]);

  // 정렬 순서 상태 관리 (null: 기본순, "asc": 오름차순, "desc": 내림차순)
  const [sortOrder, setSortOrder] = useState(null);

  // 앱이 처음 실행될 때 Supabase에서 아이디어 목록을 불러옵니다
  useEffect(() => {
    fetchIdeas();
  }, []);

  // Supabase ideas 테이블에서 전체 데이터를 조회하는 함수
  async function fetchIdeas() {
    const { data, error } = await supabase
      .from("ideas") // 테이블 이름
      .select("*"); // 모든 컬럼 조회

    if (error) {
      console.error("데이터 불러오기 실패:", error.message);
      return;
    }
    // DB 컬럼명 description → 컴포넌트에서 사용하는 desc로 변환
    setIdeas(data.map((item) => ({ ...item, desc: item.description })));
  }

  // 정렬이 적용된 아이디어 목록 (ideas 원본은 유지)
  const sortedIdeas = [...ideas].sort((a, b) => {
    if (sortOrder === "asc") return a.title.localeCompare(b.title, "ko");
    if (sortOrder === "desc") return b.title.localeCompare(a.title, "ko");
    return 0;
  });

  // 아이디어 등록 함수 (Supabase에 INSERT)
  async function addIdea() {
    if (title.trim() === "") {
      alert("제목을 입력하세요");
      return;
    }
    if (desc.trim() === "") {
      alert("설명을 입력하세요");
      return;
    }

    const { error } = await supabase
      .from("ideas")
      .insert([{ category, title, description: desc }]); // DB 컬럼명은 description

    if (error) {
      console.error("등록 실패:", error.message);
      return;
    }

    // 등록 후 목록을 다시 불러와 화면을 최신 상태로 갱신
    await fetchIdeas();
    setTitle("");
    setCategory("AI");
    setDesc("");
  }

  // 아이디어 삭제 함수 (Supabase에서 DELETE)
  async function deleteIdea(id) {
    const { error } = await supabase.from("ideas").delete().eq("id", id); // id가 일치하는 행만 삭제

    if (error) {
      console.error("삭제 실패:", error.message);
      return;
    }

    await fetchIdeas(); // 삭제 후 목록 갱신
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
          {sortedIdeas.map((idea) => (
            <Card
              key={idea.id}
              category={idea.category}
              title={idea.title}
              desc={idea.desc}
              onDelete={() => deleteIdea(idea.id)}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default IdeaBoardPage;
