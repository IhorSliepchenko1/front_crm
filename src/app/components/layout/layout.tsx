import { Container } from "./container"
import { NavBar } from "./nav-bar"
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
     selectIsAuthenticated,
} from "../../../features/user/userSlice"
import { useEffect } from "react"

export const Layout = () => {

     const isAuthenticated = useSelector(selectIsAuthenticated)
     const navigate = useNavigate()

     useEffect(() => {
          if (!isAuthenticated) {
               navigate(`/auth`)
          }
     }, [isAuthenticated, navigate])


     return (
          <>
               <NavBar />
               <Container>
                    <div className="flex-1 p-4">
                         <Outlet />
                    </div>
               </Container>
          </>
     )
}