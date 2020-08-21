import React, { HTMLAttributes, useRef, useEffect } from 'react'


interface CanvasProps extends HTMLAttributes<HTMLCanvasElement> {
  imageSrc?: string,
  watermarkSrc?: string
}

const Canvas = ({ imageSrc, watermarkSrc, ...props }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageLink = canvasRef.current?.toDataURL('image/png')
  useEffect(() => {
    if (imageSrc) {
      const canvas = canvasRef.current
      if (canvas) {
        const context = canvas.getContext('2d')
        if (context) {
          const mainImage = new Image();
          mainImage.src = imageSrc;
          mainImage.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = mainImage.width;
            canvas.height = mainImage.height;
            context.drawImage(mainImage, 0, 0);
            if (watermarkSrc) {
              const watermarkImage = new Image();
              watermarkImage.src = watermarkSrc;
              watermarkImage.onload = () => {
                context.drawImage(watermarkImage, 50, 50);
              }
            }
          }
        }
      }
    }
  }, [imageSrc, watermarkSrc])

  return (
    <div>
      <canvas ref={canvasRef} {...props} />
      <a download='image.png' href={imageLink}>Download Image</a>
    </div>
  )
}

export default Canvas
