import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Input } from "../../app/components/input"
import { Button } from "@nextui-org/react"
import {
     useLazyCheckQuery,
     useLoginMutation,
} from "../../app/services/userApi"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "../../app/components/error-message"
import { hasErrorField } from "../../utils/has-error-field"
import { Input as NextInput } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

type Login = {
     login: string
     password: string
}

export const Login = () => {
     const {
          handleSubmit,
          control,
     } = useForm<Login>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               login: "",
               password: "",
          },
     })
     const [isVisible, setIsVisible] = useState(false);
     const toggleVisibility = () => setIsVisible(!isVisible);

     const [login, { isLoading }] = useLoginMutation()
     const navigate = useNavigate()
     const [error, setError] = useState("")
     const [triggerCurrentQuery] = useLazyCheckQuery()

     const onSubmit = async (data: Login) => {
          try {
               await login(data).unwrap()
               await triggerCurrentQuery().unwrap()
               navigate("/")
          } catch (err) {
               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }
     return (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
               <Input
                    control={control}
                    name="login"
                    label="Логин"
                    type="text"
                    required="Обязательное поле"
               />
               <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                         <NextInput
                              {...field}
                              name="password"
                              label="Пароль"
                              endContent={
                                   <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                        {isVisible ? (
                                             <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                             <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                   </button>
                              }
                              type={isVisible ? "text" : "password"}

                         />
                    )}
               />
               <ErrorMessage error={error} />

               <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
                         Войти
                    </Button>
               </div>
          </form>
     )
}