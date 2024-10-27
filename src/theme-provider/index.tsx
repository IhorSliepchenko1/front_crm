import React, { useState, createContext, useContext } from "react"

type ThemeContaxtType = {
     theme: `dark` | `light`
     toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContaxtType>({
     theme: `light`,
     toggleTheme: () => null,
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
     const storedTheme = localStorage.getItem(`theme`)
     const currentTheme = storedTheme ? (storedTheme as `dark` | `light`) : `light`

     const [theme, setTheme] = useState(currentTheme)

     const toggleTheme = () => {
          setTheme((prevTheme) => {
               const newTheme = prevTheme === `dark` ? `light` : `dark`
               localStorage.setItem(`theme`, newTheme)
               return newTheme
          })
     }

     return (
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
               <main className={`${theme} text-foreground bg-background h-screen`}>
                    {children}
               </main>
          </ThemeContext.Provider>
     )
}

export const useTheme = () => useContext(ThemeContext)