export const useFormattedNumber = () => {
     const formattedNumber = (number: number) => {
          const result = number.toLocaleString('ru-RU')

          return result
     }

     return { formattedNumber }
}