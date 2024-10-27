import { Link } from "react-router-dom";

type Props = {
     children: React.ReactNode
     to: string
     active?: string
}
export const NavButton = ({ children, to, active = '' }: Props) => {
     return (
          <Link to={to} className={`nav-btn  ${active}`}>
               {children}
          </Link >
     )
}