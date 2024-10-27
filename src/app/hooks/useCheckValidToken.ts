import { jwtDecode } from "jwt-decode";
import { useAppSelector } from "../hooks";
import { useMemo } from "react";
import { DecodeToken } from "../types";

export const useCheckValidToken = () => {
     const { token } = useAppSelector((state) => state.auth)

     const decoded: DecodeToken = useMemo(() => {
          if (typeof token === `string`) {
               return jwtDecode(token);
          } else {
               return {
                    exp: 0,
                    iat: 0,
                    id: 0,
                    login: '',
                    role: '',
               }
          }
     }, [token])

     return { decoded }

}