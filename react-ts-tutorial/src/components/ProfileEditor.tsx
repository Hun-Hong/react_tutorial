import { useState } from "react";


const ProfileEditor = () => {
    const [profile, setProfile] = useState<{ nickname: string, age: number }>({
        nickname: "",
        age: 0
    })

    return (
        <div>
            <label id="nickname">닉네임 입력: </label>
            <input
                id="nickname"
                type="text"
                onChange={(e) => setProfile(
                    {
                        ...profile,
                        nickname: e.target.value
                    }
                )}
            />
            <br />
            <label id="age">나이 입력: </label>
            <input
                id="age"
                type="number"
                onChange={(e) => setProfile(
                    {
                        ...profile,
                        age: Number(e.target.value)
                    }
                )}
            />

            <p>닉네임: {profile.nickname || "?"}</p>
            <p>나이: {profile.age || "?"}세</p>
        </div>
    )
}

export default ProfileEditor