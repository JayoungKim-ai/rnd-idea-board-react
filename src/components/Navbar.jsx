import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      {/* NavLink: 현재 페이지와 일치하면 자동으로 active 클래스가 붙습니다 */}
      <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        아이디어 보드
      </NavLink>
      <NavLink to="/hello" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        Hello
      </NavLink>
    </nav>
  );
}

export default Navbar;
