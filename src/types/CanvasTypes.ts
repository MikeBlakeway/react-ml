export type CanvasDimensions = {
  width: number
  height: number
}

type UseFreeDrawReturn = {
  canvasRef: React.RefObject<HTMLCanvasElement>
  isDrawing: boolean
  startDrawing: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
  stopDrawing: () => void
  draw: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
}

export type UseFreeDrawHook = (
  dimensions: CanvasDimensions,
) => UseFreeDrawReturn
