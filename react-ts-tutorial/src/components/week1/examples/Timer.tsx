import { useState, useEffect } from "react";

function Timer() {
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prev => prev + 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return <div>타이머: {seconds}초</div>
}

export default Timer