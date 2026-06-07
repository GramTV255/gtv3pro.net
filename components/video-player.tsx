"use client"

import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import * as dashjs from "dashjs"
import { Loader2, AlertCircle } from "lucide-react"

type VideoPlayerProps = {
  src: string
  type: "m3u8" | "mpd"
  poster?: string
  autoPlay?: boolean
}

export function VideoPlayer({ src, type, poster, autoPlay = true }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setLoading(true)
    setError(false)

    let hls: Hls | null = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dashPlayer: any = null

    const onReady = () => setLoading(false)
    video.addEventListener("loadeddata", onReady)
    video.addEventListener("playing", onReady)

    if (type === "m3u8") {
      // HLS streams (.m3u8)
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari ina msaada wa asili wa HLS
        video.src = src
      } else if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true })
        hls.loadSource(src)
        hls.attachMedia(video)
        hls.on(Hls.Events.ERROR, (_evt, data) => {
          if (data.fatal) {
            console.log("[v0] HLS fatal error:", data.type, data.details)
            setError(true)
            setLoading(false)
          }
        })
      } else {
        setError(true)
        setLoading(false)
      }
    } else {
      // DASH streams (.mpd)
      try {
        dashPlayer = dashjs.MediaPlayer().create()
        dashPlayer.initialize(video, src, autoPlay)
        dashPlayer.on("error", (e: unknown) => {
          console.log("[v0] DASH error:", e)
          setError(true)
          setLoading(false)
        })
      } catch (err) {
        console.log("[v0] DASH init error:", err)
        setError(true)
        setLoading(false)
      }
    }

    return () => {
      video.removeEventListener("loadeddata", onReady)
      video.removeEventListener("playing", onReady)
      if (hls) hls.destroy()
      if (dashPlayer) dashPlayer.reset()
    }
  }, [src, type, autoPlay])

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      <video
        ref={videoRef}
        poster={poster}
        controls
        autoPlay={autoPlay}
        playsInline
        className="h-full w-full"
      >
        <track kind="captions" />
      </video>

      {loading && !error && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
          <Loader2 className="size-10 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 px-6 text-center">
          <AlertCircle className="size-10 text-primary" />
          <p className="text-sm text-muted-foreground">
            Imeshindwa kupakia video. Angalia muunganisho wako wa intaneti au
            jaribu tena baadaye.
          </p>
        </div>
      )}
    </div>
  )
}
