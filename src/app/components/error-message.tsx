type Props = {
     error: string
}
import { Alert } from 'antd';

export const ErrorMessage = ({ error = `` }: Props) => {
     return error && <Alert message={error} type="error" showIcon />
}
