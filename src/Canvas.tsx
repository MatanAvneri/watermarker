import React, { HTMLAttributes, useRef, useEffect, useState } from 'react'


interface CanvasProps extends HTMLAttributes<HTMLCanvasElement> {
  imageSrc?: string,
  watermarkSrc?: string,
  watermarkX?: number,
  watermarkY?: number,
  setWatermarkX: (value: number) => void,
  setWatermarkY: (value: number) => void
}

const Canvas = ({ imageSrc, watermarkSrc, watermarkX = 0, watermarkY = 0, setWatermarkX, setWatermarkY, ...props }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDragging, setDragging] = useState(false)
  const [canvasImageLink, setCanvasImageLink] = useState('')
  const [waterMarkData, setWaterMarkData] = useState({
    width: 0,
    height: 0
  })
  let startX: number
  let startY: number
  const drawImage = (imageSrc?: string, offsetX: number = 0, offsetY: number = 0, clearCanvas: boolean = false) => {
    const canvas = canvasRef.current
    if (canvas && imageSrc) {
      const context = canvas.getContext('2d')
      if (context) {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
          if (clearCanvas) {
            window.requestAnimationFrame(() => {
              context.clearRect(0, 0, canvas.width, canvas.height);
              canvas.width = image.width;
              canvas.height = image.height;
            })
          } else {
            if (waterMarkData.width !== image.width || waterMarkData.height !== image.height) {
              setWaterMarkData({
                width: image.width,
                height: image.height
              })
            }
          }
          window.requestAnimationFrame(() => {
            context.drawImage(image, offsetX, offsetY);
          })
          setCanvasImageLink(String(canvasRef.current?.toDataURL('image/png')))
        }
        if (image.complete) {
          if (clearCanvas) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.width;
            canvas.height = image.height;
          } else {
            if (waterMarkData.width !== image.width || waterMarkData.height !== image.height) {
              setWaterMarkData({
                width: image.width,
                height: image.height
              })
            }
          }
          window.requestAnimationFrame(() => {
            context.drawImage(image, offsetX, offsetY);
          })
          setCanvasImageLink(String(canvasRef.current?.toDataURL('image/png')))
        }
      }
    }
  }
  useEffect(() => {
    drawImage(imageSrc, 0, 0, true);
    drawImage(watermarkSrc, watermarkX, watermarkY);
  }, [imageSrc, watermarkSrc, watermarkX, watermarkY])

  const hitBox = (x: number, y: number): boolean => {
    let isTarget = false;
    if (x >= watermarkX && x <= watermarkX + waterMarkData.width && y >= watermarkY && y <= watermarkY + waterMarkData.height) {
      isTarget = true;
    }
    return isTarget;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (canvas) {
      startX = e.nativeEvent.offsetX - canvas.clientLeft;
      startY = e.nativeEvent.offsetY - canvas.clientTop;
      const isDown = hitBox(startX, startY);
      if (isDragging !== isDown) {
        setDragging(isDown)
      }
    }
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const canvas = canvasRef.current
    if (canvas) {
      const mouseX = e.nativeEvent.offsetX - canvas.clientLeft;
      const mouseY = e.nativeEvent.offsetY - canvas.clientTop;
      startX = mouseX;
      startY = mouseY;
      setWatermarkX(startX)
      setWatermarkY(startY)
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setDragging(false)
    }
  }
  const handleMouseOut = () => {
    handleMouseUp()
  }

  return (
    <div className='text-center'>
      <canvas
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown} className='m-auto' ref={canvasRef} {...props} />
      <div className="overflow-hidden relative inline-block">
        <button className="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 w-full inline-flex items-center">
          <svg className='transform rotate-180' fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
          </svg>
          <span className="ml-2">Download Image</span>
        </button>
        <a className='cursor-pointer absolute block opacity-0 top-0 left-0 bottom-0 right-0 w-full'
          download='image.png'
          href={canvasImageLink} />
      </div>
    </div>
  )
}

export default Canvas
