import { Grid } from '@mui/material'

import { useFreeDraw } from '../hooks/useFreeDraw'

export const SketchPad = ({ width = 400, height = 400 }) => {
  const { canvasRef, startDrawing, stopDrawing, draw, undo } = useFreeDraw({
    width,
    height,
  })

  return (
    <Grid
      item
      flex={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      sx={{
        width: '400px',
        height: '400px',
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={styles}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      />
      <button onClick={undo}>Undo</button>
    </Grid>
  )
}

const styles = {
  backgroundColor: '#fffefe',
  borderRadius: '5px',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', // Replaced shadows import with a simple boxShadow
  margin: '15px 0px',
}
