import { useEffect, useRef, useState } from 'react'

import { UseFreeDrawHook } from '../types/CanvasTypes'

export const useFreeDraw: UseFreeDrawHook = (dimensions) => {
  const { width, height } = dimensions

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width * 3
    canvas.height = height * 3
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const context = canvas.getContext('2d')
    if (!context) return

    context.scale(3, 3)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 4

    contextRef.current = context
  }, [height, width])

  const startDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    const { offsetX, offsetY } = event.nativeEvent
    contextRef.current?.beginPath()
    contextRef.current?.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const stopDrawing = () => {
    contextRef.current?.closePath()
    setIsDrawing(false)
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) return
    const { offsetX, offsetY } = event.nativeEvent
    contextRef.current?.lineTo(offsetX, offsetY)
    contextRef.current?.stroke()
  }

  return {
    canvasRef,
    isDrawing,
    startDrawing,
    stopDrawing,
    draw,
  }
}
