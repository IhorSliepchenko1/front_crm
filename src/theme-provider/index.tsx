import React, { useState, createContext, useContext } from "react"

type ContextType = {
     theme: `dark` | `light`
     toggleTheme: () => void
     alertStatus: () => void
     alert: boolean
     classFrames: string
}

export const CreateContext = createContext<ContextType>({
     theme: `light`,
     toggleTheme: () => null,
     alert: false,
     alertStatus: () => null,
     classFrames: `fade-out`
})

export const ComponentProvider = ({ children }: { children: React.ReactNode }) => {
     const storedTheme = localStorage.getItem(`theme`)
     const currentTheme = storedTheme ? (storedTheme as `dark` | `light`) : `light`

     const [theme, setTheme] = useState(currentTheme)
     const [alert, setAlert] = useState(false)
     const [classFrames, setClassFrames] = useState(`fade-out`);

     const toggleTheme = () => {
          setTheme((prevTheme) => {
               const newTheme = prevTheme === `dark` ? `light` : `dark`
               localStorage.setItem(`theme`, newTheme)
               return newTheme
          })
     }

     const alertStatus = () => {
          setAlert(true);
          setClassFrames(`fade-in`)
          setTimeout(() => {
               setClassFrames(`fade-out`)

               setTimeout(() => {
                    setAlert(false);
               }, 500);

          }, 700);
     };


     return (
          <CreateContext.Provider value={{ theme, toggleTheme, alertStatus, alert, classFrames }}>
               <main className={`${theme} text-foreground bg-background h-screen`}>
                    {children}
               </main>
          </CreateContext.Provider>
     )
}

export const useCreateContext = () => useContext(CreateContext)