import { Navbar, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci"
import { logout, selectIsAuthenticated } from "../../../features/user/userSlice";
import { NavButton } from "../buttons/nav-button";
import { ToggleTheme } from "../buttons/toggle-them";


export const NavBar = () => {

     const isAuthenticated = useSelector(selectIsAuthenticated)
     const dispatch = useDispatch()
     const navigate = useNavigate()


     const handleLogout = () => {
          dispatch(logout())
          navigate(`/auth`)
     }

     const navData = [
          { title: `Касса`, to: `/`, active: `active` },
          { title: `Расходы`, to: `/expenses`, active: `` },
          { title: `Типы расходов`, to: `/type-expenses`, active: `` },
          { title: `Пользователи`, to: `/registration`, active: `` },
     ]

     return (

          <Navbar >
               <NavbarContent >
                    {
                         navData.map((item) => (
                              <NavbarItem key={item.title}>
                                   <NavButton to={item.to} active={item.active}>
                                        {item.title}
                                   </NavButton>
                              </NavbarItem>
                         ))
                    }
               </NavbarContent>
               <NavbarContent justify="end">
                    <NavbarItem>
                         <NavbarContent>
                              <ToggleTheme />

                              {isAuthenticated && (
                                   <Button
                                        color="default"
                                        variant="flat"
                                        className="gap-2 logout"
                                        onClick={handleLogout}
                                   >
                                        <CiLogout /> <span>Выйти</span>
                                   </Button>
                              )} </NavbarContent>


                    </NavbarItem>
               </NavbarContent>
          </Navbar>

     );
}
