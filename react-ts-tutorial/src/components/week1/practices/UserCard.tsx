interface User {
	name: string;
	age: number;
	email: string;
}

interface UserCardProps {
	user: User;
}

function UserCard({ user }: UserCardProps) {
	return (
		<div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
			<h3>{user.name}</h3>
			<p>나이: {user.age}</p>
			<p>이메일: {user.email}</p>
		</div>
	)
}

export default UserCard