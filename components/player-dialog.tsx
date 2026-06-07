"use client"

import { VideoPlayer } from "@/components/video-player"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

type PlayerItem = {
  title: string
  description: string
  streamUrl: string
  streamType: "m3u8" | "mpd"
  poster?: string
  meta?: string
  isLive?: boolean
}

export function PlayerDialog({
  item,
  open,
  onOpenChange,
}: {
  item: PlayerItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0">
        {item && (
          <>
            <VideoPlayer
              src={item.streamUrl}
              type={item.streamType}
              poster={item.poster}
            />
            <div className="flex flex-col gap-2 p-5">
              <DialogHeader className="text-left">
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-lg">{item.title}</DialogTitle>
                  {item.isLive && (
                    <Badge className="gap-1 bg-primary text-primary-foreground">
                      <span className="size-1.5 animate-pulse rounded-full bg-current" />
                      LIVE
                    </Badge>
                  )}
                </div>
                {item.meta && (
                  <span className="text-xs text-muted-foreground">{item.meta}</span>
                )}
              </DialogHeader>
              <DialogDescription className="text-pretty leading-relaxed">
                {item.description}
              </DialogDescription>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
