import React, { useState } from 'react';
import './App.css';
import Canvas from './Canvas'

const MAIN_FILE_ID = 'mainFile'
const WATERMARK_FILE_ID = 'watermark'

function App() {
  const [file, setFile] = useState('')
  const [watermark, setWatermark] = useState('')
  const [watermarkX, setWatermarkX] = useState(0)
  const [watermarkY, setWatermarkY] = useState(0)

  return (
    <div className="App">
      <label htmlFor={MAIN_FILE_ID}>Choose a main image:</label>
      <input id={MAIN_FILE_ID} type="file" onChange={async (event) => {
        if (event.target.files?.length) {
          setFile(URL.createObjectURL(event.target.files[0]))
        }
      }} />
      <label htmlFor={WATERMARK_FILE_ID}>Choose a watermark image:</label>
      <input id={WATERMARK_FILE_ID} type="file" onChange={async (event) => {
        if (event.target.files?.length) {
          setWatermark(URL.createObjectURL(event.target.files[0]))
        }
      }} />
      <label>Watermark X position</label>
      <input type='number' value={watermarkX} onChange={(e) => setWatermarkX(parseInt(e.target.value))} />
      <label>Watermark Y position</label>
      <input type='number' value={watermarkY} onChange={(e) => setWatermarkY(parseInt(e.target.value))} />
      <Canvas watermarkX={watermarkX} watermarkY={watermarkY} imageSrc={file} watermarkSrc={watermark} />
    </div>
  );
}

export default App;
