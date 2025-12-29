import { useState } from 'react'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Convert splinecode URL to embed URL
  const getEmbedUrl = (sceneUrl: string) => {
    // If it's already an embed URL, use it directly
    if (sceneUrl.includes('my.spline.design')) {
      return sceneUrl
    }
    // Convert prod.spline.design URL to embed format
    const match = sceneUrl.match(/prod\.spline\.design\/([^/]+)/)
    if (match) {
      return `https://my.spline.design/${match[1]}/`
    }
    return sceneUrl
  }

  return (
    <div className={`relative ${className || ''}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <span className="loader"></span>
        </div>
      )}
      <iframe
        src={getEmbedUrl(scene)}
        className="w-full h-full border-0"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
        onLoad={() => setIsLoading(false)}
        title="3D Scene"
        allow="autoplay; fullscreen"
      />
    </div>
  )
}
