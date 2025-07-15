import { useState, useEffect } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

function UserInfo() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            setLoading(true)
            try {
                const response = await fetch("/api/user/1")
                const userData = await response.json()
                setUser(userData)
            }
            catch (error) {
                console.log(error)
            }
            setLoading(false)
        }

        fetchUser()
    }, [])

    if (loading) return <div>로딩 중...</div>
    if (!user) return <div>사용자를 찾을 수 없어요</div>

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    )
}

export default UserInfo