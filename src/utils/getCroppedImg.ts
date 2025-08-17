//tạo canva

export const getCroppedImg = (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageSrc
    image.crossOrigin = 'anonymous' // cần nếu ảnh là link ngoài (vd: twitter)
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = pixelCrop.width
      canvas.height = pixelCrop.height
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Không thể tạo canvas'))
        return
      }

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      )

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Không thể tạo blob'))
          return
        }
        // ép blob thành File
        const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' })
        resolve(file)
      }, 'image/jpeg')
    }
    image.onerror = () => reject(new Error('Không load được ảnh'))
  })
}
