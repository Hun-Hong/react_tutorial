import { useState } from "react";

function Counter () {
    const [count, setCount] = useState<number>(0);

    const increase = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <p>현재 숫자: {count}</p>
            <button onClick={increase}>
                +1
            </button>
        </div>
    )
}

export default Counter