export const getImageDimensions = async (src: string) =>
  new Promise<{ width: number; height: number }>((resolve) => {
    var img = new Image();

    img.onload = () => {
      var height = img.height;
      var width = img.width;
      resolve({ width, height });
    };

    img.src = src;
  });
