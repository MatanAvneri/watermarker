import React, { useState } from 'react';
import './App.css';
import Canvas from './Canvas'

const MAIN_FILE_ID = 'mainFile'
const WATERMARK_FILE_ID = 'watermark'

function App() {
  const [file, setFile] = useState('')
  const [watermark, setWatermark] = useState('')

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
      <div>
        <Canvas imageSrc={file} watermarkSrc={watermark} />
      </div>
    </div>
  );
}

export default App;
