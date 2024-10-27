export const useDownloadImage = () => {

     const downloadFile = async (urlImage: RequestInfo | URL, fileName: string) => {
          const response = await fetch(urlImage);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${fileName}.jpg`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
     };

     return { downloadFile }
}