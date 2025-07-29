import { useContext } from "react"
import { ThemeContext } from "./context/ThemeContext"

const Footer = () => {
  const { isDark, setIsDark } = useContext(ThemeContext)
  return (
    <div>
      <button
        onClick={() => {
          setIsDark((prev: boolean) => !prev)
        }}>
        Dark Mode
      </button>
    </div>
  )
}

export default Footer