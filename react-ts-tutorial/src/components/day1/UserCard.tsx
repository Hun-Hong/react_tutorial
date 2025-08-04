interface UserProps {
  username: string;
  email: string,
  isAdmin: boolean;
}

function UserCard ({username, email, isAdmin}: UserProps) {
  return (
    <div>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Admin: {isAdmin? "Yes": "No"}</p>
    </div>
  )
}

export default UserCard