import { Grid } from '@mui/material'
import shadows from '@mui/material/styles/shadows'
import React, { useEffect, useRef } from 'react'
import { useCanvas } from '../hooks/useCanvas'
import { UndoButton } from './UndoButton'

interface SketchPadProps {
  size?: number
}

const SketchPad: React.FC<SketchPadProps> = ({ size = 400 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {
    paths,
    draw,
    eventHandlers: { handleUndo },
  } = useCanvas(canvasRef)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')!
    ctx.clearRect(0, 0, size, size)
    draw(ctx, paths)
  }, [paths])

  return (
    <Grid
      item
      xs={12}
      flex={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{
          backgroundColor: 'white',
          borderRadius: '5px',
          boxShadow: shadows[2],
          margin: '15px 0px',
        }}
      ></canvas>

      <UndoButton handleUndo={handleUndo} disabled={paths.length === 0} />
    </Grid>
  )
}

export default SketchPad
