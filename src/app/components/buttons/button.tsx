import { Button as NextButton } from "@nextui-org/react"

type Props = {
     children: React.ReactNode
     icon?: JSX.Element
     className?: string
     type?: `button` | `submit` | `reset`
     fullWidth?: boolean
     color?:
     | "default"
     | "primary"
     | "secondary"
     | "success"
     | "warning"
     | "danger"
     | undefined
     variant?: "light" | "solid" | "bordered" | "flat" | "faded" | "shadow" | "ghost" | undefined
     onPress?: (() => void) | undefined
     disabled?: boolean
}

export const Button = ({
     children,
     icon,
     className,
     type,
     fullWidth,
     color,
     variant,
     onPress,
     disabled
}: Props) => {


     return (<NextButton
          startContent={icon}
          size="lg"
          color={color}
          variant={variant ?? `light`}
          className={className}
          type={type}
          fullWidth={fullWidth}
          onPress={onPress}
          disabled={disabled}>
          {children}
     </NextButton>
     )
}

