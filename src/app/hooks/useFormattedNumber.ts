export const useFormattedNumber = () => {
     const formattedNumber = (number: number) => {
          const result = number.toLocaleString('ru-RU')
          console.log(result);

          return result
     }

     return { formattedNumber }
}