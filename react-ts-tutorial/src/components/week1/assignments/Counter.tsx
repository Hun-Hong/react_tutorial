import { useState } from "react";


function Counter() {
  const [number, setNumber] = useState(0)

  function increaseNumber () {
    // 1. setNumber(prev => prev + 1로 함수형 업데이트가 권장됨)
    setNumber(number + 1)
  }
  function decreaseNumber () {
    // 2. Math.max 사용 가능
    setNumber(number >= 1? number - 1 : 0)
  }
  function resetNumber () {
    setNumber(0)
  }

  return (
    <div>
      <h1>기초 과제: 간단한 카운터 만들기</h1>
      <h2>현재 숫자: {number}</h2>
      <button
      onClick={increaseNumber}> +1 </button>
      <button
      onClick={decreaseNumber}> -1 </button>
      <button
      onClick={resetNumber}> Reset </button>
    </div>
  )
}

export default Counter