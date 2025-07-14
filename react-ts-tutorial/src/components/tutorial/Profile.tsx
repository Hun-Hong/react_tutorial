type ProfileProps = {
    nickname: string,
    age: number,
    isDeveloper: boolean
}

const Profile = ({ nickname, age, isDeveloper }: ProfileProps) => {
    return (
    <>
        <p>nickname: { nickname } </p>
        <p>age: { age } </p>
        <p>isDeveloper: { isDeveloper ? "개발자" : "비개발자" } </p>
    </>
    )
}

export default Profile