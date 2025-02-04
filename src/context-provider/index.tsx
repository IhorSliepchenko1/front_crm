import React, { useState, createContext, useContext } from "react"

type ContextType = {
     theme: `dark` | `light`
     toggleTheme: () => void
     alertStatus: (type: `delete` | `add` | ``) => void
     alert: boolean
     classFrames: string
     typeAlert: `delete` | `add` | ``
}

export const CreateContext = createContext<ContextType>({
     theme: `light`,
     toggleTheme: () => null,
     alert: false,
     alertStatus: () => null,
     classFrames: `fade-out`,
     typeAlert: ``
})

export const ComponentProvider = ({ children }: { children: React.ReactNode }) => {
     const storedTheme = localStorage.getItem(`theme`)
     const currentTheme = storedTheme ? (storedTheme as `dark` | `light`) : `light`

     const [theme, setTheme] = useState(currentTheme)
     const [alert, setAlert] = useState(false)
     const [classFrames, setClassFrames] = useState(`fade-out`);
     const [typeAlert, setTypeAlert] = useState<`delete` | `add` | ``>('')

     const toggleTheme = () => {
          setTheme((prevTheme) => {
               const newTheme = prevTheme === `dark` ? `light` : `dark`
               localStorage.setItem(`theme`, newTheme)
               return newTheme
          })
     }

     const alertStatus = (type: `delete` | `add` | ``) => {
          setAlert(true);
          setClassFrames(`fade-in`)
          setTypeAlert(type)
          
          setTimeout(() => {
               setClassFrames(`fade-out`)
               setTimeout(() => {
                    setAlert(false);
                    setTypeAlert('')
               }, 500);

          }, 700);

     };


     return (
          <CreateContext.Provider value={{ theme, toggleTheme, alertStatus, alert, classFrames, typeAlert }}>
               <main className={`${theme} text-foreground bg-background h-screen`}>
                    {children}
               </main>
          </CreateContext.Provider>
     )
}

export const useCreateContext = () => useContext(CreateContext)