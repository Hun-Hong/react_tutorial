import type React from "react"

export interface isDarkProps {
   isDark: boolean
}

export interface setIsDarkProps {
  isDark: boolean,
  setIsDark: React.Dispatch<boolean>

}