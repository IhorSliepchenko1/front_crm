import { Alert } from 'antd';
import './alert.scss'

export const AlertSuccess = ({ message, classFrames, type }: { classFrames: string, message: string, type: "error" | "success" | "warning" | "info" | undefined }) => {
     return (
          <Alert
               className={`alert ${classFrames}`}
               message={message}
               type={type}
               showIcon
          />
     )
}
