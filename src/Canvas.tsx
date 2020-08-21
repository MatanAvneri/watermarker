import React, { HTMLAttributes, useRef, useEffect, useState } from 'react'


interface CanvasProps extends HTMLAttributes<HTMLCanvasElement> {
  imageSrc?: string,
  watermarkSrc?: string,
  watermarkX?: number,
  watermarkY?: number,
}

const Canvas = ({ imageSrc, watermarkSrc, watermarkX = 0, watermarkY = 0, ...props }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasImageLink, setCanvasImageLink] = useState('')
  const drawImage = (imageSrc?: string, offsetX: number = 0, offsetY: number = 0, clearCanvas: boolean = false) => {
    const canvas = canvasRef.current
    if (canvas && imageSrc) {
      const context = canvas.getContext('2d')
      if (context) {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
          if (clearCanvas) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.width;
            canvas.height = image.height;
          }
          context.drawImage(image, offsetX, offsetY);
          setCanvasImageLink(String(canvasRef.current?.toDataURL('image/png')))
        }
        if (image.complete) {
          if (clearCanvas) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.width;
            canvas.height = image.height;
          }
          context.drawImage(image, offsetX, offsetY);
          setCanvasImageLink(String(canvasRef.current?.toDataURL('image/png')))
        }
      }
    }
  }
  useEffect(() => {
    drawImage(imageSrc, 0, 0, true);
    drawImage(watermarkSrc, watermarkX, watermarkY);
  }, [imageSrc, watermarkSrc, watermarkX, watermarkY])

  return (
    <div className='text-center'>
      <canvas className='m-auto' ref={canvasRef} {...props} />
      <a download='image.png' href={canvasImageLink}>Download Image</a>
    </div>
  )
}

export default Canvas
