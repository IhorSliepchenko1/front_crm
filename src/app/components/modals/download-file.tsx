import { Modal, ModalContent, ModalFooter } from "@nextui-org/react"
import { useTheme } from "../../../theme-provider"
import { BASE_URL } from "../../../constants"
import { Button } from "../buttons/button"
import { useDownloadImage } from "../../hooks/useDownloadImage"

type Props = {
     dataOpenImage: {
          path: string;
          name: string;
     }
     isOpen: boolean
     onOpenChange: () => void
}

export const ModalDownloadFile = ({ dataOpenImage, isOpen, onOpenChange }: Props) => {
     const { theme } = useTheme()
     const { downloadFile } = useDownloadImage()

     return (
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}
               className={`${theme} text-foreground-500`}
               placement="top-center">
               <ModalContent className="p-3">
                    {(onClose) => (
                         <>

                              <div className="flex justify-center">
                                   <img src={`${BASE_URL}/${dataOpenImage.path}`} width={300} height={300} />
                              </div>


                              <ModalFooter className="flex justify-between">
                                   <Button color="primary" onPress={() => {
                                        downloadFile(`${BASE_URL}/${dataOpenImage.path}`, dataOpenImage.name)
                                        onClose()
                                   }}>
                                        Скачать
                                   </Button>
                                   <Button color="danger" onPress={onClose}>
                                        Закрыть
                                   </Button>

                              </ModalFooter>
                         </>
                    )}
               </ModalContent>
          </Modal>
     )
}
