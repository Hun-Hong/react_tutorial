import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"
import type { setIsDarkProps } from "./WelcomeTypes"
import { ThemeContext } from "./context/ThemeContext"
import { useContext } from "react"


const Page = () => {
  
  return (
    <div className="page">
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default Page