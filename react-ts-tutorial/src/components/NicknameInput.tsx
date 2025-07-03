import { useState } from "react";


const NicknameInput = () => {
    const [nickname, setNickname] = useState<string>("")

    return (
        <div>
            <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
            />
            <p>안녕하세요, {nickname || "..."}</p>
        </div>
    )
}

export default NicknameInput