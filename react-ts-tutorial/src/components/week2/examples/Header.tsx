import { ThemeContext } from "./context/ThemeContext"
import { UserContext } from "./context/UserContext"
import type { isDarkProps } from "./WelcomeTypes"
import { useContext } from "react"

const Header = () => {
  const { isDark } = useContext(ThemeContext)
  const user = useContext(UserContext)
  return (
    <header
      className="header"
      style={{
        backgroundColor: isDark ? 'black' : 'lightgray',
        color: isDark ? 'white' : 'black'
      }}>
      <h1>Welcome {user}!</h1>
    </header>
  )
}

export default Header