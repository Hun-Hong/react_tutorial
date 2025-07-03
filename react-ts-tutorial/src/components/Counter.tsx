import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div>
            <h2>현재 숫자: {count}</h2>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    )
}

export default Counter;