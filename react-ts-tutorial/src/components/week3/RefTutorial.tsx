import { useEffect, useRef, useState } from "react"

function RefTutorial() {
  const [count, setCount] = useState(1)
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log("렌더링 수: ", renderCount.current)
  })

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => {setCount(prev => prev+1)}}>올려</button>
    </div>
  )
}

export default RefTutorial