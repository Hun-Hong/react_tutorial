import { ThemeContext } from "./context/ThemeContext"
import { useContext } from "react"
import { UserContext } from "./context/UserContext"

const Content = () => {
  const { isDark } = useContext(ThemeContext)
  const user = useContext(UserContext)
  return (
    <div
      style={{
        backgroundColor: isDark ? 'black' : 'lightgray',
        color: isDark ? 'white' : 'black'
      }}>
      <p>{user}님, 좋은 하루 되세요</p>
    </div>
  )
}


export default Content