import { Spinner } from "@nextui-org/react"
import { useCheckQuery } from "../app/services/userApi"

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
     const { isLoading } = useCheckQuery()

     if (isLoading) {
          return <Spinner />
     }
     return children
}