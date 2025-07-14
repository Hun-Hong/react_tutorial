import { useEffect } from "react";
import { useState } from "react";


const UserList = () => {
    type User = { id: number, name: string }
    const [users, setUsers] = useState<User[]>([])

    const url = "https://jsonplaceholder.typicode.com/users"
    useEffect(() => {
        const fetchUsers = async () => {
            await fetch(url)
                .then((res) => res.json())
                .then((data) => setUsers(data))
        }

        fetchUsers()
    }, [])

    return (
        <div>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserList