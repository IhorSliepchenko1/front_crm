import { Users } from "../app/components/table/users"
import { UserRegistration } from "../app/components/user-registration"
import { useCheckValidToken } from "../app/hooks/useCheckValidToken"

// User __1
// Test__1
export const Registration = () => {

     const { decoded } = useCheckValidToken()
     return (
          <div className="container-table flex flex-col">
               {decoded.role === `ADMIN` && <UserRegistration />}
               <Users />
          </div>
     )
}
