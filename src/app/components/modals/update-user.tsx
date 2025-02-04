import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../buttons/button";
import { Input } from "../input";
import { useCreateContext } from "../../../context-provider";
import { ErrorMessage } from "../error-message";
import { useEffect, useState } from "react";
import { hasErrorField } from "../../../utils/has-error-field";
import { useLazyGetAllUsersQuery, useUpdateUserMutation } from "../../services/userApi";
import { RadioGroup, Radio } from "@nextui-org/react";
import { ChangeTypeButton } from "../buttons/change-type-button";

type Props = {
     isOpen: boolean
     onOpenChange: () => void
     role: string
     login: string
     id: number
}

type User = {
     login: string;
     newPassword: string;
     oldPassword: string;
     role: string;
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
               newPassword: '',
               oldPassword: '',
               role,
          },
     })

     const { theme } = useCreateContext()
     const [updateUser] = useUpdateUserMutation()
     const [triggerGetUserById] = useLazyGetAllUsersQuery()
     const [error, setError] = useState("")

     const [isVisibleOldPass, setIsVisibleOldPass] = useState(false);
     const [isVisibleNewPass, setIsVisibleNewPass] = useState(false);

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
                    className={`${theme} text-foreground-500 modal`}
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


                                             <Input
                                                  control={control}
                                                  name="oldPassword"
                                                  endContent={
                                                       <ChangeTypeButton
                                                            isVisible={isVisibleOldPass}
                                                            setIsVisible={setIsVisibleOldPass}
                                                       />
                                                  }
                                                  type={isVisibleOldPass ? "text" : "password"}
                                                  label={"Старый пароль"} />

                                             <Input
                                                  control={control}
                                                  name="newPassword"
                                                  endContent={
                                                       <ChangeTypeButton
                                                            isVisible={isVisibleNewPass}
                                                            setIsVisible={setIsVisibleNewPass}
                                                       />
                                                  }
                                                  type={isVisibleNewPass ? "text" : "password"}
                                                  label={"Новый пароль"} />

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
