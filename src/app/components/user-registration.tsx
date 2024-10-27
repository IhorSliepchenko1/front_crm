import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Input } from "./input";
import { ErrorMessage } from "./error-message";
import { Button } from "./buttons/button";
import { hasErrorField } from "../../utils/has-error-field";
import { useLazyGetAllUsersQuery, useRegisterMutation } from "../services/userApi";
import { Input as NextInput } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

type User = {
     login: string,
     password: string,
     role: string,
}

export const UserRegistration = () => {
     const [registration] = useRegisterMutation()
     const [triggerGetUser] = useLazyGetAllUsersQuery()
     const [isVisible, setIsVisible] = useState(false);

     const toggleVisibility = () => setIsVisible(!isVisible);

     const [error, setError] = useState("")
     const {
          handleSubmit,
          control,
          reset
     } = useForm({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               login: '',
               password: '',
               role: '',
          },
     })


     const onSubmit = async (data: User) => {
          try {
               await registration(data).unwrap()
               await triggerGetUser().unwrap()
               reset()

          } catch (err) {
               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }

     return (
          <form className="flex flex-col gap-4 py-3" onSubmit={handleSubmit(onSubmit)}>
               <Input control={control}
                    name="login"
                    label="Логин"
                    type="text"
                    required="Обязательное поле" />


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
               <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                         <RadioGroup
                              label="Роль пользователя"
                              color="secondary"
                              {...field}
                         >
                              <Radio value="ADMIN">ADMIN</Radio>
                              <Radio value="USER">USER</Radio>
                         </RadioGroup>
                    )}
               />


               <ErrorMessage error={error} />
               <Button color="secondary" variant="solid" type="submit">
                    Зарегистрировать
               </Button>

          </form>
     )
}
