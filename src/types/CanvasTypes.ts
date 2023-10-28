export type CanvasDimensions = {
  width: number
  height: number
}

export type Vector = [
  number, // x
  number, // y
]

export type Paths = Vector[]

type UseFreeDrawReturn = {
  canvasRef: React.RefObject<HTMLCanvasElement>
  isDrawing: boolean
  startDrawing: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
  stopDrawing: () => void
  draw: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
  undo: () => void
}

export type UseFreeDrawHook = (
  dimensions: CanvasDimensions,
) => UseFreeDrawReturn
