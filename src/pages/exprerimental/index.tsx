import React from 'react'
import { Stage, Layer, Rect, Image } from 'react-konva';
import { Html } from 'react-konva-utils';
import useImage from 'use-image'

export default function Exprerimental() {
  const [images, setImages] = React.useState("")

  const blobToBase64 = async (blob: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0]
    console.log(files)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const base64img = await blobToBase64(files!)

    setImages(base64img as unknown as string)

  }

  const [img] = useImage(images)


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
            {/* {images && <img src={images} alt="" />} */}

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
          {img && <Image image={img} draggable />}
        </Layer>
      </Stage>
    </div>

  )
}
