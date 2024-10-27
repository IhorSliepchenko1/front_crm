import { Input as NextInput } from "@nextui-org/react"
import { Control, useController } from "react-hook-form"

type Props = {
     name: string
     label: string
     placeholder?: string
     type?: string
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     control: Control<any>
     required?: string
     endContent?: JSX.Element
     color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined
     disabled?: boolean
}
export const Input = ({
     name,
     label,
     placeholder,
     type,
     control,
     required = ``,
     color = `default`,
     disabled = false
}: Props) => {
     const {
          field,
          fieldState: { invalid },
          formState: { errors },
     } = useController({
          name,
          control,
          rules: {
               required,
          },
     })


     return (
          <NextInput
               id={name}
               label={label}
               type={type}
               placeholder={placeholder}
               value={field.value}
               name={field.name}
               isInvalid={invalid}
               onChange={field.onChange}
               onBlur={field.onBlur}
               errorMessage={`${errors[name]?.message ?? ``}`}
               color={color}
               disabled={disabled}
          />
     )
}