import React, { useState, HTMLAttributes } from 'react';
import './tailwind.output.css';
import Canvas from './Canvas'

interface UploadButtonProps extends HTMLAttributes<HTMLInputElement> {
  text: string
}

const UploadButton = ({ onChange, text }: UploadButtonProps) => {
  return (
    <div className="overflow-hidden relative">

      <button className="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 w-full inline-flex items-center">
        <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
        </svg>
        <span className="ml-2">{text}</span>
      </button>
      <input className="cursor-pointer absolute block opacity-0 top-0 left-0 bottom-0 right-0 w-full" type="file" onChange={onChange} />
    </div>
  )
}

const NumberInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type='number'
    />
  )
}

function App() {
  const [file, setFile] = useState('')
  const [watermark, setWatermark] = useState('')
  const [watermarkX, setWatermarkX] = useState(0)
  const [watermarkY, setWatermarkY] = useState(0)

  return (
    <div className='text-center px-5'>
      <div className='grid gap-3 grid-cols-2'>
        <UploadButton text='Choose a main image:' onChange={async (event) => {
          if (event.currentTarget.files?.length) {
            setFile(URL.createObjectURL(event.currentTarget.files[0]))
          }
        }} />

        <UploadButton text='Choose a watermark image:' onChange={async (event) => {
          if (event.currentTarget.files?.length) {
            setWatermark(URL.createObjectURL(event.currentTarget.files[0]))
          }
        }} />
      </div>
      <label>Watermark X position</label>
      <NumberInput value={watermarkX} onChange={(e) => setWatermarkX(parseInt(e.currentTarget.value))} />
      <label>Watermark Y position</label>
      <NumberInput value={watermarkY} onChange={(e) => setWatermarkY(parseInt(e.currentTarget.value))} />
      <Canvas watermarkX={watermarkX} watermarkY={watermarkY} imageSrc={file} watermarkSrc={watermark} />
    </div>
  );
}

export default App;
