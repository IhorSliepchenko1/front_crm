import { Modal } from 'antd';

type Props = {
     handleOk: (id: number) => void
     handleCancel: () => void
     isModalOpen: boolean
     id: number
     date: string
}

export const ModalDelete = ({
     handleOk,
     handleCancel,
     isModalOpen,
     id,
     date
}: Props) => {

     return (
          <>

               <Modal open={isModalOpen} onOk={() => handleOk(id)} onCancel={handleCancel} okText="Удалить"
                    cancelText="Отмена">
                    <p className='flex justify-center gap-1'><span>Уверены что хотите удалить данные за</span><span style={{ color: `red` }}>{date}</span>?</p>
               </Modal>
          </>
     )
}
