import { useEffect, useRef, useState } from 'react'
import { Application } from '@splinetool/runtime'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!canvasRef.current) return

    const app = new Application(canvasRef.current)
    
    app.load(scene).then(() => {
      setIsLoading(false)
    }).catch((error) => {
      console.error('Failed to load Spline scene:', error)
      setIsLoading(false)
    })

    return () => {
      app.dispose()
    }
  }, [scene])

  return (
    <div className={`relative ${className || ''}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loader"></span>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
      />
    </div>
  )
}
