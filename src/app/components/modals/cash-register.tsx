import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Input } from "../input";
import { Button } from "../buttons/button";
import { useCreateContext } from "../../../context-provider";
import { ErrorMessage } from "../error-message";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { Deposit } from "../../types";

type Props = {
     isOpen: boolean
     resetInput: () => void
     control: Control<Deposit>
     handleSubmit: UseFormHandleSubmit<Deposit>
     onSubmit: (data: Deposit) => Promise<void>
     error: string
     title: string
     hospitalStatus: boolean
}

export const ModalCashRegisterBase = ({ isOpen, resetInput, control, handleSubmit, onSubmit, error, title, hospitalStatus }: Props) => {
     const { theme } = useCreateContext()


     return (
          <Modal
               isOpen={isOpen}
               onOpenChange={resetInput}
               placement="top-center"
               className={`${theme} text-foreground-500 modal`}
          >
               <ModalContent
               >
                    {(onClose) => (
                         <><form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                              <ModalBody>
                                   <Input control={control}
                                        name="cash"
                                        label="Наличные"
                                        type="number"
                                        required="Обязательное поле"
                                        placeholder="0"
                                   />
                                   <Input control={control}
                                        name="cashless"
                                        label="Безналичные"
                                        type="number"
                                        required="Обязательное поле"
                                        placeholder="0"
                                   />

                                   {
                                        hospitalStatus && <Input control={control}
                                             name="hospital"
                                             label="Больница"
                                             type="number"
                                             required="Обязательное поле"
                                        />
                                   }

                                   <Input control={control}
                                        name="date"
                                        label="Дата"
                                        type="date"
                                        required="Обязательное поле" />
                                   <ErrorMessage error={error} />
                              </ModalBody>
                              <ModalFooter className="flex justify-between">
                                   <Button color="danger" variant="solid" onPress={onClose}>
                                        Закрыть
                                   </Button>
                                   <Button color="success" variant="solid" type="submit">
                                        Внести
                                   </Button>
                              </ModalFooter>
                         </form>
                         </>
                    )}
               </ModalContent>
          </Modal>
     )
}
