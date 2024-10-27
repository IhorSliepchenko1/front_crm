import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, useDisclosure } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { useMemo, useState } from "react";
import { Chip } from "@nextui-org/react";
import { useDeleteUserMutation, useGetAllUsersQuery, useLazyGetAllUsersQuery } from "../../services/userApi";
import { ModalDelete } from "../modals/delete";
import { UpdateUser } from "../modals/update-user";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../../features/user/userSlice";

export const Users = () => {
  const { data, isLoading } = useGetAllUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [triggerGetAllUsers] = useLazyGetAllUsersQuery()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(0)
  const [deleteLogin, setDeleteLogin] = useState(``)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userData, setUserData] = useState({
    role: "",
    login: "",
    id: 0,
  })
  const dispatch = useAppDispatch()


  const renderData = useMemo(() => {
    if (data) {
      return data
    } else {
      return []
    }
  }, [data])

  const { decoded } = useCheckValidToken()

  const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";

  const deleteHandler = async (id: number) => {
    await deleteUser(id).unwrap()
    await triggerGetAllUsers().unwrap()

    if (decoded.id === id) {
      dispatch(logout())
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (id: number) => {
    setIsModalOpen(false);
    deleteHandler(id)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (

    <>

      <Table >
        <TableHeader>
          <TableColumn>Логин</TableColumn>
          <TableColumn>Роль</TableColumn>
          <TableColumn>Действия</TableColumn>
        </TableHeader>
        <TableBody
          loadingContent={<Spinner label="Loading..." />}
          loadingState={loadingState}
        >
          {renderData.map((item, index) => (
            <TableRow key={index + 1}>
              <TableCell>{item.login}</TableCell>
              <TableCell>
                <Chip color={item.role === `ADMIN` ? "success" : "primary"}>{item.role}</Chip>
              </TableCell>
              <TableCell>
                {decoded.role === `ADMIN` ?
                  <div className="flex justify-center gap-2">

                    <button className="cursor-pointer" onClick={() => {
                      setId(item?.id ?? 0)
                      showModal()
                      setDeleteLogin(item.login)
                    }}>
                      <MdDelete />
                    </button>

                    <button className="cursor-pointer" onClick={() => {
                      setUserData((prev) => ({ ...prev, role: item?.role, login: item?.login, id: item?.id }))
                      onOpen()
                    }}>
                      <MdModeEditOutline />
                    </button>
                  </div> : '-'}
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>

      <ModalDelete
        id={id}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        date={deleteLogin}
      />

      <UpdateUser
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        role={userData.role}
        login={userData.login}
        id={userData.id}
      />
    </>
  )
}