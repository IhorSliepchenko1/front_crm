import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
type Props = {
     isVisible: boolean
     setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}


export const ChangeTypeButton = ({ isVisible, setIsVisible }: Props) => {
     const toggleVisibility = () => setIsVisible(!isVisible);

     return (
          <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
               {isVisible ? (
                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
               ) : (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
               )}
          </button>
     )
}
