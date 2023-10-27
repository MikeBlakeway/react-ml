import { RefObject, useEffect, useState } from 'react'
import { Path, Vector } from '../types/types'

export interface UseCanvasEventHandlers {
  handleMouseDown: (evt: MouseEvent) => void
  handleMouseMove: (evt: MouseEvent) => void
  handleMouseUp: () => void
  handleUndo: () => void
  handleTouchStart: (evt: TouchEvent) => void
  handleTouchMove: (evt: TouchEvent) => void
  handleTouchEnd: () => void
}

export interface UseCanvasReturn {
  paths: Path[]
  draw: (ctx: CanvasRenderingContext2D, paths: Path[], color?: string) => void
  eventHandlers: UseCanvasEventHandlers
}

export const useCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
): UseCanvasReturn => {
  const canvas = canvasRef.current

  const [paths, setPaths] = useState<Path[]>([])
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

  const getMouse = (evt: MouseEvent | Touch): Vector => {
    if (!canvas) return [0, 0]
    const rect = canvas.getBoundingClientRect()
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ]
  }

  const handleMouseDown = (evt: MouseEvent) => {
    const mouse = getMouse(evt)
    console.log('mouse', mouse)
    setPaths((prevPaths) => [...prevPaths, [mouse]])
    setIsDrawing(true)
  }

  const handleMouseMove = (evt: MouseEvent) => {
    if (isDrawing) {
      const mouse = getMouse(evt)
      setPaths((prevPaths) => {
        const lastPrevPath: Path = prevPaths[prevPaths.length - 1] || []
        const lastPath = [...lastPrevPath, mouse]
        return [...prevPaths.slice(0, -1), lastPath]
      })
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const handleTouchStart = (evt: TouchEvent) => {
    const loc = evt.touches[0]
    handleMouseDown(loc as any)
  }

  const handleTouchMove = (evt: TouchEvent) => {
    const loc = evt.touches[0]
    handleMouseMove(loc as any)
  }

  const handleTouchEnd = () => {
    handleMouseUp()
  }

  const handleUndo = () => {
    setPaths((prevPaths) => prevPaths.slice(0, -1))
  }

  const draw = (
    ctx: CanvasRenderingContext2D,
    paths: Path[],
    color = 'black',
  ) => {
    if (!paths || !ctx) return

    for (const path of paths) {
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      ctx.beginPath()
      ctx.moveTo(...(path[0] as Vector))
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(...(path[i] as Vector))
      }
      ctx.stroke()
    }
  }

  useEffect(() => {
    if (!canvas) return

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ])

  return {
    paths,
    draw,
    eventHandlers: {
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleUndo,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    },
  }
}
