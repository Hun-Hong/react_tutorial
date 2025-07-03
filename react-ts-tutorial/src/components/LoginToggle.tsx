import { useState } from "react"


const LoginToggle = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    return (
        <div>
            <h2>{isLoggedIn ? "어서오세요": "로그인 해주세요."}</h2>
            <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                {isLoggedIn ? "로그아웃": "로그인"}
            </button>
        </div>
    )

    
} 

export default LoginToggle;