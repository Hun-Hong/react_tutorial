import { useState } from "react";

function UserGreeting() {
    const [name, setName] = useState<string>("")

    const [isVisible, setIsVisible] = useState<boolean>(false)

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
            />
            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? "숨기기" : "보이기"}
            </button>
            {isVisible && <p>안녕하세요, {name}님!</p>}
        </div>
    )
}

export default UserGreeting