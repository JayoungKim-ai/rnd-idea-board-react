function Card({ category, title, desc, onDelete }) {
  return (
    <article className="card">
      <span className="card-category">{category}</span>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{desc}</p>
      <button type="button" className="card-delete" onClick={onDelete}>
        삭제
      </button>
    </article>
  );
}

export default Card;

// 자바스크립트의 object(객체) 타입
//props =  {
//   category:"AI",
//   title:"제조 공정 불량 자동 검출",
//   desc:"생산 라인 영상을 학습해 불량품을 실시간으로 가려내는 시스템."
// }
// 하나의 값을 거낼 때에는 점 표기법을 사용합니다.
// props.category
// props["category"]
// 하나의 값을 거낼 때에는 점 표기법을 사용합니다.
// props.title
// props["title"]
// 하나의 값을 거낼 때에는 점 표기법을 사용합니다.
// props.desc
// props["desc"]
