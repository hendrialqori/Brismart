import React from 'react'
import { Stage, Layer, Rect } from 'react-konva';
import { Html } from 'react-konva-utils';

export default function Exprerimental() {
  // const [images, setImages] = useState<File[] | null>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0]
    console.log(files)
    // setImages(prev => [...prev, files])

  }

  // console.log(images)

  return (
    <div>
      <input type="file" onChange={handleImage} />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Html
            divProps={{
              style: {
                position: 'absolute',
                top: 10,
                left: 10,
                zIndex: -1
              },
            }}
          >
            {}
           <img src="/AOT.jpeg" alt="" />
          </Html>
          <Rect
            x={20}
            y={10}
            width={50}
            height={50}
            fill="red"
            shadowBlur={5}
            draggable={true}
          />
        </Layer>
      </Stage>
    </div>

  )
}
