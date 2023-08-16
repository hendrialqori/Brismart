import React from "react";
// import { useSearchParams } from "react-router-dom";
import Konva from "konva";
import { Stage, Layer, Rect, Transformer, Image } from "react-konva";
import { Html, useImage } from 'react-konva-utils'
import { useRecoilValue } from "recoil";
import { imageState, temporaryRectState } from "@/store";

export const Canvas = () => {

  const rectRef = React.useRef<Konva.Rect>(null);

  const trRef = React.useRef<Konva.Transformer>(null);

  const image = useRecoilValue(imageState) as unknown as Blob

  const rectState = useRecoilValue(temporaryRectState)

  const [imagePreview, setImagePreview] = React.useState('')

  const [isSelected, setSelected] = React.useState(false)

  const [img] = useImage('/AOT.jpeg')

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      trRef.current?.nodes([rectRef.current as any]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const onSelectRect = () => setSelected(true)

  const checkDeselect = React.useCallback(
    (e: { target: { getStage: () => unknown } }) => {
      // deselect when clicked on empty area
      if (e.target) {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          setSelected(false)
        }
      }
    },
    []
  );

  React.useEffect(() => {
    if (image) {
      const objUrl = URL.createObjectURL(image)
      setImagePreview(objUrl)
    }
  }, [image])

  return (
    <section
      className="w-10/12 ml-auto mr-0 relative overflow-scroll"
      aria-label="root-canvas"
    >
      {/* <Stage width={window.innerWidth} height={window.innerHeight}>
       
      </Stage> */}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        // className="bg-gray-200"
        onMouseDown={checkDeselect}
      >
        <Layer >
          <Html divProps={{
            style: {
              position: "absolute",
              top: "5%",
              left: "50%",
              transform: "translate(-50%, -5%)",
              zIndex: -10
            }
          }}>
            {/* <input type="text" placeholder="masukan nama" /> */}
            <img src={imagePreview} />
          </Html>
        </Layer>

        
        <Layer >
          {/* <Image image={img} y={10}/> */}

          {rectState ? (
            <Rect
              ref={rectRef}
              x={rectState?.x}
              y={rectState?.y}
              width={100}
              height={40}
              cornerRadius={10}
              fill={'blue'}
              opacity={10}
              draggable
              onClick={onSelectRect}

            // onDragStart={(e) => {
            //   console.log(e)
            // }}
            // onDragEnd={() => { }}

            />
          ) : null}
          {isSelected && (
            <Transformer
              ref={trRef} />
          )}
        </Layer>
      </Stage>
    </section >
  )
}