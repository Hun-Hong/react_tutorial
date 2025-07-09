import MovieList from "./components/MovieList";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // 현재 시간을 HH:MM 형식으로 포맷하는 함수
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    // 처음 컴포넌트 마운트 시 시간 설정
    updateTime();

    // 1초마다 시간 업데이트
    const timeInterval = setInterval(updateTime, 1000);

    // 컴포넌트 언마운트 시 인터벌 정리 (메모리 누수 방지)
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="sidebar-header">
          <div className="logo">🍿 Movie App</div>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <span className="menu-icon">📊</span>
            Dashboard
          </li>
          <li className="menu-item active">
            <span className="menu-icon">🎬</span>
            All Movies
          </li>
          <li className="menu-item">
            <span className="menu-icon">🎭</span>
            Genres
          </li>
          <li className="menu-item submenu">
            <span className="menu-icon">🎯</span>
            Adventure
          </li>
        </ul>
        <div className="sidebar-footer">
          <div className="menu-item">
            <span className="menu-icon">🔍</span>
            Search
          </div>
          <div className="menu-item">
            <span className="menu-icon">ℹ️</span>
            About
          </div>
          <div className="menu-item">
            <span className="menu-icon">⚙️</span>
            Settings
          </div>
        </div>
      </nav>

      <main className="main-content">
        <header className="header">
          <h1>Recommended For You</h1>
          <div className="header-actions">
            <span className="time">{currentTime}</span>
            <span className="user">My User</span>
          </div>
        </header>
        <MovieList />
      </main>
    </div>
  )
}

export default App;
