import { Card, CardBody } from "@nextui-org/react"
import { ToggleTheme } from "../app/components/buttons/toggle-them"
import { Login } from "../features/user/login"

export const Auth = () => {

     return (
          <div className="flex items-center justify-center h-screen">
               <div className="absolute top-0 p-4">
                    <ToggleTheme />
               </div>
               <div className="max-w-xl w-full p-2">
                    <Card className="min-w-full w-[340px] h-[450px]">
                         <CardBody className="overflow-hidden">
                              <h2 className="py-3">Войдите в аккаунт</h2>
                              <Login />
                         </CardBody>
                    </Card>
               </div>
          </div>
     )
}