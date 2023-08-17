import React from "react";
import { Stage, Layer, Image } from "react-konva";
import { useImage } from 'react-konva-utils'
import { useRecoilState } from "recoil";
import { pagesState, type Highlight } from "@/store";
import { useSearchParams } from "react-router-dom";
import { KonvaEventObject } from "konva/lib/Node";
import { Rectangle } from "./rectangle";

export const Canvas = () => {

  const rootDivRef = React.useRef<HTMLDivElement | null>(null)

  const [query] = useSearchParams()

  const [dataPage, setDataPage] = useRecoilState(pagesState)

  const [isSelectedRect, setSelectedRect] = React.useState<Highlight | null>(null)

  const dataPageMemoize = React.useMemo(() => {
    return dataPage.find((page) => page.id === query.get('pageId'))
  }, [dataPage, query])

  const [img] = useImage(dataPageMemoize?.image?.data ?? '')

  const checkDeselect = React.useCallback(
    (e: { target: { getStage: () => unknown } }) => {
      // deselect when clicked on empty area
      if (e.target) {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          setSelectedRect(null)
        }
      }
    },
    []
  );

  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0
  })

  // We cant set the h & w on Stage to 100% it only takes px values so we have to
  // find the parent container's w and h and then manually set those !
  React.useEffect(() => {
    if (rootDivRef.current?.offsetHeight && rootDivRef.current?.offsetWidth) {
      setDimensions({
        width: rootDivRef.current.offsetWidth,
        height: rootDivRef.current.offsetHeight
      })
    }
  }, [])

  const onMouseEnter = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    if (stage) stage.container().style.cursor = "pointer";
  };

  const onMouseLeave = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    if (stage) stage.container().style.cursor = "default";
  };

  const handleChange = (e: KonvaEventObject<MouseEvent>) => {
    setDataPage(prev => {
      return prev.map((page) => page.id === query.get('pageId') ?
        {
          ...page,
          image: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ...page.image!,
            pos1: e.target.x(),
            pos2: e.target.y()
          }
        }
        : page)
    })
  };

  return (
    <section
      // className="w-full min-h-[calc(100vh-130px)] relative overflow-hidden"
      className="col-span-7 "
      aria-label="root-canvas"
      ref={rootDivRef}
    >
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        // height={window.innerHeight}
        onMouseDown={checkDeselect}
      >
        <Layer >
          {img ? (
            <Image
              image={img}
              x={dataPageMemoize?.image?.pos1}
              y={dataPageMemoize?.image?.pos2}
              draggable
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onDragEnd={handleChange}
            />
          ) : null}

          {dataPageMemoize?.highlight?.length !== 0 ? (
            dataPageMemoize?.highlight?.map((data, i) => (
              <Rectangle
                key={i}
                shapeProps={data}
                isSelected={data.id === isSelectedRect?.id}
                onSelect={() => setSelectedRect(data)}
                onChange={(newAttrs) => {
                  // console.log(dataPageMemoize?.highlight?.[i])
                  setDataPage((prev) => {
                    return prev.map((page) => page.id === dataPageMemoize.id ? {
                      ...page,
                      highlight: page.highlight?.map((hl) => hl.id === dataPageMemoize?.highlight?.[i].id ? {
                        ...hl, ...newAttrs
                      } : hl)
                    } : page)
                  })
                }}
              />
            ))
          ) : null}

        </Layer>
      </Stage>
    </section >
  )
}

{/* <React.Fragment key={data.id}>
<Rect
  ref={rectRef}
  x={data.pos1}
  y={data.pos2}
  width={100}
  height={100}
  cornerRadius={10}
  fill={data.color}
  opacity={1}
  draggable
  onClick={() => onSelectRect(data)}
  onTap={() => onSelectRect(data)}
// onDragStart={(e) => {
//   console.log(e)
// }}
// onDragEnd={() => { }}
/>

{isSelectedReact?.id === data.id ? (
  <Transformer
    ref={trRef} />
) : null}
</React.Fragment> */}

// <Layer >
// <Html divProps={{
//   style: {
//     position: "absolute",
//     top: "5%",
//     left: "50%",
//     transform: "translate(-50%, -5%)",
//     zIndex: -10
//   }
// }}>
//   {/* <input type="text" placeholder="masukan nama" /> */}
//   <img src={imagePreview} />
// </Html>
// </Layer>