"use client"

import { useState } from "react"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { PlayerDialog } from "@/components/player-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { liveChannels, tvShows, categories, type Channel, type Show } from "@/lib/content"
import { Play, Radio, Info } from "lucide-react"

type PlayerItem = {
  title: string
  description: string
  streamUrl: string
  streamType: "m3u8" | "mpd"
  poster?: string
  meta?: string
  isLive?: boolean
}

export function BrowsePage() {
  const [activeItem, setActiveItem] = useState<PlayerItem | null>(null)
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState("Zote")

  const featured = tvShows[0]

  function playShow(show: Show) {
    setActiveItem({
      title: show.title,
      description: show.description,
      streamUrl: show.streamUrl,
      streamType: show.streamType,
      poster: show.poster,
      meta: `${show.year} • ${show.category} • Vipindi ${show.episodes}`,
    })
    setOpen(true)
  }

  function playChannel(ch: Channel) {
    setActiveItem({
      title: ch.name,
      description: ch.description,
      streamUrl: ch.streamUrl,
      streamType: ch.streamType,
      meta: ch.category,
      isLive: true,
    })
    setOpen(true)
  }

  const filteredShows =
    category === "Zote" ? tvShows : tvShows.filter((s) => s.category === category)

  return (
    <div className="min-h-screen pb-16">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src="/hero-featured.png"
          alt={featured.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end gap-4 px-4 pb-12 sm:px-6">
          <Badge className="w-fit gap-1.5 bg-primary/90 text-primary-foreground">
            Kipindi Kinachoangaziwa
          </Badge>
          <h1 className="max-w-xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
            {featured.title}
          </h1>
          <p className="max-w-lg text-pretty leading-relaxed text-muted-foreground">
            {featured.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" className="gap-2" onClick={() => playShow(featured)}>
              <Play className="size-5 fill-current" />
              Tazama Sasa
            </Button>
            <span className="text-sm text-muted-foreground">
              {featured.year} • {featured.category} • Vipindi {featured.episodes}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Live channels */}
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Radio className="size-5 text-primary" />
            <h2 className="text-xl font-semibold">Chaneli za Moja kwa Moja</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {liveChannels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => playChannel(ch)}
                className="group relative flex w-44 shrink-0 flex-col overflow-hidden rounded-xl border border-border/60 bg-card text-left transition-colors hover:border-primary"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                  <Image
                    src={ch.logo || "/placeholder.svg"}
                    alt={ch.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute left-2 top-2 gap-1 bg-primary text-primary-foreground">
                    <span className="size-1.5 animate-pulse rounded-full bg-current" />
                    LIVE
                  </Badge>
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="size-8 fill-white text-white" />
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 p-3">
                  <span className="truncate text-sm font-medium">{ch.name}</span>
                  <span className="text-xs text-muted-foreground">{ch.category}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Categories filter */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">TV Shows na Filamu</h2>
          </div>
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredShows.map((show) => (
              <button
                key={show.id}
                onClick={() => playShow(show)}
                className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card text-left transition-colors hover:border-primary"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-secondary">
                  <Image
                    src={show.poster || "/placeholder.svg"}
                    alt={show.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="size-10 fill-white text-white" />
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-3">
                  <span className="truncate text-sm font-medium">{show.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {show.year} • {show.category}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {filteredShows.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Info className="size-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Hakuna maudhui katika kundi hili kwa sasa.
              </p>
            </div>
          )}
        </section>
      </div>

      <PlayerDialog item={activeItem} open={open} onOpenChange={setOpen} />
    </div>
  )
}
