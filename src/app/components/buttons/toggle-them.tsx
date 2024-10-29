import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { useCreateContext } from "../../../context-provider"
import { VisuallyHidden, useSwitch } from "@nextui-org/react";

export const ToggleTheme = () => {
     const { theme, toggleTheme } = useCreateContext()

     const {
          Component,
          slots,
          getInputProps,
          getWrapperProps
     } = useSwitch();
     return (


          <div className="flex flex-col gap-2">
               <Component className="cursor-pointer" style={{ color: 'teal' }} onClick={() => toggleTheme()}>
                    <VisuallyHidden>
                         <input {...getInputProps()} />
                    </VisuallyHidden>
                    <div
                         {...getWrapperProps()}
                         className={slots.wrapper({
                              class: [
                                   "w-8 h-8",
                                   "flex items-center justify-center",
                                   "rounded-lg bg-default-100 hover:bg-default-200",
                              ],
                         })}
                    >
                         {theme === `light` ? <FaRegMoon /> : <LuSunMedium />}
                    </div>
               </Component>
          </div >
     )
}
