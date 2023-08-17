import { Highlight } from '@/store'
import React from 'react'
import * as RK from 'react-konva'
import Konva from 'konva'

type Props = {
  shapeProps: Highlight;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (e: Highlight) => void
}

export const Rectangle: React.FC<Props> = ({ shapeProps, isSelected, onSelect, onChange }) => {

  const shapeRef = React.useRef<Konva.Rect>(null);

  const trRef = React.useRef<Konva.Transformer>(null);

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      trRef.current?.nodes([shapeRef?.current as any]);
      trRef.current?.getLayer()?.batchDraw()
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <RK.Rect
        ref={shapeRef}
        x={shapeProps.pos1}
        y={shapeProps.pos2}
        width={100}
        height={100}
        cornerRadius={10}
        fill={shapeProps.color}
        opacity={1}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            pos1: e.target.x(),
            pos2: e.target.y()
          })
        }}

      />
      {isSelected ?
        <RK.Transformer
          ref={trRef}
        />
        : null}
    </React.Fragment>
  )
}