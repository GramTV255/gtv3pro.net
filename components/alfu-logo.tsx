import { cn } from "@/lib/utils"

export function AlfuLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 text-primary-foreground"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </div>
      <span className="text-xl font-bold tracking-tight">
        Alfu<span className="text-primary">TV</span>
      </span>
    </div>
  )
}
