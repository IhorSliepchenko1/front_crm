import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../buttons/button";
import { Input } from "../input";
import { useTheme } from "../../../theme-provider";
import { ErrorMessage } from "../error-message";
import { useEffect, useState } from "react";
import { hasErrorField } from "../../../utils/has-error-field";
import { useLazyGetAllUsersQuery, useUpdateUserMutation } from "../../services/userApi";
import { RadioGroup, Radio } from "@nextui-org/react";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../../features/user/userSlice";

type Props = {
     isOpen: boolean
     onOpenChange: () => void
     role: string
     login: string
     id: number
}

type User = {
     login: string,
     password: string,
     role: string,
}

export const UpdateUser = ({
     isOpen,
     onOpenChange,
     role,
     login,
     id
}: Props) => {
     const {
          handleSubmit,
          control,
          reset
     } = useForm({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               login,
               password: '',
               role,
          },
     })

     const { theme } = useTheme()
     const [updateUser] = useUpdateUserMutation()
     const [triggerGetUserById] = useLazyGetAllUsersQuery()
     const [error, setError] = useState("")
     const dispatch = useAppDispatch()
     const { decoded } = useCheckValidToken()

     const resetInput = () => {
          onOpenChange()
          reset()
          setError(``)
     }

     useEffect(() => {
          if (isOpen) {
               reset({ login, role });
          }
     }, [isOpen, login, reset, role]);


     const onSubmit = async (data: User) => {
          try {
               await updateUser({ data, id }).unwrap()
               await triggerGetUserById().unwrap()

               if (decoded.login === data.login && data.password !== undefined) {
                    dispatch(logout())
               }

               resetInput()

          } catch (err) {
               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }

     return (
          <>
               <Modal
                    isOpen={isOpen}
                    onOpenChange={resetInput}
                    placement="top-center"
                    className={`${theme} text-foreground-500`}
               >
                    <ModalContent>
                         {(onClose) => (
                              <>
                                   <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                                        <ModalHeader className="flex items-center gap-1">Данные о пользователе <span style={{ color: `red` }}>{login}</span></ModalHeader>
                                        <ModalBody>
                                             <Input control={control}
                                                  name="login"
                                                  label="Логин"
                                                  type="text"
                                                  required="Обязательное поле" />

                                             <Input control={control}
                                                  name="password"
                                                  label="Новый пароль"
                                                  type="text"
                                             />

                                             <Controller
                                                  name="role"
                                                  control={control}
                                                  render={({ field }) => (
                                                       <RadioGroup
                                                            label="Роль пользователя"
                                                            color="secondary"
                                                            defaultValue={role}
                                                            {...field}
                                                       >
                                                            <Radio value="ADMIN">ADMIN</Radio>
                                                            <Radio value="USER">USER</Radio>
                                                       </RadioGroup>
                                                  )}
                                             />

                                             <ErrorMessage error={error} />
                                        </ModalBody>
                                        <ModalFooter className="flex justify-between">
                                             <Button color="danger" variant="solid" onPress={onClose}>
                                                  Закрыть
                                             </Button>
                                             <Button color="success" variant="solid" type="submit">
                                                  Рекдактировать
                                             </Button>
                                        </ModalFooter>
                                   </form>
                              </>
                         )}
                    </ModalContent>
               </Modal>
          </>
     )
}
